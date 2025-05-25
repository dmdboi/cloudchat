import { response } from "../response";
import { verifyJwt } from "../utils/jwt";

export async function handleGetMessages(request: Request, env: any): Promise<Response> {
  // Get the user ID from the JWT token
  const token = request.headers.get("Authorization")?.split(" ")[1];
  if (!token) {
    return response(401, {
      message: "Unauthorized",
    });
  }

  const user = await verifyJwt(token, "anKuAm7bvTQ9Q82ZJXwLorcxwiQzij55").catch(() => null);

  if (!user) {
    return response(401, {
      message: "Unauthorized",
    });
  }

  const datacenter = request.cf?.colo;

  // Fetch messages from the database
  const messages = await env.DB.prepare(
    `SELECT * FROM messages WHERE datacenter = ?
        ORDER BY created_at ASC LIMIT 10`
  )
    .bind(datacenter)
    .all();

  if (!messages) {
    return response(500, {
      message: "Internal Server Error",
    });
  }

  return response(200, { messages: messages.results });
}
