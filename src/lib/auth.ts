import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function validateSession() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('auth-token')?.value;

        if (!token) {
            return null; // Tidak ada token
        }

        // Verifikasi token
        const verified = await jwtVerify(token, SECRET);

        return {
            userId: verified.payload.userId as string,
            email: verified.payload.email as string,
            // data user lainnya
        };
    } catch (error) {
        return null; // Token invalid atau expired
    }
}