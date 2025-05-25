// Simple JWT signing utility for HS256

function base64url(input: string | ArrayBuffer): string {
  let str = typeof input === "string"
    ? btoa(input)
    : btoa(String.fromCharCode(...new Uint8Array(input as ArrayBuffer)));
  return str.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export async function signJwt(payload: object, secret: string): Promise<string> {
  if (!secret || typeof secret !== "string" || secret.length === 0) {
    throw new Error("JWT secret must be a non-empty string");
  }
  const encoder = new TextEncoder();
  const header = { alg: "HS256", typ: "JWT" };
  const headerB64 = base64url(JSON.stringify(header));
  const payloadB64 = base64url(JSON.stringify(payload));
  const data = `${headerB64}.${payloadB64}`;
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(data)
  );
  const signatureB64 = base64url(signature);
  return `${data}.${signatureB64}`;
}

export async function verifyJwt(token: string, secret: string): Promise<any> {
  if (!token || typeof token !== "string" || token.length === 0) {
    throw new Error("JWT token must be a non-empty string");
  }
  if (!secret || typeof secret !== "string" || secret.length === 0) {
    throw new Error("JWT secret must be a non-empty string");
  }
  const encoder = new TextEncoder();
  const [headerB64, payloadB64, signatureB64] = token.split(".");
  const data = `${headerB64}.${payloadB64}`;
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"]
  );
  const signature = Uint8Array.from(atob(signatureB64.replace(/-/g, "+").replace(/_/g, "/")), c => c.charCodeAt(0));
  const isValid = await crypto.subtle.verify(
    "HMAC",
    key,
    signature,
    encoder.encode(data)
  );
  if (!isValid) {
    throw new Error("Invalid JWT signature");
  }
  return JSON.parse(atob(payloadB64.replace(/-/g, "+").replace(/_/g, "/")));
}
