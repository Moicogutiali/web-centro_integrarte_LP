
import { createClient } from '@supabase/supabase-js';

// Estas variables deben configurarse en el panel de Vercel (Environment Variables)
// o en un archivo .env para desarrollo local.
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

/**
 * Exportamos una instancia de Supabase protegida.
 * Si las credenciales no existen, usamos un Proxy para evitar que la app explote al cargar,
 * registrando un error en consola solo cuando se intente realizar una operación.
 */
export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : new Proxy({} as any, {
      get: (target, prop) => {
        if (prop === 'from') {
          return () => ({
            select: () => Promise.resolve({ data: [], error: null }),
            insert: () => Promise.resolve({ data: null, error: new Error("Supabase no configurado") }),
            order: () => Promise.resolve({ data: [], error: null }),
          });
        }
        return () => {
          console.error(`Supabase Error: Intentaste usar '${String(prop)}' pero SUPABASE_URL o SUPABASE_ANON_KEY no están definidos.`);
          return Promise.resolve({ data: null, error: new Error("Missing Supabase Credentials") });
        };
      }
    });
