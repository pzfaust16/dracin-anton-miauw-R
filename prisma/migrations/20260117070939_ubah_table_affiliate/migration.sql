/*
  Warnings:

  - You are about to drop the column `description` on the `affiliate_link` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `affiliate_link` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "affiliate_link" DROP COLUMN "description",
DROP COLUMN "title",
ADD COLUMN     "provider" TEXT;
