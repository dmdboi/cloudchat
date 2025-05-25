import { response } from "../response";
import { verifyJwt } from "../utils/jwt";

export async function handleSendMessage(request: Request, env: any): Promise<Response> {
  try{
     // Get message data from the request
  const { message } = (await request.json().catch(() => ({}))) as {
    message: string;
  };

  if (!message) {
    return response(400, {
      message: "Message is required",
    });
  }

  // Get the user ID from the JWT token
  const token = request.headers.get("Authorization")?.split(" ")[1];
  if (!token) {
    return response(401, {
      message: "Unauthorized",
    });
  }

  const { uid } = await verifyJwt(token, "anKuAm7bvTQ9Q82ZJXwLorcxwiQzij55").catch(() => null);

  if (!uid) {
    return response(401, {
      message: "Unauthorized",
    });
  }

    const user = await env.DB.prepare(`SELECT * FROM users WHERE uid = ?`).bind(uid).first();

  console.error("User not found:", user);

  const datacenter = request.cf?.colo;

  await env.DB.prepare(`INSERT INTO messages (user_id, username, content, datacenter) VALUES (?, ?, ?, ?)`).bind(user.uid, user.username, message, datacenter).run();

  return response(200, {
    message: "Message sent successfully",
    data: {
      datacenter,
    },
  });
  } catch (error) {
    console.error("Error sending message:", error);
    return response(500, {
      message: "Internal Server Error",
    });
  }
}
