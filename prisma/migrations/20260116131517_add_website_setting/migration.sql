-- CreateTable
CREATE TABLE "website_setting" (
    "id" TEXT NOT NULL,
    "logoUrl" TEXT,
    "websiteName" TEXT NOT NULL,
    "heroTitle" TEXT NOT NULL,
    "heroTagline" TEXT,
    "heroDescription" TEXT,
    "heroBgImageUrl" TEXT,
    "footerText" TEXT,
    "footerLogo" TEXT,
    "socialMediaLinks" TEXT,
    "primaryColor" TEXT NOT NULL DEFAULT '#000000',
    "secondaryColor" TEXT NOT NULL DEFAULT '#FFFFFF',
    "metaDescription" TEXT,
    "metaKeywords" TEXT,
    "googleAnalyticsId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "website_setting_pkey" PRIMARY KEY ("id")
);
