/**
 * It recevies a rule definition and start generating the verifier, and redirect to the /api/getVerifier/hash
 */

export async function POST(req: Request) {
  const data = await req.json();

  // compute hash

  // redirect

  return Response.json({ message: "finished, but you should not be here" });
}
