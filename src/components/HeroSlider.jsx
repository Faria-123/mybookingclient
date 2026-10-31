"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { Rocket, ArrowRight, BookOpen } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const slides = [
    {
        title: ["The Largest Library", "of Borrowable Books"],
        text: "Thousands of titles across every genre. Borrow, enjoy, and return — all in one place.",
    },
    {
        title: ["New Arrivals", "Every Single Week"],
        text: "Fresh picks added weekly and curated by our librarians, so your next read is always new.",
    },
    {
        title: ["Keep Track of", "Every Borrow"],
        text: "Due dates, history and favorites in one dashboard — never lose track of a book again.",
    },
];

export function HeroSlider() {
    return (
        <section className="relative overflow-hidden bg-[#050505]">
            {/* Glow behind the slider */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,rgba(0,168,232,0.22),transparent_70%)]"
            />

            <Swiper
                modules={[Autoplay, Pagination, EffectFade]}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                loop
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                className="relative min-h-[32rem] w-full md:min-h-[38rem] [&_.swiper-slide]:flex [&_.swiper-slide]:items-center [--swiper-pagination-color:#00A8E8] [--swiper-pagination-bottom:2rem]"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div className="mx-auto flex max-w-4xl flex-col items-center px-6 py-24 text-center md:py-28">
                            {/* Badge */}
                            <div className="mb-7 flex items-center gap-3">
                                <span className="flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-[#00A8E8]">
                                    <Rocket className="size-4" />
                                    <span className="underline underline-offset-4">
                                        6 New Books This Week!
                                    </span>
                                </span>
                                <span className="flex -space-x-2">
                                    <span className="flex size-7 items-center justify-center rounded-full border-2 border-[#050505] bg-gradient-to-br from-sky-400 to-blue-600">
                                        <BookOpen className="size-3.5 text-white" />
                                    </span>
                                    <span className="flex size-7 items-center justify-center rounded-full border-2 border-[#050505] bg-gradient-to-br from-violet-500 to-fuchsia-600">
                                        <BookOpen className="size-3.5 text-white" />
                                    </span>
                                </span>
                            </div>

                            {/* Title */}
                            <h1 className="max-w-3xl bg-gradient-to-b from-white via-white to-neutral-500 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
                                {slide.title[0]}
                                <br />
                                {slide.title[1]}
                            </h1>

                            {/* Short text */}
                            <p className="mt-5 max-w-xl text-base text-neutral-400 md:text-lg">
                                {slide.text}
                            </p>

                            {/* Browse Books button */}
                            <Link
                                href="/allbooks"
                                className="mt-9 inline-flex items-center gap-2 rounded-xl bg-[#00A8E8] px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-sky-500/25 transition-colors hover:bg-sky-400"
                            >
                                Browse Books
                                <ArrowRight className="size-4" />
                            </Link>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}
