"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signUp } from "@/utils/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function RegisterPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (password !== confirmPassword) {
            toast.error("Password tidak cocok", {
                description: "Pastikan password dan konfirmasi password sama",
            });
            return;
        }

        if (password.length < 8) {
            toast.error("Password terlalu pendek", {
                description: "Password minimal 8 karakter",
            });
            return;
        }

        setIsLoading(true);

        try {
            const result = await signUp.email({
                email,
                password,
                name,
            });

            if (result.error) {
                toast.error("Registrasi gagal", {
                    description: result.error.message || "Silakan coba lagi",
                });
            } else {
                toast.success("Registrasi berhasil!", {
                    description: "Mengalihkan ke halaman login...",
                });
                router.push("/login");
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
                        Buat Akun Baru
                    </h1>
                    <p className="text-gray-400">
                        Daftar untuk mengakses dashboard
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-gray-200">
                            Nama
                        </Label>
                        <Input
                            id="name"
                            type="text"
                            placeholder="Nama lengkap"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            disabled={isLoading}
                            className="bg-black/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-orange-500 focus:ring-orange-500/20"
                        />
                    </div>

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
                            placeholder="Minimal 8 karakter"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={isLoading}
                            className="bg-black/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-orange-500 focus:ring-orange-500/20"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword" className="text-gray-200">
                            Konfirmasi Password
                        </Label>
                        <Input
                            id="confirmPassword"
                            type="password"
                            placeholder="Ulangi password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
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
                            "Daftar"
                        )}
                    </Button>
                </form>

                {/* Footer */}
                <div className="mt-6 text-center">
                    <p className="text-gray-400 text-sm">
                        Sudah punya akun?{" "}
                        <Link
                            href="/login"
                            className="text-orange-500 hover:text-orange-400 font-semibold transition-colors"
                        >
                            Login di sini
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
