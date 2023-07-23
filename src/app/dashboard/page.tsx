import {getServerSession} from "next-auth";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import {authOptions} from "@/lib/auth";
import prisma from "@/lib/prisma";

export default async function DashboardMainPage() {
  const session = await getServerSession(authOptions);

  const projects = await prisma.project.findMany({
    where: {
      // @ts-ignore
      userId: session?.user?.id
    },
    include: {
      caches: true
    }
  });

  return (
    <div className="mx-auto">
      <DashboardOverview projects={projects} />
    </div>
  )
}