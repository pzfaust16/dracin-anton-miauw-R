"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { getWebsiteSettings, updateWebsiteSettings } from "@/server/db/website-settings.db";

const websiteSettingsSchema = z.object({
    websiteName: z.string().min(1, "Website name is required"),
    heroTitle: z.string().min(1, "Hero title is required"),
    heroTagline: z.string().optional(),
    heroDescription: z.string().optional(),
    footerText: z.string().optional(),
    primaryColor: z.string().optional(),
    secondaryColor: z.string().optional(),
    metaDescription: z.string().optional(),
    metaKeywords: z.string().optional(),
    googleAnalyticsId: z.string().optional(),
});

type WebsiteSettingsValues = z.infer<typeof websiteSettingsSchema>;

export function WebsiteSettingsForm() {
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    const form = useForm<WebsiteSettingsValues>({
        resolver: zodResolver(websiteSettingsSchema),
        defaultValues: {
            websiteName: "",
            heroTitle: "",
            heroTagline: "",
            heroDescription: "",
            footerText: "",
            primaryColor: "#000000",
            secondaryColor: "#FFFFFF",
            metaDescription: "",
            metaKeywords: "",
            googleAnalyticsId: "",
        },
    });

    useEffect(() => {
        const loadSettings = async () => {
            try {
                const settings = await getWebsiteSettings();
                if (settings) {
                    form.reset({
                        websiteName: settings.websiteName || "",
                        heroTitle: settings.heroTitle || "",
                        heroTagline: settings.heroTagline || "",
                        heroDescription: settings.heroDescription || "",
                        footerText: settings.footerText || "",
                        primaryColor: settings.primaryColor || "#000000",
                        secondaryColor: settings.secondaryColor || "#FFFFFF",
                        metaDescription: settings.metaDescription || "",
                        metaKeywords: settings.metaKeywords || "",
                        googleAnalyticsId: settings.googleAnalyticsId || "",
                    });
                }
            } catch (error) {
                console.error("Failed to load settings:", error);
                toast.error("Failed to load website settings");
            } finally {
                setIsLoading(false);
            }
        };

        loadSettings();
    }, [form]);

    const onSubmit = async (data: WebsiteSettingsValues) => {
        setIsSaving(true);
        try {
            await updateWebsiteSettings(data);
            toast.success("Website settings updated successfully");
        } catch (error) {
            console.error("Failed to update settings:", error);
            toast.error("Failed to update website settings");
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Website Settings</CardTitle>
                    <CardDescription>Loading settings...</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-center p-4">
                        <Loader2 className="h-6 w-6 animate-spin" />
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="bg-neutral-800">
            <CardHeader>
                <CardTitle>Website Settings</CardTitle>
                <CardDescription>
                    Manage global website settings like title, colors, and SEO.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="websiteName">Website Name</Label>
                            <Input id="websiteName" {...form.register("websiteName")} />
                            {form.formState.errors.websiteName && (
                                <p className="text-sm text-red-500">{form.formState.errors.websiteName.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="heroTitle">Hero Title</Label>
                            <Input id="heroTitle" {...form.register("heroTitle")} />
                            {form.formState.errors.heroTitle && (
                                <p className="text-sm text-red-500">{form.formState.errors.heroTitle.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="heroTagline">Hero Tagline</Label>
                            <Input id="heroTagline" {...form.register("heroTagline")} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="googleAnalyticsId">Google Analytics ID</Label>
                            <Input id="googleAnalyticsId" {...form.register("googleAnalyticsId")} placeholder="G-XXXXXXXXXX" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="primaryColor">Primary Color</Label>
                            <div className="flex gap-2">
                                <Input id="primaryColor" type="color" className="w-12 p-1" {...form.register("primaryColor")} />
                                <Input {...form.register("primaryColor")} placeholder="#000000" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="secondaryColor">Secondary Color</Label>
                            <div className="flex gap-2">
                                <Input id="secondaryColor" type="color" className="w-12 p-1" {...form.register("secondaryColor")} />
                                <Input {...form.register("secondaryColor")} placeholder="#FFFFFF" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="heroDescription">Hero Description</Label>
                        <Textarea id="heroDescription" {...form.register("heroDescription")} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="footerText">Footer Text</Label>
                        <Textarea id="footerText" {...form.register("footerText")} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="metaDescription">Meta Description (SEO)</Label>
                        <Textarea id="metaDescription" {...form.register("metaDescription")} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="metaKeywords">Meta Keywords (SEO)</Label>
                        <Input id="metaKeywords" {...form.register("metaKeywords")} placeholder="keyword1, keyword2, keyword3" />
                    </div>

                    <Button type="submit" disabled={isSaving} className="bg-gradient-to-r from-orange-600 to-orange-300">
                        {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Settings
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
