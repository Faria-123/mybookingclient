

"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSession, signOut } from "@/lib/auth-client";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/books", label: "All Books" },
    { href: "/addbooks", label: "Add Books" },
    { href: "/my-book", label: "My Books" },
    { href: "/myborrows", label: "My Borrows" },
];

export function Navbar() {
    const { data: session, isPending } = useSession();
    const user = session?.user;

    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleSignOut = async () => {
        await signOut();
        setMenuOpen(false);
    };

    const getLinkClass = (href) =>
        cn(
            "text-sm transition-colors hover:text-[#00A8E8]",
            pathname === href
                ? "font-semibold text-[#00A8E8]"
                : "text-foreground"
        );

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background">
            <nav className="relative mx-auto flex min-h-16 max-w-7xl items-center justify-between px-4 sm:px-6">

                {/* Logo */}
                <Link
                    href="/"
                    className="shrink-0 text-2xl font-bold tracking-tight text-[#00A8E8]"
                    onClick={() => setMenuOpen(false)}
                >
                    BOOKNOOK
                </Link>

                {/* Desktop Navigation */}
                <ul className="hidden lg:flex items-center gap-6 xl:gap-7">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className={getLinkClass(link.href)}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Desktop Account */}
                <div className="hidden lg:flex items-center gap-4">
                    {isPending ? (
                        <span className="text-sm text-muted-foreground">
                            Loading...
                        </span>
                    ) : user ? (
                        <div className="flex items-center gap-3">
                            <Avatar>
                                <AvatarImage
                                    src={user.image || ""}
                                    alt={user.name || "User"}
                                />
                                <AvatarFallback>
                                    {user.name
                                        ?.split(" ")
                                        .map((n) => n[0])
                                        .join("")
                                        .toUpperCase()}
                                </AvatarFallback>
                            </Avatar>

                            <button
                                onClick={handleSignOut}
                                className="btn btn-error btn-sm"
                            >
                                Sign Out
                            </button>
                        </div>
                    ) : (
                        <>
                            <Link
                                href="/signin"
                                className="text-sm hover:text-[#00A8E8]"
                            >
                                Login
                            </Link>

                            <Link
                                href="/signup"
                                className="rounded-md bg-[#00A8E8] px-4 py-2 text-sm font-medium text-white hover:bg-sky-600 transition"
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="lg:hidden rounded-md p-2 hover:bg-muted"
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={menuOpen}
                >
                    {menuOpen ? (
                        <X className="h-6 w-6" />
                    ) : (
                        <Menu className="h-6 w-6" />
                    )}
                </button>
            </nav>

            {/* Mobile Dropdown */}
            {menuOpen && (
                <div className="lg:hidden border-t bg-background px-5 py-5 shadow-md">
                    <ul className="flex flex-col gap-5">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    onClick={() => setMenuOpen(false)}
                                    className={getLinkClass(link.href)}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-6 border-t pt-5">
                        {isPending ? (
                            <p className="text-sm text-muted-foreground">
                                Loading...
                            </p>
                        ) : user ? (
                            <div className="flex items-center justify-between gap-3">
                                <div className="flex items-center gap-3 min-w-0">
                                    <Avatar>
                                        <AvatarImage src={user.image || ""} />
                                        <AvatarFallback>
                                            {user.name?.[0]?.toUpperCase() || "U"}
                                        </AvatarFallback>
                                    </Avatar>

                                    <span className="truncate text-sm font-medium">
                                        {user.name}
                                    </span>
                                </div>

                                <button
                                    onClick={handleSignOut}
                                    className="btn btn-error btn-sm shrink-0"
                                >
                                    Sign Out
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-5">
                                <Link
                                    href="/signin"
                                    onClick={() => setMenuOpen(false)}
                                    className="text-sm hover:text-[#00A8E8]"
                                >
                                    Login
                                </Link>

                                <Link
                                    href="/signup"
                                    onClick={() => setMenuOpen(false)}
                                    className="rounded-md bg-[#00A8E8] px-4 py-2 text-sm text-white"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}
