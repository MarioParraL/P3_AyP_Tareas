import { Tarea, TareaModel } from "./types.ts";

export const fromModelToTarea = (model: TareaModel): Tarea => ({
    id: model._id!.toString(),
    title: model.title,
    completed: model.completed,
});
