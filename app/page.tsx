import { db } from "@/db";
import { tasks } from "@/db/schema";
import { crearTarea, borrarTarea, toggleTarea } from "@/app/acciones-tareas";

export default async function PaginaTareas() {
  // LEER: Obtenemos las tareas directamente de Neon
  const todasLasTareas = await db.select().from(tasks);

  return (
    <main className="max-w-2xl mx-auto p-10 font-sans">
      <h1 className="text-3xl font-bold mb-8 text-center">Gestor de Tareas</h1>

      {/* FORMULARIO PARA CREAR */}
      <form action={crearTarea} className="flex gap-2 mb-10">
        <input 
          name="titulo" 
          placeholder="¿Qué hay que hacer?" 
          className="flex-1 border p-3 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
          required
        />
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all">
          Añadir
        </button>
      </form>

      {/* LISTA DE TAREAS */}
      <div className="space-y-3">
        {todasLasTareas.length === 0 && (
          <p className="text-gray-500 text-center italic">No hay tareas pendientes.</p>
        )}
        
        {todasLasTareas.map((tarea) => (
          <div key={tarea.id} className="flex items-center justify-between p-4 bg-amber-900 border rounded-xl shadow-sm">
            <div className="flex items-center gap-3">
              {/* Botón para marcar como completada */}
              <form action={toggleTarea.bind(null, tarea.id, tarea.completed || false)}>
                <button className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${tarea.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}>
                  {tarea.completed && <span className="text-white text-xs">✓</span>}
                </button>
              </form>
              <span className={tarea.completed ? "line-through text-white" : "text-white"}>
                {tarea.title}
              </span>
            </div>

            {/* Botón para ELIMINAR */}
            <form action={borrarTarea.bind(null, tarea.id)}>
              <button className="text-red-400 hover:text-red-600 px-3 py-1 rounded-md hover:bg-red-50 transition-colors">
                Eliminar
              </button>
            </form>
          </div>
        ))}
      </div>
    </main>
  );
}