import prisma from "@/lib/prisma";
import CacheOverview from "@/components/dashboard/CacheOverview";

export default async function ProjectPage({ params }: { params: { id: string } }) {

  const project = await prisma.project.findUnique({
    where: {
      id: params.id
    },
    include: {
      caches: true
    }
  });

  if (!project) {
    return (
      <div>
        Project not found
      </div>
    )
  }

  return (
    <>
      <CacheOverview project={project}/>
    </>
  )
}