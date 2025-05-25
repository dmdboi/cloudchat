import { renderHtml } from "../renderHtml";

export async function home(request: Request, env: any): Promise<Response> {
  // Send html response
  const datacenter = request.cf?.colo as string;

  if (!datacenter) {
    return new Response("Datacenter not found", {
      status: 500,
      headers: { "content-type": "text/plain" },
    });
  }

  const html = renderHtml(datacenter);

  return new Response(html, {
    headers: {
      "Content-Type": "text/html",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
