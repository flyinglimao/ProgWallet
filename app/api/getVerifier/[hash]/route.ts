export async function GET(
  req: Request,
  { params }: { params: { hash: string } }
) {
  const finished = false;

  return Response.json({ hash: params.hash });
}
