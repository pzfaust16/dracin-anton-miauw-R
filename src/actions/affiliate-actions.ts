'use server'

import { prisma } from "@/lib/prisma";


export async function getAffiliateLinks() {
  try {
    const links = await prisma.affiliateLink.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return links;
  } catch (error) {
    console.error("Failed to fetch affiliate links:", error);
    return [];
  }
}
