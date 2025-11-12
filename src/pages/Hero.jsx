// Hero.jsx

import { useEffect } from "react";
import PageLinks from "../components/PageLinks";
import pb1 from "../assets/pb1.png";
import Blur from "../components/Blur.jsx";

const highlights = [
  {
    title: "Effortless controls",
    description:
      "Tap once to launch, queue filters, and let the countdown do the rest.",
  },
  {
    title: "Personalization",
    description:
      "Pair various frames with personalized text and creative fonts.",
  },
  {
    title: "Instant Memories",
    description:
      "Save downloadable photos straight to your device - free, fast, and ready to share.",
  },
];

export default function HeroPage() {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <div
      className="relative flex h-dvh max-h-dvh w-full items-center justify-center bg-cover bg-center bg-repeat px-3 py-3 sm:px-4 sm:py-4 md:px-6 md:py-5 lg:px-9 lg:py-7 xl:px-16"
      style={{ backgroundImage: `url(${pb1})` }}
    >
      <Blur
        className="mx-auto w-full max-w-[min(94vw,64rem)] text-white"
        paddingClass="px-4 py-4 sm:px-5 sm:py-6 md:px-7 md:py-7 lg:px-9 lg:py-8"
      >
        <div className="flex w-full flex-col gap-5 sm:gap-6 md:gap-7 lg:flex-row lg:items-start lg:gap-8">
          <div className="flex flex-1 flex-col gap-4 text-center sm:gap-5 md:gap-5 lg:text-left">
            <header className="space-y-2 sm:space-y-3 md:space-y-3">
              <p className="text-[0.78rem] font-semibold uppercase tracking-[0.45em] text-purple-200 sm:text-[0.85rem] md:text-[0.9rem]">
                Moments to Memories
              </p>
              <h1 className="text-[clamp(1.9rem,5vw,3.1rem)] font-black leading-tight sm:text-[clamp(2.2rem,4vw,3.4rem)] md:text-[clamp(2.4rem,3.8vw,3.6rem)] lg:text-[clamp(2.6rem,3.5vw,3.9rem)]">
                Snap moments into memories with our pop-up photo booth
              </h1>
              <p className="text-[0.95rem] text-slate-100/90 sm:text-base md:text-[1.05rem] lg:text-lg">
                Free photobooth experience in seconds. Find your vibe, cue the
                countdown, and let the magic begin.
              </p>
            </header>

            <div className="flex w-full flex-col gap-2 sm:flex-row sm:justify-center sm:gap-2.5 md:gap-3 lg:justify-start">
              <section className="flex-1 rounded-3xl border border-white/10 bg-white/5 text-left text-slate-100/90 shadow-xl shadow-black/30 backdrop-blur-sm">
                <div className="flex flex-col gap-3 px-4 py-4 sm:px-5 sm:py-5 md:px-6 md:py-5 lg:px-7 lg:py-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-purple-200 sm:text-sm md:text-base">
                    Why you'll love it
                  </p>
                  <ul className="flex flex-col gap-2.5 text-sm sm:text-[0.95rem] md:gap-3 md:text-base">
                    {highlights.map(({ title, description }) => (
                      <li
                        key={title}
                        className="flex flex-col gap-1 border-l border-white/20 pl-3 sm:pl-4 md:pl-5"
                      >
                        <span className="text-base font-semibold text-white sm:text-lg md:text-xl">
                          {title}
                        </span>
                        <span className="text-[0.85rem] text-slate-100/80 sm:text-base md:text-[1.05rem]">
                          {description}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            </div>
          </div>
         
        </div>
        
         <PageLinks
            to="/booth"
            variant="purple"
            className="m-2 md:m-3"
          >
            Launch the Booth
          </PageLinks>
      </Blur>
    </div>
  );
}
