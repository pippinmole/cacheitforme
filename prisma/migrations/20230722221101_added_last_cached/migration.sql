/*
  Warnings:

  - You are about to drop the column `json` on the `Cache` table. All the data in the column will be lost.
  - You are about to drop the column `route` on the `Cache` table. All the data in the column will be lost.
  - Added the required column `cachedJson` to the `Cache` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Cache` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Cache` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Cache_route_key";

-- AlterTable
ALTER TABLE "Cache" DROP COLUMN "json",
DROP COLUMN "route",
ADD COLUMN     "cachedJson" TEXT NOT NULL,
ADD COLUMN     "lastCached" TIMESTAMP(3),
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL,
ALTER COLUMN "expiresAt" SET DEFAULT NOW() + interval '1 day';
