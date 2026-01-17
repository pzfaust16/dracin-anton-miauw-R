// import { validateSession } from '@/lib/auth';
// import { getAffiliateLinks, createAffiliateLink } from '@/server/db/affiliate.db';

// export async function GET(req: Request) {
//     const session = await validateSession();
//     if (!session) return new Response('Unauthorized', { status: 401 });

//     const links = await getAffiliateLinks(session.userId);
//     return Response.json(links);
// }

// export async function POST(req: Request) {
//     const { link } = await req.json();
//     const session = await validateSession();

//     const newLink = await createAffiliateLink(session.userId, link);
//     return Response.json(newLink, { status: 201 });
// }

// src/app/api/affiliate-links/random/route.ts

// src/app/api/affiliate-links/random/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        // Ambil semua link affiliate tanpa filter active
        const links = await prisma.affiliateLink.findMany({
            select: {
                id: true,     // opsional, untuk logging
                link: true,   // hanya ini yang dibutuhkan
                provider: true // opsional, jika ingin tampilkan di log
            },
            orderBy: { createdAt: 'desc' } // urutkan terbaru dulu (opsional)
        });

        if (links.length === 0) {
            return NextResponse.json({ error: "No affiliate links available" }, { status: 404 });
        }

        // Pilih secara acak
        const randomIndex = Math.floor(Math.random() * links.length);
        const randomLink = links[randomIndex];

        // Optional: increment clickCount di server (jika ingin tracking)
        await prisma.affiliateLink.update({
            where: { id: randomLink.id },
            data: { clickCount: { increment: 1 } }
        });

        return NextResponse.json({ url: randomLink.link });
    } catch (error) {
        console.error("Error fetching affiliate link:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}