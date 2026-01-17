"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createAffiliateLink } from "@/server/db/affiliate.db"
import { auth } from "@/utils/auth"
import { Plus } from "lucide-react"
import { useRef, useState } from "react"

export function DialogAddAff() {

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const provider = formData.get("provider") as string;
        const link = formData.get("link") as string;


        console.log("Provider:", provider, "Link:", link); // Debug

        try {
            // Panggil server action
            const result = await createAffiliateLink(provider, link);
            console.log("Success:", result); // Debug
            // Reset form dan tutup dialog
            // Reset menggunakan formRef, bukan e.currentTarget
            if (formRef.current) {
                formRef.current.reset();
            }
            setOpen(false);
        } catch (error) {
            console.error("Error creating affiliate link:", error);
            alert("Gagal menambahkan affiliate link");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="w-fit bg-gradient-to-r from-orange-600 to-orange-300 rounded-lg h-9 px-3 md:px-4 text-sm">
                    <Plus />
                    <span className="hidden md:inline ml-2">Add New Affiliate</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-neutral-800 border border-gray-800">
                <form ref={formRef} onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle className="text-orange-300">Add Link Affiliate</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="provider">Provider</Label>
                            <Input id="provider" name="provider" defaultValue="Shopee" />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="link">Link Affiliate</Label>
                            <Input id="link" name="link" defaultValue="https://s.id/teslink" />
                        </div>
                    </div>
                    <DialogFooter className="mt-4">
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
