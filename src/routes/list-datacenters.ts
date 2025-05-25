import { response } from "../response";

export async function handleListDatacenters(request: Request, env: any): Promise<Response> {
  const datacenters = await env.DB.prepare(`Select datacenter from users`).all();

  if (!datacenters) {
    return new Response("Internal Server Error", {
      status: 500,
      headers: { "content-type": "text/plain" },
    });
  }

  // Return a unique array of datacenters with user count for each
  const datacenterList = datacenters.results.reduce((acc: any, datacenter: any) => {
    const dc = datacenter.datacenter;
    if (!acc[dc]) {
      acc[dc] = { name: dc, count: 1 };
    } else {
      acc[dc].count++;
    }
    return acc;
  }, {});

  const datacenterListArray = Object.values(datacenterList);

  return new Response(JSON.stringify({
    datacenters: datacenterListArray
  }), {
    status: 200,
    headers: {
      "content-type": "application/json",
      "cache-control": "public, max-age=30",
      "access-control-allow-origin": "*",
      "access-control-allow-headers": "Content-Type, Authorization",
      "access-control-allow-methods": "GET, POST, OPTIONS",
    },
  });
}
