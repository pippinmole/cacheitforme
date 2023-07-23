import {NextResponse} from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request, context: { params: any }) {

  const cacheId = context.params.cacheId;

  const cache = await prisma.cache.findUnique({
    where: {
      id: cacheId
    }
  });

  if (!cache) {
    return new NextResponse(
      JSON.stringify({body: "Cache not found"}),
      {status: 401}
    );
  }

  const obj = JSON.parse(cache.cachedJson)

  return NextResponse.json(obj);
}