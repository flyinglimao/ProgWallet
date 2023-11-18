const cache: { [key: string]: number } = {};

export async function GET(
  req: Request,
  { params }: { params: { hash: string } }
) {
  if (new Date().getTime() - cache[params.hash] > 5000) {
    return Response.json({ verifier: "" });
  }
  if (!cache[params.hash]) cache[params.hash] = new Date().getTime();

  return Response.json({ status: "waiting" });
}
