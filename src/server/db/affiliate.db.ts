"use server"
import { prisma } from "@/lib/prisma";
import { auth } from "@/utils/auth";
import { headers } from "next/headers";

export async function createAffiliateLink(provider: string, link: string) {
    const headersList = await headers();
    const cookieHeader = headersList.get("cookie") || "";

    console.log("Cookie header:", cookieHeader);

    // Coba method yang benar
    const session = await auth.api.getSession({
        headers: {
            cookie: cookieHeader,
        }
    });

    console.log("Full session object:", JSON.stringify(session, null, 2));
    if (!session?.user?.id) {
        throw new Error('Unauthorized - No session found')
    }

    console.log("User ID:", session.user.id);
    console.log("Provider:", provider, "Link:", link);
    return prisma.affiliateLink.create({
        data: { userId: session.user.id, provider, link }
    });
}

export async function getAffiliateLinks(userId: string) {
    return prisma.affiliateLink.findMany({
        where: { userId },
        include: { _count: { select: { affiliateClicks: true } } }
    });
}