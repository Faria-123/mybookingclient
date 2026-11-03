
"use client";

import { useEffect, useState } from "react";
import { authClient, useSession } from "@/lib/auth-client";
import { Loader2, BookOpen, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";

const API_URL =
    process.env.NEXT_PUBLIC_API_URL;

// Format date
const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};

const getReturnDate = (borrow) => {
    if (borrow.returnDate) {
        return formatDate(borrow.returnDate);
    }

    const date = new Date(borrow.borrowedAt);
    date.setDate(date.getDate() + 7);

    return formatDate(date);
};

export default function MyBorrowsPage() {
    const { data: session, isPending } = useSession();

    const [borrows, setBorrows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [returningId, setReturningId] = useState(null);

    const user = session?.user;


    // Fetch logged-in user's borrowed books
    useEffect(() => {
        if (isPending) return;

        if (!user?.id) {
            setBorrows([]);
            setLoading(false);
            return;
        }

        const fetchBorrows = async () => {
            try {
                setLoading(true);
                const res = await fetch(
                    `${API_URL}/my-borrows/${user.id}`
                );

                if (!res.ok) {
                    throw new Error("Failed to load borrowed books");
                }

                const data = await res.json();

                setBorrows(data);
            } catch (error) {
                toast.add({
                    type: "error",
                    title: "Error",
                    description: error.message,
                });
            } finally {
                setLoading(false);
            }
        };

        fetchBorrows();
    }, [user?.id, isPending]);

    // Return book
    const handleReturn = async (borrow) => {
        const confirmed = window.confirm(
            `Are you sure you want to return "${borrow.bookTitle}"?`
        );

        if (!confirmed) return;

        try {
            setReturningId(borrow._id);

            const res = await fetch(
                `${API_URL}/return-book/${borrow._id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        userId: user.id,
                    }),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Failed to return book");
            }

            // Remove returned book from active borrowing list
            setBorrows((previous) =>
                previous.filter((item) => item._id !== borrow._id)
            );

            toast.add({
                type: "success",
                title: "Book Returned!",
                description: `"${borrow.bookTitle}" has been returned successfully.`,
            });
        } catch (error) {
            toast.add({
                type: "error",
                title: "Return Failed",
                description: error.message,
            });
        } finally {
            setReturningId(null);
        }
    };

    if (isPending || loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <Loader2 className="size-8 animate-spin" />
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-4">
                <BookOpen className="size-12 text-gray-400" />

                <h2 className="text-2xl font-bold">
                    Please Sign In
                </h2>

                <p className="text-gray-500">
                    Sign in to see your borrowed books.
                </p>

                <Button onClick={() => window.location.href = "/login"}>
                    Sign In
                </Button>
            </div>
        );
    }

    return (
        <section className="min-h-screen px-4 py-12">
            <div className="max-w-7xl mx-auto">

                {/* Heading */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold">
                        My Borrows
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Manage your borrowed books and return them on time.
                    </p>
                </div>

                {/* Borrow Count */}
                <div className="mb-6">
                    <span className="bg-[#00A8E8]/10 text-[#00A8E8] px-4 py-2 rounded-lg text-sm font-semibold">
                        {borrows.length} Active Borrowed Books
                    </span>
                </div>

                {borrows.length === 0 ? (
                    <div className="border border-dashed rounded-xl p-12 text-center">
                        <BookOpen className="size-12 mx-auto text-gray-400 mb-4" />

                        <h2 className="text-xl font-semibold">
                            No Borrowed Books
                        </h2>

                        <p className="text-gray-500 mt-2">
                            You haven't borrowed any books yet.
                        </p>

                        <Button
                            className="mt-5 bg-[#00A8E8] hover:bg-[#0089bd]"
                            onClick={() => window.location.href = "/books"}
                        >
                            Explore Books
                        </Button>
                    </div>
                ) : (
                    <div className="overflow-x-auto border rounded-xl">
                        <table className="w-full min-w-[850px] text-left">

                            <thead className="bg-gray-100 dark:bg-[#171717]">
                                <tr>
                                    <th className="p-4">Image</th>
                                    <th className="p-4">Book Title</th>
                                    <th className="p-4">Borrow Date</th>
                                    <th className="p-4">Return Date</th>
                                    <th className="p-4 text-center">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {borrows.map((borrow) => (
                                    <tr
                                        key={borrow._id}
                                        className="border-t hover:bg-gray-50 dark:hover:bg-[#111] transition-colors"
                                    >
                                        {/* Image */}
                                        <td className="p-4">
                                            <img
                                                src={
                                                    borrow.bookImage ||
                                                    "/placeholder-book.png"
                                                }
                                                alt={borrow.bookTitle}
                                                className="w-16 h-20 object-cover rounded-md bg-gray-200"
                                            />
                                        </td>

                                        {/* Title */}
                                        <td className="p-4 font-semibold">
                                            {borrow.bookTitle}
                                        </td>

                                        {/* Borrow Date */}
                                        <td className="p-4 text-sm text-gray-500">
                                            {formatDate(borrow.borrowedAt)}
                                        </td>

                                        {/* Return Date */}
                                        <td className="p-4 text-sm text-gray-500">
                                            {getReturnDate(borrow)}
                                        </td>

                                        {/* Return Button */}
                                        <td className="p-4 text-center">
                                            <Button
                                                size="sm"
                                                disabled={
                                                    returningId === borrow._id
                                                }
                                                onClick={() =>
                                                    handleReturn(borrow)
                                                }
                                                className="bg-[#00A8E8] hover:bg-[#0089bd] text-white"
                                            >
                                                {returningId === borrow._id ? (
                                                    <Loader2 className="size-4 animate-spin" />
                                                ) : (
                                                    <RotateCcw className="size-4" />
                                                )}

                                                Return Book
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                )}
            </div>
        </section>
    );
}
