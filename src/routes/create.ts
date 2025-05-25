import { response } from "../response";
import { createNewUser } from "../users";
import { getDatacenter } from "../utils";

export async function handleCreate(request: Request, env: any): Promise<Response> {
  const datacenter = getDatacenter((request.cf! as any));
  const { username, password } = (await request.json().catch(() => ({}))) as {
    username: string;
    password: string;
  };

  if (!username || !password) {
    return response(400, {
      message: "Username and password are required",
    });
  }

  const { success } = await createNewUser(env, username, password, datacenter);

  if (!success) {
    return response(400, {
      message: `User ${username} already exists`,
    });
  }

  return response(200, {
    message: `User ${username} created successfully in ${datacenter}`,
  });
}