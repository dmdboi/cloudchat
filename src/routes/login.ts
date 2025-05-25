import { response } from "../response";
import { hashPassword } from "../utils/hash";
import { signJwt } from "../utils/jwt";

export async function handleLogin(request: Request, env: any): Promise<Response> {
  const { username, password } = (await request.json().catch(() => ({}))) as {
    username: string;
    password: string;
  };

  if (!username || !password) {
    return response(400, {
      message: "Username and password are required",
    });
  }

  const user = await env.DB.prepare(`SELECT * FROM users WHERE username = ?`).bind(username).first();

  if (!user) {
    return response(400, {
      message: `User ${username} does not exist`,
    });
  }

  const hashedPassword = await hashPassword(password);
  if (hashedPassword !== user.password) {
    return response(400, {
      message: `User or password is incorrect`,
    });
  }

  const jwt = await signJwt({ uid: user.uid }, "anKuAm7bvTQ9Q82ZJXwLorcxwiQzij55");

  return response(200, {
    message: `User ${username} logged in successfully`,
    token: jwt,
  });
}