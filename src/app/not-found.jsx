import Link from "next/link";
import { BookX, Home } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">

            <BookX className="w-20 h-20 text-[#00A8E8] mb-5" />

            <h1 className="text-7xl font-bold text-[#00A8E8]">
                404
            </h1>

            <h2 className="text-2xl font-semibold mt-4">
                Page Not Found!
            </h2>

            <p className="text-gray-500 mt-2 max-w-md">
                Sorry, the page you are looking for doesn't exist
                or may have been moved.
            </p>

            <Link
                href="/"
                className="mt-6 inline-flex items-center gap-2 bg-[#00A8E8] text-white px-6 py-3 rounded-lg hover:bg-sky-600 transition"
            >
                <Home className="w-5 h-5" />
                Back to Home
            </Link>

        </div>
    );
}