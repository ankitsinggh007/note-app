import Sidebar from "./Sidebar";
const MainLayout = ({ children, modal }) => {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Main Content Area */}
      <div className="flex flex-1">
        {/* Sidebar (25%) */}
        <Sidebar />

        {/* Main Section (75%) */}
        <main className="w-full p-4 flex flex-col">{children}</main>
      </div>

      {/* Render modal above everything */}
      {modal}
    </div>
  );
};

export default MainLayout;
