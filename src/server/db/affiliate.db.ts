import { prisma } from "@/lib/prisma";

export async function createAffiliateLink(userId: string, link: string) {
    return prisma.affiliateLink.create({
        data: { userId, link }
    });
}

export async function getAffiliateLinks(userId: string) {
    return prisma.affiliateLink.findMany({
        where: { userId },
        include: { _count: { select: { affiliateClicks: true } } }
    });
}