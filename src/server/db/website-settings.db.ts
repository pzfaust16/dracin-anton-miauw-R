"use server"
import { prisma } from "@/lib/prisma";
import { auth } from "@/utils/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export async function getWebsiteSettings() {
    return prisma.websiteSetting.findFirst();
}

export async function updateWebsiteSettings(data: {
    websiteName: string;
    heroTitle: string;
    heroTagline?: string;
    heroDescription?: string;
    footerText?: string;
    primaryColor?: string;
    secondaryColor?: string;
    metaDescription?: string;
    metaKeywords?: string;
    googleAnalyticsId?: string;
}) {
    const headersList = await headers();
    const cookieHeader = headersList.get("cookie") || "";
    
    const session = await auth.api.getSession({
        headers: {
            cookie: cookieHeader,
        }
    });

    if (!session?.user) {
        throw new Error('Unauthorized');
    }

    // Upsert mechanism: update the first record we find, or create one.
    // Since we don't have a known ID, we can't use upsert purely by ID easily without knowing it.
    // But usually there is only one settings row.
    // We can findFirst, if exists update, else create.

    const existing = await prisma.websiteSetting.findFirst();

    if (existing) {
        const updated = await prisma.websiteSetting.update({
            where: { id: existing.id },
            data: { ...data }
        });
        revalidatePath('/'); // Revalidate everything as settings might affect global layout
        return updated;
    } else {
        const created = await prisma.websiteSetting.create({
            data: { ...data }
        });
        revalidatePath('/');
        return created;
    }
}
