import {getServerSession} from "next-auth";
import {NextResponse} from "next/server";
import {authOptions} from "@/lib/auth";
import prisma from "@/lib/prisma";
import {User} from ".prisma/client";

export type CacheCreateRequest = {
  projectName: string;
  cacheId: string;
}

export async function POST(request: Request) {
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
  }) as User;

  if (!user) {
    return new NextResponse(
      JSON.stringify({body: "User not found"}),
      {status: 401}
    );
  }

  const body = await request.json()
  const req = body as CacheCreateRequest;

  // const projectName = (request.body as ProjectCreateRequest).projectName;
  const project = await prisma.project.findUnique({
    where: {
      id: req.cacheId
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

  const newCache = await prisma.cache.create({
    data: {
      name: req.projectName,
      url: "",
      cachedJson: "",
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