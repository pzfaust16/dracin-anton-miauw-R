"use client";

import { useState } from "react";
import { authClient } from "@/utils/auth-client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/admin/app-sidebar";
import { SiteHeader } from "@/components/admin/site-header";
import { WebsiteSettingsForm } from "@/components/admin/website-settings-form";

export default function ProfilePage() {
    const { data: session } = authClient.useSession();

    // Email state
    const [newEmail, setNewEmail] = useState("");
    const [isUpdatingEmail, setIsUpdatingEmail] = useState(false);

    // Password state
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

    const handleUpdateEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsUpdatingEmail(true);

        try {
            await authClient.changeEmail({
                newEmail,
                callbackURL: window.location.href, // Redirect back here or show success
            }, {
                onSuccess: () => {
                    toast.success("Email update verification sent. Please check your new email.");
                    setNewEmail("");
                },
                onError: (ctx) => {
                    toast.error(ctx.error.message || "Failed to update email");
                }
            });
        } catch (error) {
            console.error(error);
            toast.error("An unexpected error occurred");
        } finally {
            setIsUpdatingEmail(false);
        }
    };

    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            toast.error("New passwords do not match");
            return;
        }

        setIsUpdatingPassword(true);

        try {
            await authClient.changePassword({
                newPassword: newPassword,
                currentPassword: currentPassword,
                revokeOtherSessions: true,
            }, {
                onSuccess: () => {
                    toast.success("Password updated successfully");
                    setCurrentPassword("");
                    setNewPassword("");
                    setConfirmPassword("");
                },
                onError: (ctx) => {
                    toast.error(ctx.error.message || "Failed to update password");
                }
            });
        } catch (error) {
            console.error(error);
            toast.error("An unexpected error occurred");
        } finally {
            setIsUpdatingPassword(false);
        }
    };
    // <Card>
    //     <CardHeader>
    //         <CardTitle>Email</CardTitle>
    //         <CardDescription>
    //             Update your email address. You may need to verify your new email.
    //         </CardDescription>
    //     </CardHeader>
    //     <CardContent>
    //         <form onSubmit={handleUpdateEmail} className="space-y-4">
    //             <div className="space-y-2">
    //                 <Label htmlFor="current-email">Current Email</Label>
    //                 <Input
    //                     id="current-email"
    //                     value={session?.user?.email || "Loading..."}
    //                     disabled
    //                 />
    //             </div>
    //             <div className="space-y-2">
    //                 <Label htmlFor="new-email">New Email</Label>
    //                 <Input
    //                     id="new-email"
    //                     type="email"
    //                     placeholder="Enter new email"
    //                     value={newEmail}
    //                     onChange={(e) => setNewEmail(e.target.value)}
    //                     required
    //                 />
    //             </div>
    //             <Button type="submit" disabled={isUpdatingEmail}>
    //                 {isUpdatingEmail && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
    //                 Update Email
    //             </Button>
    //         </form>
    //     </CardContent>
    // </Card>

    return (
        <SidebarProvider>
            <AppSidebar variant="inset" />
            <SidebarInset className="bg-black">
                <SiteHeader />
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0 text-foreground">
                    <div className="flex items-center justify-between space-y-2">
                        <h2 className="text-3xl font-bold tracking-tight">Profile Settings</h2>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                        <div className="col-span-4 lg:col-span-3 space-y-4">
                            <Card className="bg-neutral-800">
                                <CardHeader>
                                    <CardTitle>Password</CardTitle>
                                    <CardDescription>
                                        Change your password. Please use a secure password.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleUpdatePassword} className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="current-password">Current Password</Label>
                                            <Input
                                                id="current-password"
                                                type="password"
                                                value={currentPassword}
                                                onChange={(e) => setCurrentPassword(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="new-password">New Password</Label>
                                            <Input
                                                id="new-password"
                                                type="password"
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="confirm-password">Confirm New Password</Label>
                                            <Input
                                                id="confirm-password"
                                                type="password"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <Button type="submit" disabled={isUpdatingPassword} className="bg-gradient-to-r from-orange-600 to-orange-300">
                                            {isUpdatingPassword && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                            Update Password
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="col-span-4 space-y-4">
                            <WebsiteSettingsForm />
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
