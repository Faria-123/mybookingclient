
// import Image from "next/image";
// import Link from "next/link";

// const BookCard = ({ book }) => {
//     return (
//         <div className="card bg-base-100 shadow-md border border-base-200 hover:shadow-xl transition-all duration-300">

//             {/* Book Image */}
//             <figure className="px-5 pt-5">
//                 <Image
//                     src={book.image}
//                     alt={book.title}
//                     width={300}
//                     height={300}
//                     className="h-64 w-full object-contain rounded-lg"
//                 />
//             </figure>

//             {/* Card Body */}
//             <div className="card-body">

//                 <div className="flex justify-between items-center">
//                     <span className="badge badge-info badge-outline">
//                         {book.category}
//                     </span>
//                 </div>

//                 <h2 className="card-title text-lg">
//                     {book.title}
//                 </h2>

//                 <p className="text-sm text-base-content/60">
//                     By {book.author}
//                 </p>

//                 <div className="card-actions mt-4">
//                     <Link
//                         href={`/allbooks/${book._id}`}
//                         className="btn bg-[#00A8E8] hover:bg-[#0089bd] text-white w-full border-none"
//                     >
//                         View Details
//                     </Link>
//                 </div>

//             </div>
//         </div>
//     );
// };

// export default BookCard;

import Image from "next/image";
import Link from "next/link";

const BookCard = ({ book }) => {
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
                {/* <Link
                    
                    className="block text-center w-full bg-[#00A8E8] hover:bg-[#0089bd] text-white font-semibold text-sm py-2.5 rounded-lg transition-colors"
                >
                    View Details
                </Link> */}
                <Link href={`/books/${book._id}`}>
                    View Details
                </Link>

            </div>
        </div>
    );
};

export default BookCard;
