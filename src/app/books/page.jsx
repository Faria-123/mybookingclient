

import BookCard from "@/components/BookCard";

const Page = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/allbook`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch books");
    }

    const books = await res.json();

    return (
        <div className="container mx-auto px-5 py-10">
            <h1 className="text-3xl font-bold mb-8">
                All Books
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
                {books.map((book) => (
                    <BookCard key={book._id} book={book} />
                ))}
            </div>
        </div>
    );
};

export default Page;
