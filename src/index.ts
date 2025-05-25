import { handleCreate } from "./routes/create";
import { handleLogin } from "./routes/login";
import { handleGetMessages } from "./routes/get-messages";
import { handleSendMessage } from "./routes/send-message";
import { home } from "./routes/home";
import { handleListDatacenters } from "./routes/list-datacenters";

export default {
  async fetch(request: Request, env: any): Promise<Response> {
    const { pathname } = new URL(request.url);

    if (pathname === "/" && request.method === "GET") {
      return home(request, env);
    }

    if (pathname === "/create" && request.method === "POST") {
      return handleCreate(request, env);
    }

    if (pathname === "/login" && request.method === "POST") {
      return handleLogin(request, env);
    }

    if (pathname === "/send-message" && request.method === "POST") {
      return handleSendMessage(request, env);
    }

    if (pathname === "/get-messages" && request.method === "GET") {
      return handleGetMessages(request, env);
    }

    if (pathname === "/favicon.ico") {
      return new Response(null, { status: 204 });
    }

    if(pathname === "/datacenters" && request.method === "GET") {
      return handleListDatacenters(request, env);
    }

    return new Response("Not Found", {
      status: 404,
      headers: { "content-type": "text/plain" },
    });
  },
} satisfies ExportedHandler<Env>;
