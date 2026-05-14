'use server' // Esto le dice a Next.js que estas funciones solo corren en el servidor

import { db } from "../db"; // Los dos puntos suben un nivel de 'app' a 'src' y luego entran a 'db'
import { tasks } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// 1. CREAR TAREA
export async function crearTarea(formData: FormData) {
    const titulo = formData.get("titulo") as string;
    if (!titulo) return;
  
    await db.insert(tasks).values({
      title: titulo,
      // Comenta o borra la línea del userId:
      // userId: 1, 
    });
  
    revalidatePath("/");
  }

// 2. BORRAR TAREA
export async function borrarTarea(id: number) {
  await db.delete(tasks).where(eq(tasks.id, id));
  revalidatePath("/");
}

// 3. CAMBIAR ESTADO (Completada / Pendiente)
export async function toggleTarea(id: number, completada: boolean) {
  await db.update(tasks)
    .set({ completed: !completada })
    .where(eq(tasks.id, id));
  revalidatePath("/");
}