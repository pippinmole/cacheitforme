import {Prisma} from "@prisma/client";

const projectWithCache = Prisma.validator<Prisma.ProjectArgs>()({
  include: {caches: true}
})

export type ProjectWithCaches = Prisma.ProjectGetPayload<typeof projectWithCache>