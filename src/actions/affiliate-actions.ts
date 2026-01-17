'use server'

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

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

export async function deleteAffiliateLink(id: string) {
  try {
    await prisma.affiliateLink.delete({
      where: { id },
    });
    revalidatePath("/affiliate"); // Revalidate cache to update table
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete affiliate link:", error);
    return { success: false, error: "Failed to delete" };
  }
}

export async function updateAffiliateLink(id: string, data: { provider: string; link: string }) {
  try {
    await prisma.affiliateLink.update({
      where: { id },
      data: {
        provider: data.provider,
        link: data.link,
      },
    });
    revalidatePath("/affiliate");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Failed to update affiliate link:", error);
    return { success: false, error: "Failed to update" };
  }
}
