


"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
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

const API_URL =
    process.env.NEXT_PUBLIC_API_URL;

const CATEGORIES = ["Fiction", "Science", "History", "Kids", "Others"];

export default function UpdateBookPage() {
    const router = useRouter();
    const { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        author: "",
        category: "",
        image: "",
        description: "",
    });

    // Fetch old book data
    useEffect(() => {
        async function fetchBook() {
            try {
                const res = await fetch(`${API_URL}/allbook/${id}`);

                if (!res.ok) {
                    throw new Error("Failed to load book information");
                }

                const book = await res.json();

                // Automatically fill the form with old data
                setFormData({
                    title: book?.title || "",
                    author: book?.author || "",
                    category: book?.category || "",
                    image: book?.image || "",
                    description: book?.description || "",
                });
            } catch (error) {
                toast.add({
                    type: "error",
                    title: "Couldn't load book",
                    description: error.message,
                });
            } finally {
                setLoading(false);
            }
        }

        if (id) {
            fetchBook();
        }
    }, [id]);

    // Handle input changes
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    // Update book
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (submitting) return;

        setSubmitting(true);

        try {
            const res = await fetch(`${API_URL}/allbook/details/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Update failed");
            }

            toast.add({
                type: "success",
                title: "Book Updated!",
                description: `"${formData.title}" updated successfully.`,
            });

            router.push("/my-book");
            router.refresh();
        } catch (error) {
            toast.add({
                type: "error",
                title: "Update Failed",
                description: error.message || "Something went wrong.",
            });
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <Loader2 className="size-8 animate-spin" />
            </div>
        );
    }

    return (
        <section className="mx-auto max-w-7xl px-6 py-16">
            <Card className="mx-auto max-w-2xl">
                <CardHeader>
                    <CardTitle className="text-2xl">
                        Update Book
                    </CardTitle>

                    <CardDescription>
                        Edit your book information and save changes.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit} className="grid gap-5">

                        {/* Book Title */}
                        <div className="grid gap-2">
                            <Label htmlFor="title">Book Title</Label>
                            <Input
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Book Title"
                                required
                            />
                        </div>

                        {/* Author */}
                        <div className="grid gap-2">
                            <Label htmlFor="author">Author Name</Label>
                            <Input
                                id="author"
                                name="author"
                                value={formData.author}
                                onChange={handleChange}
                                placeholder="Author Name"
                                required
                            />
                        </div>

                        {/* Category */}
                        <div className="grid gap-2">
                            <Label htmlFor="category">Category</Label>

                            <NativeSelect
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                                className="w-full"
                            >
                                <NativeSelectOption value="" disabled>
                                    Select a category...
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
                            <Label htmlFor="image">Book Image URL</Label>
                            <Input
                                id="image"
                                name="image"
                                type="url"
                                value={formData.image}
                                onChange={handleChange}
                                placeholder="https://example.com/book.jpg"
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
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Book description..."
                                required
                            />
                        </div>

                        {/* Save Button */}
                        <Button
                            type="submit"
                            disabled={submitting}
                            className="w-full"
                        >
                            {submitting && (
                                <Loader2 className="size-4 animate-spin" />
                            )}

                            {submitting ? "Updating..." : "Save Changes"}
                        </Button>

                    </form>
                </CardContent>
            </Card>
        </section>
    );
}
