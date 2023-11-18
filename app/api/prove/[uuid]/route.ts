export async function POST(req: Request) {
  const data = await req.json();

  // compute hash

  // send response

  return Response.json({ message: "finished, but you should not be here" });
}
