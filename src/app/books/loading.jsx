import { Loader2 } from "lucide-react";

export default function Loading() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-12 h-12 animate-spin text-[#00A8E8]" />
            <p className="text-gray-500">Loading BookNook...</p>
        </div>
    );
}