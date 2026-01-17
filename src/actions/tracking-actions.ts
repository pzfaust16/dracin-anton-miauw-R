'use server'

import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { UAParser } from "ua-parser-js";

export async function trackVisitor() {
  try {
    const headersList = await headers();
    const userAgent = headersList.get("user-agent") || "Unknown";
    // In production, X-Forwarded-For is better, but this depends on hosting. Fallback to simplified check or mock.
    const ipAddress = headersList.get("x-forwarded-for") || "127.0.0.1"; 

    const parser = new UAParser(userAgent);
    const device = parser.getDevice();
    let deviceType: "MOBILE" | "DESKTOP" | "TABLET" | "OTHER" = "DESKTOP";

    if (device.type === "mobile") deviceType = "MOBILE";
    else if (device.type === "tablet") deviceType = "TABLET";
    else if (device.type === "smarttv" || device.type === "wearable" || device.type === "embedded") deviceType = "OTHER";
    
    // Naively assume desktop if not mobile/tablet and type is undefined (common for desktop browsers)
    if (!device.type) deviceType = "DESKTOP";

    // Create Visitor Log
    await prisma.websiteVisitor.create({
      data: {
        ipAddress: Array.isArray(ipAddress) ? ipAddress[0] : ipAddress.split(',')[0], // Handle comma separated list
        userAgent,
        deviceType,
        country: "Unknown", // GeoIP would go here
        day: new Date().toISOString().split('T')[0],
        week: getWeekNumber(new Date()),
        month: new Date().toISOString().slice(0, 7),
        year: new Date().getFullYear(),
      },
    });

    // Update Stats (Daily, Monthly)
    await updateStats("DAILY", new Date().toISOString().split('T')[0], deviceType);
    await updateStats("MONTHLY", new Date().toISOString().slice(0, 7), deviceType);

  } catch (error) {
    console.error("Tracking Error:", error);
  }
}

async function updateStats(period: "DAILY" | "WEEKLY" | "MONTHLY", periodValue: string, deviceType: string) {
  const isMobile = deviceType === "MOBILE" || deviceType === "TABLET"; // Group tablet with mobile for stats or adjust as needed
  const isDesktop = deviceType === "DESKTOP";

  // Upsert is not directly supported well with complex increments in one go if record doesn't exist, 
  // but Prisma upsert works.
  
  await prisma.visitorStats.upsert({
    where: {
      period_periodValue: {
        period,
        periodValue,
      },
    },
    update: {
      totalVisitors: { increment: 1 },
      mobileCount: { increment: isMobile ? 1 : 0 },
      desktopCount: { increment: isDesktop ? 1 : 0 },
      // uniqueIPs logic omitted for simplicity, would require checking recent visitors
    },
    create: {
      period,
      periodValue,
      totalVisitors: 1,
      mobileCount: isMobile ? 1 : 0,
      desktopCount: isDesktop ? 1 : 0,
    },
  });
}

function getWeekNumber(d: Date): number {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  var weekNo = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  return weekNo;
}
