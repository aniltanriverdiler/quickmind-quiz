import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {/* Add Navbar */}
      <Outlet />
    </div>
  );
}

export default Layout;
