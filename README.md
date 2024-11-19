# P3_AyP_Tareas

# Para esta tercera práctica se pide desarrollar una API REST en Deno que permita gestionar tareas de un usuario. La API debe permitir:

Descripción
Crear una nueva tarea.
Listar todas las tareas existentes.
Buscar una tarea por su ID (generado por Mongo).
Actualizar el estado de una tarea (completada o pendiente).
Eliminar una tarea.
Requisitos
Utilizar los métodos HTTP: GET, POST, PUT y DELETE.
Manejar rutas de manera que cada funcionalidad tenga una ruta específica.
Validar que los datos enviados por el cliente sean correctos.
Manejar errores, como tareas no encontradas o datos incompletos.
Los datos deben almacenarse en MongoDB
Rutas de la API
1. Obtener todas las tareas
Método: GET
Ruta: /tasks
Descripción: Devuelve una lista de todas las tareas.
Respuesta Ejemplo:
[
  { "id": 1, "title": "Hacer la compra", "completed": false },
  { "id": 2, "title": "Hacer la API", "completed": true }
]
 
2. Obtener una tarea por ID
Método: GET
Ruta: /tasks/:id
Descripción: Devuelve los detalles de una tarea específica.
Respuesta Ejemplo:
{ "id": 1, "title": "Hacer la compra", "completed": false }
Errores posibles:
Si no existe una tarea con ese ID, devolver:
{ "error": "Tarea no encontrada" }
3. Crear una nueva tarea
Método: POST
Ruta: /tasks
Descripción: Crea una nueva tarea con el título enviado en el cuerpo de la petición. Por defecto, la tarea estará marcada como "pendiente".
Body esperado:
{ "title": "Hacer ejercicio" }
Respuesta Ejemplo:
{ "id": 3, "title": "Hacer ejercicio", "completed": false }
4. Actualizar el estado de una tarea
Método: PUT
Ruta: /tasks/:id
Descripción: Actualiza el estado de una tarea (de pendiente a completada o viceversa).
Body esperado:
{ "completed": true }
Respuesta Ejemplo:
{ "id": 1, "title": "Hacer la compra", "completed": true }
5. Eliminar una tarea
Método: DELETE
Ruta: /tasks/:id
Descripción: Elimina una tarea por su ID.
Respuesta Ejemplo:
{ "message": "Tarea eliminada correctamente" }
Errores posibles:
Si no existe una tarea con ese ID, devolver:
{ "error": "Tarea no encontrada" }

IMPORTANTE
Se deben respetar las respuestas expuestas en el ejercicio
NO se puede usar material de internet que resuelva directamente el ejercicio
NO se puede usar ningún asistente de código inteligente, estilo chat-gtp o copilot
Se deberá entregar mediante un repositorio de github y una release
