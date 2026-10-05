export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // API: lista os livros publicados
    if (url.pathname === "/api/books") {
      const result = await env.DB.prepare(`
        SELECT id, title, synopsis, genre, cover_key, pdf_key
        FROM books
        WHERE published = 1
        ORDER BY created_at DESC
      `).all();

      return Response.json(result.results);
    }

    // Todo o restante continua sendo servido pelo site
    return env.ASSETS.fetch(request);
  }
};
