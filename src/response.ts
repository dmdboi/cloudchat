export function response(status: number, body: any, headers: Record<string, string> = {}): Response {
  const responseHeaders = new Headers(headers);

  responseHeaders.set("Content-Type", "application/json");
  responseHeaders.set("Access-Control-Allow-Origin", "*");
  responseHeaders.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  responseHeaders.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  return new Response(JSON.stringify(body), {
    status,
    headers: responseHeaders,
  });
}
