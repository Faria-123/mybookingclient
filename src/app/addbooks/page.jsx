

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
import {
    NativeSelect,
    NativeSelectOption,
} from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";

import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const CATEGORIES = ["Fiction", "Science", "History", "Kids", "Others"];

export default function AddBooksPage() {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();

        if (submitting) return;

        const form = event.currentTarget;
        const fd = new FormData(form);

        const payload = {
            title: String(fd.get("title") ?? "").trim(),
            author: String(fd.get("author") ?? "").trim(),
            category: String(fd.get("category") ?? ""),
            image: String(fd.get("image") ?? "").trim(),
            description: String(fd.get("description") ?? "").trim(),
        };

        setSubmitting(true);

        try {
            const res = await fetch(`${API_URL}/allbook`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const err = await res.json().catch(() => null);

                throw new Error(
                    err?.error || `Saving failed (HTTP ${res.status}).`
                );

            }

            toast.add({
                type: "success",
                title: "Book added",
                description: `"${payload.title}" was saved to the library.`,
            });
            router.push("/");
            form.reset();

        } catch (error) {
            toast.add({
                type: "error",
                title: "Couldn't add book",
                description:
                    error instanceof Error
                        ? error.message
                        : "Something went wrong.",
            });
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <section className="mx-auto max-w-7xl px-6 py-16">
            <Card className="mx-auto max-w-2xl">

                <CardHeader>
                    <CardTitle className="text-2xl">
                        Add a New Book
                    </CardTitle>

                    <CardDescription>
                        Enter book details and provide an image URL
                        to add your book to the library.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit} className="grid gap-5">

                        {/* Book Title */}
                        <div className="grid gap-2">
                            <Label htmlFor="title">
                                Book Title
                            </Label>

                            <Input
                                id="title"
                                name="title"
                                placeholder="The Silent Patient"
                                required
                            />
                        </div>

                        {/* Author Name */}
                        <div className="grid gap-2">
                            <Label htmlFor="author">
                                Author Name
                            </Label>

                            <Input
                                id="author"
                                name="author"
                                placeholder="Alex Michaelides"
                                required
                            />
                        </div>

                        {/* Category */}
                        <div className="grid gap-2">
                            <Label htmlFor="category">
                                Category
                            </Label>

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
                                    <NativeSelectOption
                                        key={category}
                                        value={category}
                                    >
                                        {category}
                                    </NativeSelectOption>
                                ))}
                            </NativeSelect>
                        </div>

                        {/* Image URL */}
                        <div className="grid gap-2">
                            <Label htmlFor="image">
                                Book Image URL
                            </Label>

                            <Input
                                id="image"
                                name="image"
                                type="url"
                                placeholder="https://example.com/book-cover.jpg"
                                required
                            />
                        </div>

                        {/* Description */}
                        <div className="grid gap-2">
                            <Label htmlFor="description">
                                Short Description
                            </Label>

                            <Textarea
                                id="description"
                                name="description"
                                placeholder="A one-paragraph summary of the book…"
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            disabled={submitting}
                            className="w-full"
                        >
                            {submitting && (
                                <Loader2
                                    className="size-4 animate-spin"
                                    aria-hidden="true"
                                />
                            )}

                            {submitting ? "Adding…" : "Add Book"}
                        </Button>

                    </form>
                </CardContent>
            </Card>
        </section>
    );
}
