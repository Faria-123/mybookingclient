"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

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
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const CATEGORIES = ["Fiction", "Science", "History", "Kids", "Others"];

// TODO: no auth system exists yet — placeholder for the logged-in user.
// When login lands, read these from localStorage("user") / the auth context instead.
const CURRENT_USER = { name: "Guest User", email: "guest@booknook.com" };

async function uploadToImgbb(file) {
    const key = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
    if (!key) {
        throw new Error(
            "Missing imgbb API key — set NEXT_PUBLIC_IMGBB_API_KEY in .env.local."
        );
    }
    const body = new FormData();
    body.append("image", file);
    const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${encodeURIComponent(key)}`,
        { method: "POST", body }
    );
    const data = await res.json().catch(() => null);
    const url = data?.data?.display_url;
    if (!res.ok || !url) {
        throw new Error(data?.error?.message || "Image upload to imgbb failed.");
    }
    return url;
}

export default function AddBooksPage() {
    const [submitting, setSubmitting] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [fileName, setFileName] = useState("");

    function handleImageChange(event) {
        const file = event.target.files?.[0] ?? null;
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setPreviewUrl(file ? URL.createObjectURL(file) : null);
        setFileName(file?.name ?? "");
    }

    async function handleSubmit(event) {
        event.preventDefault();
        if (submitting) return;

        // Capture before awaiting — currentTarget is null after the event dispatch ends.
        const form = event.currentTarget;
        const fd = new FormData(form);
        const file = fd.get("image");

        if (!(file instanceof File) || file.size === 0) {
            toast.add({
                type: "error",
                title: "Book image required",
                description: "Choose an image file to upload.",
            });
            return;
        }

        setSubmitting(true);
        try {
            const imageUrl = await uploadToImgbb(file);

            const payload = {
                title: String(fd.get("title") ?? "").trim(),
                author: String(fd.get("author") ?? "").trim(),
                category: String(fd.get("category") ?? ""),
                description: String(fd.get("description") ?? "").trim(),
                image: imageUrl,
                userName: CURRENT_USER.name,
                userEmail: CURRENT_USER.email,
            };

            const res = await fetch(`${API_URL}/add-book`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            if (!res.ok) {
                const err = await res.json().catch(() => null);
                throw new Error(err?.error || `Saving failed (HTTP ${res.status}).`);
            }

            toast.add({
                type: "success",
                title: "Book added",
                description: `"${payload.title}" was saved to the library.`,
            });
            form.reset();
            if (previewUrl) URL.revokeObjectURL(previewUrl);
            setPreviewUrl(null);
            setFileName("");
        } catch (error) {
            toast.add({
                type: "error",
                title: "Couldn't add book",
                description:
                    error instanceof Error ? error.message : "Something went wrong.",
            });
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <section className="mx-auto max-w-7xl px-6 py-16">
            <Card className="mx-auto max-w-2xl">
                <CardHeader>
                    <CardTitle className="text-2xl">Add a New Book</CardTitle>
                    <CardDescription>
                        The cover is uploaded to imgbb; the book is saved to the
                        library database with today&apos;s date.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="grid gap-5">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Book Title</Label>
                            <Input
                                id="title"
                                name="title"
                                placeholder="The Silent Patient"
                                required
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="author">Author Name</Label>
                            <Input
                                id="author"
                                name="author"
                                placeholder="Alex Michaelides"
                                required
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="category">Category</Label>
                            <NativeSelect
                                id="category"
                                name="category"
                                defaultValue=""
                                required
                                className="w-full"
                            >
                                <NativeSelectOption value="" disabled>
                                    Select a category…
                                </NativeSelectOption>
                                {CATEGORIES.map((category) => (
                                    <NativeSelectOption key={category} value={category}>
                                        {category}
                                    </NativeSelectOption>
                                ))}
                            </NativeSelect>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="image">Book Image</Label>
                            <Input
                                id="image"
                                name="image"
                                type="file"
                                accept="image/*"
                                required
                                onChange={handleImageChange}
                            />
                            {fileName && (
                                <div className="flex items-center gap-3">
                                    {previewUrl && (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            src={previewUrl}
                                            alt="Book cover preview"
                                            className="h-20 w-16 rounded-md border object-cover"
                                        />
                                    )}
                                    <span className="truncate text-sm text-muted-foreground">
                                        {fileName}
                                    </span>
                                </div>
                            )}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="description">Short Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                placeholder="A one-paragraph summary of the book…"
                                required
                            />
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="grid gap-2">
                                <Label htmlFor="userName">User Name</Label>
                                <Input
                                    id="userName"
                                    name="userName"
                                    value={CURRENT_USER.name}
                                    readOnly
                                    className="bg-muted/50"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="userEmail">Email</Label>
                                <Input
                                    id="userEmail"
                                    name="userEmail"
                                    type="email"
                                    value={CURRENT_USER.email}
                                    readOnly
                                    className="bg-muted/50"
                                />
                            </div>
                        </div>

                        <Button type="submit" disabled={submitting} className="w-full">
                            {submitting && (
                                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                            )}
                            {submitting ? "Adding…" : "Add Book"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </section>
    );
}
