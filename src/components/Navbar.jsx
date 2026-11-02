"use client";
import Link from "next/link";
import { User } from "lucide-react";
import { cn } from "cn";
import { useSession, signOut } from "@/lib/auth-client";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
// import { signOut } from "better-auth/api";
const navLinks = [
    { href: "/", label: "Home", active: true },
    { href: "/books", label: "All Books", active: false },
    { href: "/addbooks", label: "Add Books", active: false },
    { href: "/my-book", label: "My Books", active: false },
    { href: "/myborrows", label: "My Borrows", active: false },
];

export function Navbar() {
    const { data: session, isPending, error } = useSession();
    const user = session?.user;
    console.log(user);
    const handleSignOut = async () => {
        await signOut();
    }
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
            <nav className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

                {/* Left: Logo */}
                <Link
                    href="/"
                    className="shrink-0 text-2xl font-bold tracking-tight text-[#00A8E8]"
                >
                    BOOKNOOK
                </Link>

                {/* Center: Navigation links */}
                <ul className="flex items-center gap-7">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className={cn(
                                    "text-sm transition-colors hover:text-[#00A8E8]",
                                    link.active
                                        ? "border-b-2 border-[#00A8E8] pb-0.5 font-medium text-[#00A8E8]"
                                        : "text-foreground"
                                )}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Right: Account links */}
                <div className="flex items-center gap-6">
                    {
                        user ? <div className="flex items-center gap-3">

                            <Avatar>
                                <AvatarImage
                                    src={user?.image}
                                    alt="@shadcn"
                                    className="grayscale"
                                />
                                <AvatarFallback>{user?.name?.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                            </Avatar>
                            <button
                                onClick={handleSignOut}
                                className="btn btn-error btn-sm ml-auto"
                            >
                                Sign Out
                            </button>

                        </div> : <>
                            <Link
                                href="/signin"
                                className="text-sm text-foreground transition-colors hover:text-[#00A8E8]"
                            >
                                Login
                            </Link>

                            <Link
                                href="/signup"
                                className="text-sm text-foreground transition-colors hover:text-[#00A8E8]"
                            >
                                Sign Up
                            </Link>
                        </>
                    }


                </div>

            </nav>
        </header>
    );
}
