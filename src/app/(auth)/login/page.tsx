"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn, signOut } from "@/utils/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const result = await signIn.email({
                email,
                password,
            });

            if (result.error) {
                toast.error("Login gagal", {
                    description: result.error.message || "Email atau password salah",
                });
            } else {
                // Cek apakah email sudah verified
                if (!result.data?.user?.emailVerified) {
                    toast.error("Email belum diverifikasi", {
                        description: "Silakan verifikasi email Anda terlebih dahulu",
                    });

                    // Logout/hapus session
                    await signOut();

                    return;
                }

                toast.success("Login berhasil!", {
                    description: "Mengalihkan ke dashboard...",
                });

                // Redirect setelah 1 detik (beri waktu toast muncul)
                setTimeout(() => {
                    router.push("/dashboard");
                }, 1000);
            }
        } catch (error) {
            toast.error("Terjadi kesalahan", {
                description: "Silakan coba lagi",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md">
            <div className="glass-strong rounded-2xl p-8 shadow-2xl border border-orange-500/20">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">
                        Selamat Datang Kembali
                    </h1>
                    <p className="text-gray-400">
                        Login untuk mengakses dashboard
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-200">
                            Email
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="nama@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={isLoading}
                            className="bg-black/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-orange-500 focus:ring-orange-500/20"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-gray-200">
                            Password
                        </Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={isLoading}
                            className="bg-black/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-orange-500 focus:ring-orange-500/20"
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-6 rounded-xl transition-all duration-300 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Memproses...
                            </>
                        ) : (
                            "Login"
                        )}
                    </Button>
                </form>

                {/* Footer */}
                <div className="mt-6 text-center">
                    <p className="text-gray-400 text-sm">
                        Belum punya akun?{" "}
                        <Link
                            href="/register"
                            className="text-orange-500 hover:text-orange-400 font-semibold transition-colors"
                        >
                            Daftar sekarang
                        </Link>
                    </p>
                </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl" />
            </div>
        </div>
    );
}
