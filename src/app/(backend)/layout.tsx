// app/dashboard/layout.tsx
import type { Metadata } from "next";
import "@/styles/globals.css";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Plus_Jakarta_Sans } from 'next/font/google';

const plusJakartaSans = Plus_Jakarta_Sans({
    subsets: ['latin'],
    weight: ['400', '600', '700', '800'],
    variable: '--font-plus-jakarta-sans',
});

export const metadata: Metadata = {
    title: "Dashboard - MaoMao",
    description: "Panel pengguna",
};

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Providers>
                {/* TIDAK ADA Header atau Footer di sini */}
                {children}
                <Toaster />
                <Sonner />
            </Providers>
        </>
    );
}