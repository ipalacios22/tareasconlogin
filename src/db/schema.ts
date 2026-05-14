import { pgTable, serial, text, boolean, integer } from "drizzle-orm/pg-core";

// 1. Tabla de Usuarios
export const users = pgTable("usuarios", {
  id: serial("id").primaryKey(),
  email: text("correo").notNull().unique(),
  password: text("contrasena").notNull(),
});

// 2. Tabla de Tareas
export const tasks = pgTable("tareas", {
  id: serial("id").primaryKey(),
  title: text("titulo").notNull(),
  completed: boolean("completada").default(false),
  // Conectamos con la tabla 'usuarios'
  userId: integer("usuario_id").references(() => users.id), 
});