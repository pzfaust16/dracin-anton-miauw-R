/*
  Warnings:

  - You are about to drop the column `userId` on the `website_visitor` table. All the data in the column will be lost.
  - You are about to drop the `affiliate_click` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `affiliate_link` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "DramaStatus" AS ENUM ('ONGOING', 'COMPLETED', 'COMING_SOON');

-- DropForeignKey
ALTER TABLE "affiliate_click" DROP CONSTRAINT "affiliate_click_affiliateLinkId_fkey";

-- DropForeignKey
ALTER TABLE "affiliate_click" DROP CONSTRAINT "affiliate_click_userId_fkey";

-- DropForeignKey
ALTER TABLE "affiliate_link" DROP CONSTRAINT "affiliate_link_userId_fkey";

-- DropForeignKey
ALTER TABLE "website_visitor" DROP CONSTRAINT "website_visitor_userId_fkey";

-- DropIndex
DROP INDEX "website_visitor_userId_idx";

-- AlterTable
ALTER TABLE "website_visitor" DROP COLUMN "userId";

-- DropTable
DROP TABLE "affiliate_click";

-- DropTable
DROP TABLE "affiliate_link";

-- CreateTable
CREATE TABLE "drama" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "posterUrl" TEXT,
    "thumbnailUrl" TEXT,
    "genre" TEXT,
    "year" INTEGER,
    "rating" DOUBLE PRECISION DEFAULT 0,
    "totalEpisodes" INTEGER,
    "status" "DramaStatus" NOT NULL DEFAULT 'ONGOING',
    "affiliateLink" TEXT NOT NULL,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "affiliateClickCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "drama_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "drama_click" (
    "id" TEXT NOT NULL,
    "dramaId" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "userAgent" TEXT NOT NULL,
    "referrer" TEXT,
    "clickedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "day" CHAR(10) NOT NULL,
    "week" INTEGER NOT NULL,
    "month" CHAR(7) NOT NULL,

    CONSTRAINT "drama_click_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "drama_slug_key" ON "drama"("slug");

-- CreateIndex
CREATE INDEX "drama_slug_idx" ON "drama"("slug");

-- CreateIndex
CREATE INDEX "drama_genre_idx" ON "drama"("genre");

-- CreateIndex
CREATE INDEX "drama_year_idx" ON "drama"("year");

-- CreateIndex
CREATE INDEX "drama_click_dramaId_idx" ON "drama_click"("dramaId");

-- CreateIndex
CREATE INDEX "drama_click_ipAddress_idx" ON "drama_click"("ipAddress");

-- CreateIndex
CREATE INDEX "drama_click_clickedAt_idx" ON "drama_click"("clickedAt");

-- CreateIndex
CREATE INDEX "drama_click_day_idx" ON "drama_click"("day");

-- AddForeignKey
ALTER TABLE "drama_click" ADD CONSTRAINT "drama_click_dramaId_fkey" FOREIGN KEY ("dramaId") REFERENCES "drama"("id") ON DELETE CASCADE ON UPDATE CASCADE;
