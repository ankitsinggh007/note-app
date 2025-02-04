import Sidebar from "./Sidebar";
const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-primary text-white p-4">App Name</nav>

      {/* Main Content Area */}
      <div className="flex flex-1">
        {/* Sidebar (25%) */}
        <Sidebar/>

        {/* Main Section (75%) */}
        <main className="w-full p-4 flex flex-col">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
