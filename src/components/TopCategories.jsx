import Link from "next/link";
import {
    BookText,
    Rocket,
    UserRound,
    HeartHandshake,
    Landmark,
    Baby,
    ArrowRight,
} from "lucide-react";

const categories = [
    {
        icon: BookText,
        name: "Fiction",
        text: "Stories, sagas and page-turners.",
    },
    {
        icon: Rocket,
        name: "Sci-Fi & Fantasy",
        text: "Other worlds and future frontiers.",
    },
    {
        icon: UserRound,
        name: "Biography",
        text: "Lives that changed the world.",
    },
    {
        icon: HeartHandshake,
        name: "Self-Help",
        text: "Grow, heal and level up.",
    },
    {
        icon: Landmark,
        name: "History",
        text: "The past, one chapter at a time.",
    },
    {
        icon: Baby,
        name: "Children's",
        text: "Bedtime favorites for little readers.",
    },
];

export function TopCategories() {
    return (
        <section className="py-20">
            <div className="mx-auto max-w-7xl px-6">
                {/* Section header */}
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <div className="max-w-xl">
                        <p className="text-sm font-bold uppercase tracking-wide text-[#00A8E8]">
                            Top Categories
                        </p>
                        <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
                            Find your kind of book
                        </h2>
                    </div>
                    <Link
                        href="/allbooks"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#00A8E8] transition-colors hover:text-sky-600"
                    >
                        Browse all books
                        <ArrowRight className="size-4" />
                    </Link>
                </div>

                {/* Categories */}
                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {categories.map((category) => (
                        <Link
                            key={category.name}
                            href="/allbooks"
                            className="group flex items-center gap-4 rounded-2xl border border-border p-6 transition-colors hover:border-[#00A8E8]"
                        >
                            <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-[#00A8E8] transition-colors group-hover:bg-[#00A8E8] group-hover:text-white dark:bg-sky-950">
                                <category.icon className="size-5" />
                            </span>
                            <span>
                                <span className="block font-semibold">{category.name}</span>
                                <span className="block text-sm text-muted-foreground">
                                    {category.text}
                                </span>
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
