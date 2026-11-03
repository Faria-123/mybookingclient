

import BorrowButton from "@/components/BorrowButton";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import { notFound } from "next/navigation";

const BookDetails = async ({ params }) => {
    const { id } = await params;
    const jwtToken = await auth.api.getToken({
        headers: await headers()
    })
    console.log(jwtToken);
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/allbook/details/${id}`, {
        headers: {
            authorization: `Bearer ${jwtToken?.token}`,
        }
    },
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
                    {/* Borrow Button + Modal */}
                    <BorrowButton book={book} />


                </div>
            </div>
        </div>
    );
};

export default BookDetails;
