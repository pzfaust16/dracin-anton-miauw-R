-- CreateEnum
CREATE TYPE "DeviceType" AS ENUM ('MOBILE', 'DESKTOP', 'TABLET', 'OTHER');

-- CreateEnum
CREATE TYPE "StatsType" AS ENUM ('DAILY', 'WEEKLY', 'MONTHLY');

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

-- CreateTable
CREATE TABLE "website_visitor" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "ipAddress" TEXT NOT NULL,
    "userAgent" TEXT NOT NULL,
    "deviceType" "DeviceType" NOT NULL,
    "referrer" TEXT,
    "country" TEXT,
    "city" TEXT,
    "visitedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "day" CHAR(10) NOT NULL,
    "week" INTEGER NOT NULL,
    "month" CHAR(7) NOT NULL,
    "year" INTEGER NOT NULL,

    CONSTRAINT "website_visitor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "visitor_stats" (
    "id" TEXT NOT NULL,
    "period" "StatsType" NOT NULL,
    "periodValue" TEXT NOT NULL,
    "totalVisitors" INTEGER NOT NULL DEFAULT 0,
    "mobileCount" INTEGER NOT NULL DEFAULT 0,
    "desktopCount" INTEGER NOT NULL DEFAULT 0,
    "tabletCount" INTEGER NOT NULL DEFAULT 0,
    "uniqueIPs" INTEGER NOT NULL DEFAULT 0,
    "topReferrers" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "visitor_stats_pkey" PRIMARY KEY ("id")
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

-- CreateIndex
CREATE INDEX "website_visitor_ipAddress_idx" ON "website_visitor"("ipAddress");

-- CreateIndex
CREATE INDEX "website_visitor_deviceType_idx" ON "website_visitor"("deviceType");

-- CreateIndex
CREATE INDEX "website_visitor_day_idx" ON "website_visitor"("day");

-- CreateIndex
CREATE INDEX "website_visitor_week_idx" ON "website_visitor"("week");

-- CreateIndex
CREATE INDEX "website_visitor_month_idx" ON "website_visitor"("month");

-- CreateIndex
CREATE INDEX "website_visitor_visitedAt_idx" ON "website_visitor"("visitedAt");

-- CreateIndex
CREATE INDEX "visitor_stats_period_idx" ON "visitor_stats"("period");

-- CreateIndex
CREATE INDEX "visitor_stats_periodValue_idx" ON "visitor_stats"("periodValue");

-- CreateIndex
CREATE UNIQUE INDEX "visitor_stats_period_periodValue_key" ON "visitor_stats"("period", "periodValue");

-- AddForeignKey
ALTER TABLE "affiliate_link" ADD CONSTRAINT "affiliate_link_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "affiliate_click" ADD CONSTRAINT "affiliate_click_affiliateLinkId_fkey" FOREIGN KEY ("affiliateLinkId") REFERENCES "affiliate_link"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "affiliate_click" ADD CONSTRAINT "affiliate_click_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "website_visitor" ADD CONSTRAINT "website_visitor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
