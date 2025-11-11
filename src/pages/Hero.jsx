// Hero.jsx

import PageLinks from "../components/PageLinks";
import pb1 from "../assets/pb1.png";

export default function HeroPage() {
  return (
    <div
      className="flex min-h-screen w-full flex-col items-center justify-center space-y-4 bg-repeat"
      style={{ backgroundImage: `url(${pb1})` }}
    >
      <h1 className="text-3xl font-bold">Hero Page</h1>
      <PageLinks to="/booth" variant="purple">
        Go to Photo Booth
      </PageLinks>
    </div>
  );
}
