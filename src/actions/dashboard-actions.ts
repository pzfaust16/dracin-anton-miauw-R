'use server'

import { prisma } from "@/lib/prisma";
import { startOfDay, subDays, format } from "date-fns";

export async function getWebsiteVisitors(limit = 10) {
  try {
    const visitors = await prisma.websiteVisitor.findMany({
      take: limit,
      orderBy: {
        visitedAt: 'desc',
      },
    });
    return visitors;
  } catch (error) {
    console.error("Failed to fetch website visitors:", error);
    return [];
  }
}

export async function getVisitorStats(limit = 10) {
  try {
    const stats = await prisma.visitorStats.findMany({
      take: limit,
      orderBy: {
        updatedAt: 'desc',
      },
    });
    return stats;
  } catch (error) {
    console.error("Failed to fetch visitor stats:", error);
    return [];
  }
}

export async function getVisitorChartData(days = 90) {
  try {
    const startDate = startOfDay(subDays(new Date(), days));
    
    const visitors = await prisma.websiteVisitor.findMany({
      where: {
        visitedAt: {
          gte: startDate,
        },
      },
      select: {
        visitedAt: true,
        deviceType: true,
      },
    });

    // Aggregate data by date
    const aggregatedData = visitors.reduce((acc, visitor) => {
      const date = format(visitor.visitedAt, 'yyyy-MM-dd');
      if (!acc[date]) {
        acc[date] = { date, desktop: 0, mobile: 0 };
      }
      
      if (visitor.deviceType === 'DESKTOP') {
        acc[date].desktop++;
      } else if (visitor.deviceType === 'MOBILE') {
        acc[date].mobile++;
      }
      // Treat TABLET and OTHER as mobile for simplicity in this chart or ignore
      // Let's add them to mobile for now or create a separate category if needed
      // but the chart expects desktop/mobile. 
      else {
         acc[date].mobile++;
      }
      
      return acc;
    }, {} as Record<string, { date: string; desktop: number; mobile: number }>);

    // Convert to array and sort by date
    return Object.values(aggregatedData).sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );

  } catch (error) {
    console.error("Failed to fetch visitor chart data:", error);
    return [];
  }
}
