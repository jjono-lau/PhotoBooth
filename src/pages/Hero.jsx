// Hero.jsx

import  PageLinks  from "../components/PageLinks";


export default function HeroPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <h1 className="text-3xl font-bold">Hero Page</h1>
      <PageLinks to="/booth" variant="purple">Go to Photo Booth</PageLinks>
    </div>
  );
}
