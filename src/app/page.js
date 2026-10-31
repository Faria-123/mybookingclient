import { Suspense } from "react";
import { HeroSlider } from "@/components/HeroSlider";
import { HowItWorks } from "@/components/HowItWorks";
import { TopCategories } from "@/components/TopCategories";

export default function Home() {
  return (
    <>
      {/* Swiper reads `new Date()` at module scope, which the cacheComponents
          prerender forbids — the Suspense boundary defers it to request time. */}
      <Suspense fallback={<div className="min-h-[32rem] bg-[#050505]" />}>
        <HeroSlider />
      </Suspense>
      <HowItWorks />
      <TopCategories />
    </>
  );
}
