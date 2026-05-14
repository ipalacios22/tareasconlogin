import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

// Esta línea busca la URL que pegamos en el archivo .env
const sql = neon(process.env.DATABASE_URL!);

// 'db' es el objeto que usaremos para hacer INSERT, SELECT, etc.
export const db = drizzle(sql, { schema });