import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL = 'https://zrrpjbqduwtaxsfbsuum.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_7sOPZc2sJT4jExW3gAREgA_GBpRe6Rp';

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);

export async function publicarPost(tituloPost, contenidoPost, categoriaPost) {
  const titulo = tituloPost?.trim();
  const contenido = contenidoPost?.trim();
  const categoria = categoriaPost?.trim();

  if (!titulo || !contenido || !categoria) {
    alert('Completa el título, la categoría y el contenido.');
    return false;
  }

  try {
    const {
      data: { user },
      error: authError
    } = await supabase.auth.getUser();

    if (authError) throw authError;

    if (!user) {
      alert('Inicia sesión para publicar. Los visitantes solo pueden leer posts.');
      return false;
    }

    const { error } = await supabase
      .from('posts')
      .insert({
        titulo,
        contenido,
        'categoría': categoria
      });

    if (error) throw error;

    alert('¡Post publicado!');
    window.location.href = 'index.html';
    return true;
  } catch (error) {
    console.error('Error al publicar:', error);
    alert('No se pudo publicar el post: ' + error.message);
    return false;
  }
}

// Compatibilidad con botones HTML que usen onclick="publicarPost(...)"
if (typeof window !== 'undefined') {
  window.publicarPost = publicarPost;
}
