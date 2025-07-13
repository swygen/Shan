export default async (request, context) => {
  const url = new URL(request.url);
  const postId = url.searchParams.get("id");

  const response = await fetch(`https://sheetdb.io/api/v1/93b4nowtrr4qh`);
  const data = await response.json();
  const post = data[postId - 1];

  const title = post["Title "] || "DJ Media 24";
  const description = post["Full News "] || "সর্বশেষ খবর";
  const image = post["Img URL "] || "https://dj-media-24.netlify.app/og-image.jpg";

  const html = `
    <!DOCTYPE html>
    <html lang="bn">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>${title}</title>
      <meta property="og:title" content="${title}" />
      <meta property="og:description" content="${description}" />
      <meta property="og:image" content="${image}" />
      <meta property="og:url" content="${url.href}" />
      <meta name="twitter:card" content="summary_large_image" />
    </head>
    <body>
      <script>
        window.location.href = "/?id=${postId}";
      </script>
    </body>
    </html>
  `;

  return new Response(html, {
    headers: { "Content-Type": "text/html" },
  });
};
