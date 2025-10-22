// PhotoEditPage.jsx


import  PageLinks  from "../components/PageLinks";

export default function PhotoEditPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <h1 className="text-3xl font-bold">Photo Editing Page</h1>
      <PageLinks to="/" variant="blue">
        Go to Home Page
      </PageLinks>
      <PageLinks to="/booth" variant="red">
        Go to Photo Booth
      </PageLinks>

      <PageLinks to="/edit" variant="purple">
        Go to Photo Editor
      </PageLinks>
    </div>
  );
}
