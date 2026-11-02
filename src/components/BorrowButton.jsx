
"use client";

import { useState } from "react";
import { useSession } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { toast } from "@/components/ui/toast";
import { Loader2, BookOpen } from "lucide-react";

const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function BorrowButton({ book }) {
    const { data: session, isPending } = useSession();

    const [open, setOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const user = session?.user;

    const handleBorrow = async () => {
        if (!user) {
            toast.add({
                type: "error",
                title: "Login required",
                description: "Please sign in before borrowing a book.",
            });
            return;
        }

        setSubmitting(true);

        try {
            const res = await fetch(`${API_URL}/borrow-book`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    bookId: book._id,
                    bookTitle: book.title,
                    userId: user.id,
                    userName: user.name,
                    userEmail: user.email,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Failed to borrow book");
            }

            toast.add({
                type: "success",
                title: "Book borrowed!",
                description: `You successfully borrowed "${book.title}".`,
            });

            setOpen(false);
        } catch (error) {
            toast.add({
                type: "error",
                title: "Borrow failed",
                description: error.message || "Something went wrong.",
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>

            {/* <DialogTrigger asChild>
                <button
                    type="button"
                    disabled={isPending}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#00A8E8] px-4 py-2 text-sm font-medium text-white hover:bg-[#0089bd] disabled:opacity-50"
                >
                    <BookOpen className="size-4" />
                    Borrow This Book
                </button>
            </DialogTrigger> */}
            <DialogTrigger
                render={
                    <button
                        type="button"
                        disabled={isPending}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#00A8E8] px-4 py-2 text-sm font-medium text-white hover:bg-[#0089bd] disabled:opacity-50"
                    >
                        <BookOpen className="size-4" />
                        Borrow This Book
                    </button>
                }
            />

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Borrow This Book</DialogTitle>
                    <DialogDescription>
                        Confirm your information before borrowing this book.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-3">
                    {/* Book name */}
                    <div className="grid gap-2">
                        <Label>Book Title</Label>
                        <Input value={book.title || ""} readOnly />
                    </div>

                    {/* User name */}
                    <div className="grid gap-2">
                        <Label htmlFor="borrowerName">User Name</Label>
                        <Input
                            id="borrowerName"
                            value={user?.name || ""}
                            readOnly
                            placeholder="Loading user..."
                        />
                    </div>

                    {/* User email */}
                    <div className="grid gap-2">
                        <Label htmlFor="borrowerEmail">Email</Label>
                        <Input
                            id="borrowerEmail"
                            type="email"
                            value={user?.email || ""}
                            readOnly
                            placeholder="Loading email..."
                        />
                    </div>

                    <Button
                        onClick={handleBorrow}
                        disabled={submitting || isPending || !user}
                        className="w-full"
                    >
                        {submitting && (
                            <Loader2 className="size-4 animate-spin" />
                        )}
                        {submitting ? "Confirming..." : "Confirm Borrow"}
                    </Button>


                </div>
            </DialogContent>
        </Dialog>
    );
}
