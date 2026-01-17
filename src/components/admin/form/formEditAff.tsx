"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { updateAffiliateLink } from "@/actions/affiliate-actions"
import { useState } from "react"
import { toast } from "sonner"

interface DialogEditAffProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    initialData: {
        id: string
        provider: string
        link: string
    }
}

export function DialogEditAff({ open, onOpenChange, initialData }: DialogEditAffProps) {
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const provider = formData.get("provider") as string;
        const link = formData.get("link") as string;

        try {
            const result = await updateAffiliateLink(initialData.id, { provider, link });
            if (result.success) {
                toast.success("Affiliate link updated");
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
                onOpenChange(false);
            } else {
                toast.error("Failed to update affiliate link");
            }
        } catch (error) {
            console.error("Error updating affiliate link:", error);
            toast.error("An error occurred");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px] bg-neutral-800 border border-gray-800">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle className="text-orange-300">Edit Link Affiliate</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-3">
                            <Label htmlFor="provider">Provider</Label>
                            <Input 
                                id="provider" 
                                name="provider" 
                                defaultValue={initialData.provider} 
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="link">Link Affiliate</Label>
                            <Input 
                                id="link" 
                                name="link" 
                                defaultValue={initialData.link} 
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" disabled={loading}>Cancel</Button>
                        </DialogClose>
                        <Button type="submit" className="bg-gradient-to-r from-orange-600 to-orange-300" disabled={loading}>
                            {loading ? "Saving..." : "Save changes"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
