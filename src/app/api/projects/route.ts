import {getServerSession} from "next-auth";
import {NextResponse} from "next/server";
import {authOptions} from "@/lib/auth";
import prisma from "@/lib/prisma";
import {User} from ".prisma/client";

export type ProjectCreateRequest = {
  projectName: string
}

// Create a new project
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if(!session) {
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

  if(!user) {
    return new NextResponse(
      JSON.stringify({body: "User not found"}),
      {status: 401}
    );
  }

  const body = await request.json()
  const req = body as ProjectCreateRequest;

  // const projectName = (request.body as ProjectCreateRequest).projectName;
  const project = await prisma.project.create({
    data: {
      name: req.projectName,
      user:{
        connect: {
          id: user?.id
        }
      }
    }
  })

  return NextResponse.json(project);
}

type ProjectDeleteRequest = {
  projectId: string
}

// Delete a project
export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);

  if(!session) {
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

  if(!user) {
    return new NextResponse(
      JSON.stringify({body: "User not found"}),
      {status: 401}
    );
  }

  const body = await request.json()

  const projectId = body.projectId;

  if(!projectId) {
    return new NextResponse(
      JSON.stringify({body: "Please provide a projects id"}),
      {status: 401}
    );
  }

  // const projectName = (request.body as ProjectCreateRequest).projectName;
  const project = await prisma.project.delete({
    where: {
      id: body.projectId
    }
  })

  return NextResponse.json(project);
}