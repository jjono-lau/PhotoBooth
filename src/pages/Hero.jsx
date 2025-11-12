// Hero.jsx

import PageLinks from "../components/PageLinks";
import pb1 from "../assets/pb1.png";
import Blur from "../components/Blur.jsx";

export default function HeroPage() {
  return (
    <div
      className="relative flex min-h-screen w-full items-center justify-center bg-cover bg-center bg-repeat px-4 py-10 sm:px-8 lg:px-12"
      style={{ backgroundImage: `url(${pb1})` }}
    >
      <Blur className="w-full max-w-5xl text-white" paddingClass="px-4 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-14">
        <div className="flex flex-col items-center gap-8 text-center">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.45em] text-purple-200 sm:text-base">
              Moments to Memories
            </p>
            <h1 className="text-3xl font-black leading-tight sm:text-5xl lg:text-6xl">
              Snap moments into memories with our pop-up photo booth
            </h1>
            <p className="text-sm text-slate-100/90 sm:text-lg lg:text-xl">
              Free photobooth experience in seconds. Find your vibe, cue the countdown, and let the magic begin.
            </p>
          </div>

          <div className="grid w-full gap-4 text-left text-sm text-slate-100/90 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "One-tap booth controls & fun filters",
              "Deco-worthy frames and personal edits",
              "Instant photo downloads with no cost",
            ].map((blurb) => (
              <div
                key={blurb}
                className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm"
              >
                {blurb}
              </div>
            ))}
          </div>

          <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
            <PageLinks
              to="/booth"
              variant="purple"
              className="w-full px-6 py-3 text-base font-semibold sm:w-auto"
            >
              Launch the Booth
            </PageLinks>
          </div>
        </div>
      </Blur>
    </div>
  );
}
