import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Toaster } from "../components/ui/sonner";

function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-background transition-colors">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-0">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
      <Toaster position="top-right" richColors />
    </div>
  );
}

export default Layout;
