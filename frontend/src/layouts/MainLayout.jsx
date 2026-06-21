import Navbar from "../components/Navbar";

function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="max-w-screen-2xl mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
}

export default MainLayout;
