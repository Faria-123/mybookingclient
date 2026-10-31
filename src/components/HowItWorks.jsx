import { Search, BookMarked, BookOpen, RotateCcw } from "lucide-react";

const steps = [
    {
        icon: Search,
        title: "Browse the Catalog",
        text: "Explore thousands of titles across every genre and find your next great read.",
    },
    {
        icon: BookMarked,
        title: "Borrow in One Click",
        text: "Reserve any book instantly with your reader account — no paperwork, no queues.",
    },
    {
        icon: BookOpen,
        title: "Enjoy Your Read",
        text: "Pick up at the nook or read digitally — whatever suits your week.",
    },
    {
        icon: RotateCcw,
        title: "Return When Done",
        text: "Drop it back and your borrowing history stays neat and up to date.",
    },
];

export function HowItWorks() {
    return (
        <section className="bg-muted/40 py-20">
            <div className="mx-auto max-w-7xl px-6">
                {/* Section header */}
                <div className="mx-auto max-w-2xl text-center">
                    <p className="text-sm font-bold uppercase tracking-wide text-[#00A8E8]">
                        How Borrowing Works
                    </p>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
                        From shelf to sofa in four steps
                    </h2>
                    <p className="mt-3 text-muted-foreground">
                        Borrowing a book should be the easy part. Here is the whole journey.
                    </p>
                </div>

                {/* Steps */}
                <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {steps.map((step, index) => (
                        <li
                            key={step.title}
                            className="relative rounded-2xl border border-border bg-background p-6 transition-shadow hover:shadow-md"
                        >
                            <div className="flex items-center justify-between">
                                <span className="flex size-11 items-center justify-center rounded-xl bg-sky-50 text-[#00A8E8] dark:bg-sky-950">
                                    <step.icon className="size-5" />
                                </span>
                                <span className="text-4xl font-extrabold text-muted/60">
                                    {index + 1}
                                </span>
                            </div>
                            <h3 className="mt-5 text-lg font-semibold">{step.title}</h3>
                            <p className="mt-2 text-sm text-muted-foreground">{step.text}</p>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
