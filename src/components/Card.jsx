
import Image from "next/image";
import Link from "next/link";

const Card = ({ book }) => {
    return (
        <div className="w-full max-w-[420px] bg-[#080808] text-white rounded-xl overflow-hidden border border-[#252525] hover:border-[#444] transition-all duration-300">

            {/* Book Image */}
            <div className="relative w-full aspect-[1.54] bg-[#171717] rounded-xl overflow-hidden">
                <Image
                    src={book.image}
                    alt={book.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 420px"
                    className="object-contain p-4"
                />
            </div>

            {/* Card Body */}
            <div className="p-3">

                {/* Category */}
                <div className="mb-3">
                    <span className="inline-block bg-[#252525] text-blue-200 text-xs font-semibold px-3 py-1.5 rounded-lg">
                        {book.category}
                    </span>
                </div>

                {/* Title */}
                <h2 className="text-lg font-bold leading-6 text-gray-200 mb-2 line-clamp-2">
                    {book.title}
                </h2>

                {/* Author */}
                <p className="text-sm text-gray-400 mb-4">
                    By {book.author}
                </p>

                {/* View Details */}
                <Link
                    href={`/books/${book._id}`}
                    className="block text-center w-full bg-[#00A8E8] hover:bg-[#0089bd] text-white font-semibold text-sm py-2.5 rounded-lg transition-colors mb-3"
                >
                    View Details
                </Link>

                {/* Update & Delete */}
                <div className="flex gap-3">
                    <Link
                        href={`/`}
                        className="flex-1 text-center bg-yellow-500 hover:bg-yellow-600 text-black font-semibold text-sm py-2.5 rounded-lg transition-colors"
                    >
                        Update
                    </Link>

                    <button

                        className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold text-sm py-2.5 rounded-lg transition-colors"
                    >
                        Delete
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Card;
