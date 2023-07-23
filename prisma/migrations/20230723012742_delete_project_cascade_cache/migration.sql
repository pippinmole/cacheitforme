-- DropForeignKey
ALTER TABLE "Cache" DROP CONSTRAINT "Cache_projectId_fkey";

-- AlterTable
ALTER TABLE "Cache" ALTER COLUMN "expiresAt" SET DEFAULT NOW() + interval '1 day';

-- AddForeignKey
ALTER TABLE "Cache" ADD CONSTRAINT "Cache_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
