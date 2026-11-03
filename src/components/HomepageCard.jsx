
// import Link from "next/link";
// import BookCard from "./BookCard";

// const HomePageCard = async () => {
//     let books = [];

//     try {
//         const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/allbook`, {
//             cache: "no-store",
//         });

//         if (!res.ok) {
//             throw new Error("Failed to fetch books");
//         }

//         const data = await res.json();

//         // Get only the first 6 books
//         books = data.slice(0, 6);

//     } catch (error) {
//         console.error("Book fetching error:", error);
//     }

//     return (
//         <section className="container mx-auto px-4 py-12">

//             {/* Heading */}
//             <div className="flex justify-between items-center mb-8">
//                 <div>
//                     <h2 className="text-3xl font-bold">
//                         Latest Books
//                     </h2>
//                     <p className="text-base-content/60 mt-2">
//                         Explore our latest book collection.
//                     </p>
//                 </div>

//                 <Link
//                     href="/allbooks"
//                     className="btn btn-outline btn-sm"
//                 >
//                     See All Books
//                 </Link>
//             </div>

//             {/* Books Grid */}
//             {books.length > 0 ? (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {books.map((book) => (
//                         <BookCard
//                             key={book._id}
//                             book={book}
//                         />
//                     ))}
//                 </div>
//             ) : (
//                 <p className="text-center py-10 text-base-content/60">
//                     No books available right now.
//                 </p>
//             )}

//         </section>
//     );
// };

// export default HomePageCard;


import Link from "next/link";
import BookCard from "./BookCard";
import { connection } from "next/server";

const HomePageCard = async () => {
    await connection();

    let books = [];

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/allbook`, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch books");
        }

        const data = await res.json();
        books = data.slice(0, 6);
    } catch (error) {
        console.error("Book fetching error:", error);
    }

    return (
        <section className="container mx-auto px-4 py-12">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-bold">Latest Books</h2>
                    <p className="text-base-content/60 mt-2">
                        Explore our latest book collection.
                    </p>
                </div>

                <Link href="/allbooks" className="btn btn-outline btn-sm">
                    See All Books
                </Link>
            </div>

            {books.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {books.map((book) => (
                        <BookCard key={book._id} book={book} />
                    ))}
                </div>
            ) : (
                <p className="text-center py-10 text-base-content/60">
                    No books available right now.
                </p>
            )}
        </section>
    );
};

export default HomePageCard;