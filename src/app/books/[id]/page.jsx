

// import Image from "next/image";
// import { notFound } from "next/navigation";

// const BookDetails = async ({ params }) => {
//     const { id } = await params;

//     const res = await fetch(
//         `http://localhost:8000/allbook/details/${id}`,
//         { cache: "no-store" }
//     );

//     if (!res.ok) {
//         notFound();
//     }

//     const book = await res.json();
//     console.log(book);

//     return (
//         <div className="max-w-5xl mx-auto p-6 text-white">
//             <div className="grid md:grid-cols-2 gap-8">

//                 <div className="relative h-[400px] bg-[#171717] rounded-xl">
//                     <Image
//                         src={book.image}
//                         alt={book.title}
//                         fill
//                         className="object-contain p-5"
//                         sizes="(max-width: 768px) 100vw, 50vw"
//                     />
//                 </div>

//                 <div>
//                     <h1 className="text-3xl font-bold mb-4">
//                         {book?.title}
//                     </h1>

//                     <p>Author: {book?.author}</p>
//                     <p>Category: {book?.category}</p>

//                     <h2 className="mt-5 font-bold">Description</h2>
//                     <p>{book?.description || "No description available."}</p>

//                     <h2 className="mt-5 font-bold">Added By</h2>
//                     <p>{book.userName || book.userEmail || "Unknown"}</p>

//                     <button className="mt-6 bg-[#00A8E8] px-6 py-3 rounded-lg">
//                         Borrow This Book
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default BookDetails;


import Image from "next/image";
import { notFound } from "next/navigation";

const BookDetails = async ({ params }) => {
    const { id } = await params;

    const res = await fetch(
        `http://localhost:8000/allbook/details/${id}`,
        { cache: "no-store" }
    );

    if (!res.ok) {
        notFound();
    }

    const book = await res.json();

    return (
        <div className="min-h-screen bg-black text-white px-4 py-12">

            {/* Details Card */}
            <div className="max-w-xl mx-auto bg-[#080808] border border-[#252525] rounded-2xl overflow-hidden hover:border-[#444] transition-all duration-300">

                {/* Book Image - Top */}
                <div className="relative w-full h-[350px] md:h-[450px] bg-[#171717]">
                    <Image
                        src={book?.image}
                        alt={book?.title}
                        fill
                        className="object-contain p-6"
                        sizes="(max-width: 768px) 100vw, 600px"
                    />
                </div>

                {/* Book Information - Bottom */}
                <div className="p-6 md:p-8">

                    {/* Category */}
                    <span className="inline-block bg-[#252525] text-blue-200 text-xs font-semibold px-3 py-1.5 rounded-lg mb-4">
                        {book?.category}
                    </span>

                    {/* Title */}
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-100 mb-3">
                        {book?.title}
                    </h1>

                    {/* Author */}
                    <p className="text-gray-400 text-sm mb-6">
                        By {book?.author}
                    </p>

                    {/* Description */}
                    <div className="mb-6">
                        <h2 className="text-white font-semibold text-lg mb-2">
                            Description
                        </h2>

                        <p className="text-gray-400 text-sm leading-7">
                            {book?.description || "No description available."}
                        </p>
                    </div>

                    {/* Added By */}
                    <div className="border-t border-[#252525] pt-4 mb-6">
                        <h2 className="text-white font-semibold text-sm mb-2">
                            Added By
                        </h2>

                        <p className="text-gray-400 text-sm">
                            {book?.userName || book?.userEmail || "Unknown"}
                        </p>
                    </div>

                    {/* Borrow Button */}
                    <button className="w-full bg-[#00A8E8] hover:bg-[#0089bd] text-white font-semibold py-3 rounded-xl transition-colors">
                        Borrow This Book
                    </button>

                </div>
            </div>
        </div>
    );
};

export default BookDetails;
