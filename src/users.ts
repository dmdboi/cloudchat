export async function createNewUser(env: any, username: string, password: string, datacenter: string): Promise<{ success: boolean }> {
  // Check if the username already exists
  const existingUser = await env.DB.prepare(`SELECT * FROM users WHERE username = ?`).bind(username).first();

  if (existingUser) {
    return { success: false };
  }

  const hashPassword = async (password: string): Promise<string> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
    return hashHex;
  };

  const hashedPassword = await hashPassword(password);

  const uid = crypto.randomUUID();

  await env.DB.prepare(`INSERT INTO users (username, uid, password, datacenter) VALUES (?, ?, ?, ?)`).bind(username, uid, hashedPassword, datacenter).run();

  return { success: true };
}
