// it may take a while to gen proof hence we use polling pattern
export async function POST(req: Request) {
  const data = await req.json();

  // compute hash

  // redirect

  return Response.json({ message: "finished, but you should not be here" });
}
