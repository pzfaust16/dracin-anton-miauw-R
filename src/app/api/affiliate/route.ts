import { validateSession } from '@/lib/auth';
import { getAffiliateLinks, createAffiliateLink } from '@/server/db/affiliate.db';

export async function GET(req: Request) {
    const session = await validateSession();
    if (!session) return new Response('Unauthorized', { status: 401 });

    const links = await getAffiliateLinks(session.userId);
    return Response.json(links);
}

// export async function POST(req: Request) {
//     const { link } = await req.json();
//     const session = await validateSession();

//     const newLink = await createAffiliateLink(session.userId, link);
//     return Response.json(newLink, { status: 201 });
// }