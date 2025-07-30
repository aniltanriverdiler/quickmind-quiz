import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 transition-colors">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Layout;
