// 1. Importar la función oficial de creación de cliente para módulos
import { createClient } from 'https://jsdelivr.net';

// 2. Configuración limpia de tus credenciales reales de Supabase
const SUPABASE_URL = "https://zrrpjbqduwtaxsfbsuum.supabase.co"; // URL corregida sin el /rest/v1/
const SUPABASE_ANON_KEY = "sb_publishable_7sOPZc2sJT4jExW3gAREgA_GBpRe6Rp"; // Tu clave anon real

// 3. Inicializar el cliente de Supabase correctamente
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 4. Función global encargada de enviar la información desde el formulario (Adaptada a tus columnas en español)
async function publicarMensajeAnonimo(tituloPost, contenidoPost, categoriaPost) {
  try {
    // Mapeo exacto a tus columnas de Supabase: titulo, contenido, categoria
    const { data, error } = await supabase
      .from('posts')
      .insert([
        { 
          titulo: tituloPost, 
          contenido: contenidoPost, 
          categoria: categoriaPost
        }
      ]);

    if (error) throw error;

    alert("🚀 ¡Post creado con éxito en MGamers!");
    window.location.reload(); // Recarga la página para ver el post reflejado al instante
    
  } catch (error) {
    console.error("Error crítico al insertar en Supabase:", error.message);
    alert("Hubo un error al intentar publicar: " + error.message);
  }
}

// Hacer la función accesible globalmente por si la necesitas en etiquetas tradicionales onClick
window.publicarMensajeAnonimo = publicarMensajeAnonimo;
