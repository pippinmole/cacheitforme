import {getServerSession} from "next-auth";
import {NextResponse} from "next/server";
import {authOptions} from "@/lib/auth";
import prisma from "@/lib/prisma";

export type CacheCreateRequest = {
  name: string;
  url: string;
}

export type CacheDeleteRequest = {
  cacheId: string;
}

// Create a new cache for a project
export async function POST(request: Request, context: { params: any }) {

  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse(
      JSON.stringify({body: "User not found"}),
      {status: 401}
    )
  }

  const user = await prisma.user.findUnique({
    where: {
      // @ts-ignore
      id: session?.user?.id
    }
  });

  if (!user) {
    return new NextResponse(
      JSON.stringify({body: "User not found"}),
      {status: 401}
    );
  }

  const body = await request.json()
  const req = body as CacheCreateRequest;

  console.log("Context projectId: " + context.params.projectId)

  const project = await prisma.project.findUnique({
    where: {
      id: context.params.projectId
    },
    include: {
      caches: true
    }
  })

  if (!project) {
    return new NextResponse(
      JSON.stringify({body: "Project not found"}),
      {status: 401}
    );
  }

  const response = await fetch(req.url);
  if(!response.ok) {
    return new NextResponse(
      JSON.stringify({
        body: "Error from target URL",
        status: response.status,
        statusText: response.statusText
      }),
      {status: 401}
    );
  }

  const newCache = await prisma.cache.create({
    data: {
      name: req.name,
      url: req.url,
      cachedJson: JSON.stringify(response.json()),
      project: {
        connect: {
          id: project.id
        }
      }
    },
  });

  // Update the projects to include the newly added cache
  const updatedProject = await prisma.project.update({
    where: {id: project.id},
    data: {caches: {connect: {id: newCache.id}}}, // Connect the cache to the projects
    include: {caches: true}, // Include the caches again to return the updated list
  });

  return NextResponse.json(updatedProject);
}

// Create a new cache for a project
export async function DELETE(request: Request) {

  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse(
      JSON.stringify({body: "User not found"}),
      {status: 401}
    )
  }

  const user = await prisma.user.findUnique({
    where: {
      // @ts-ignore
      id: session?.user?.id
    }
  });

  if (!user) {
    return new NextResponse(
      JSON.stringify({body: "User not found"}),
      {status: 401}
    );
  }

  const body = await request.json()
  const req = body as CacheDeleteRequest;

  await prisma.cache.delete({
    where: {
      id: req.cacheId,
    },
  });

  return NextResponse.json({message: "Successfully deleted project"});
}