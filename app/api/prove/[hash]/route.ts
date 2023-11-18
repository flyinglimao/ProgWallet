import proof from "./proof.json";

export async function POST(req: Request) {
  const data = await req.json();

  // TODO: gen real proof
  if (data.pass) return Response.json({ proof });
  return Response.json({ error: "fail to gen proof" });
}
