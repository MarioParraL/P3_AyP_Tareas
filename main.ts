import { MongoClient, ObjectId } from "mongodb";
import { TareaModel } from "./types.ts";
import { fromModelToTarea } from "./utils.ts";

const MONGO_URL = Deno.env.get("MONGO_URL");
if (!MONGO_URL) {
  console.error("Need a MONGO_URL");
  Deno.exit(1);
}

const client = new MongoClient(MONGO_URL);
await client.connect();
console.info("Connected to MongoDB");

const db = client.db("Practica3DB");
const tareasCollection = db.collection<TareaModel>("tareas");

const handler = async (req: Request): Promise<Response> => {
  const method = req.method;
  const url = new URL(req.url);
  const path = url.pathname;

  if (method === "GET") {
    if (path === "/tasks") {
      const tareasDB = await tareasCollection.find().toArray();
      const tareas = tareasDB.map((t) => fromModelToTarea(t));
      return new Response(JSON.stringify(tareas));
    } else if (path.startsWith("/tasks/")) {
      const idArray = path.split("/")[2];
      const id = idArray;

      if (!id) return new Response("Bad request", { status: 400 });

      const tareaDB = await tareasCollection.findOne({ _id: new ObjectId(id) });
      if (!tareaDB) {
        return new Response("Tarea no encontrada", { status: 404 });
      }

      const tarea = await fromModelToTarea(tareaDB);
      return new Response(JSON.stringify(tarea));
    }
  } else if (method === "POST") {
    if (path === "/tasks") {
      const tarea = await req.json();
      if (!tarea.title) {
        return new Response("Title required", { status: 400 });
      }

      const { insertedId } = await tareasCollection.insertOne({
        title: tarea.title,
        completed: false,
      });

      return new Response(
        JSON.stringify({
          title: tarea.title,
          completed: false,
          id: insertedId,
        }),
      );
    }
  } else if (method === "PUT") {
    if (path.startsWith("/tasks/")) {
      const idArray = path.split("/")[2];
      const id = idArray;

      if (!id) return new Response("Bad request", { status: 400 });

      const tareaDB = await tareasCollection.findOne({ _id: new ObjectId(id) });
      if (!tareaDB) {
        return new Response("Tarea no encontrada", { status: 404 });
      }

      const { modifiedCount } = await tareasCollection.updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            completed: true,
          },
        },
      );

      if (modifiedCount === 0) {
        return new Response("No se pudo actualizar la tarea", { status: 500 });
      }

      const tareaActualizada = await tareasCollection.findOne({
        _id: new ObjectId(id),
      });

      return new Response(JSON.stringify(tareaActualizada), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
  } else if (method === "DELETE") {
    if (path.startsWith("/tasks/")) {
      const idArray = path.split("/")[2];
      const id = idArray;

      if (!id) return new Response("Bad request", { status: 400 });

      const tareaDB = await tareasCollection.findOne({ _id: new ObjectId(id) });
      if (!tareaDB) {
        return new Response("Tarea no encontrada", { status: 404 });
      }

      const { deletedCount } = await tareasCollection.deleteOne(
        { _id: new ObjectId(id) },
      );

      if (deletedCount === 0) {
        return new Response("Tarea no encontrada", { status: 404 });
      }

      return new Response("Tarea eliminada exitosamente", { status: 200 });
    }
  }

  return new Response("Endpoint not found", { status: 404 });
};

Deno.serve({ port: 3000 }, handler);
