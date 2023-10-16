export async function GET(request) {
  return Response.json({ hi: "GET" });
}

export async function POST(request) {
  const res = await request.json();
  console.log(res);
  return Response.json(res);
}
