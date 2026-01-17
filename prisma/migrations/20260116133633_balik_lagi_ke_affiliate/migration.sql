/*
  Warnings:

  - You are about to drop the `drama` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `drama_click` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "drama_click" DROP CONSTRAINT "drama_click_dramaId_fkey";

-- AlterTable
ALTER TABLE "website_visitor" ADD COLUMN     "userId" TEXT;

-- DropTable
DROP TABLE "drama";

-- DropTable
DROP TABLE "drama_click";

-- DropEnum
DROP TYPE "DramaStatus";

-- CreateTable
CREATE TABLE "affiliate_link" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "clickCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "affiliate_link_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "affiliate_click" (
    "id" TEXT NOT NULL,
    "affiliateLinkId" TEXT NOT NULL,
    "userId" TEXT,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "referrer" TEXT,
    "clickedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "affiliate_click_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "affiliate_link_link_key" ON "affiliate_link"("link");

-- CreateIndex
CREATE INDEX "affiliate_link_userId_idx" ON "affiliate_link"("userId");

-- CreateIndex
CREATE INDEX "affiliate_link_link_idx" ON "affiliate_link"("link");

-- CreateIndex
CREATE INDEX "affiliate_click_affiliateLinkId_idx" ON "affiliate_click"("affiliateLinkId");

-- CreateIndex
CREATE INDEX "affiliate_click_userId_idx" ON "affiliate_click"("userId");

-- CreateIndex
CREATE INDEX "affiliate_click_clickedAt_idx" ON "affiliate_click"("clickedAt");

-- CreateIndex
CREATE INDEX "website_visitor_userId_idx" ON "website_visitor"("userId");

-- AddForeignKey
ALTER TABLE "affiliate_link" ADD CONSTRAINT "affiliate_link_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "affiliate_click" ADD CONSTRAINT "affiliate_click_affiliateLinkId_fkey" FOREIGN KEY ("affiliateLinkId") REFERENCES "affiliate_link"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "affiliate_click" ADD CONSTRAINT "affiliate_click_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "website_visitor" ADD CONSTRAINT "website_visitor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
