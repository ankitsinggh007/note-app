const MainLayout = ({ children }) => {
    return (
      <div className="min-h-screen flex flex-col">
        {/* Navbar Here */}
        <nav className="bg-primary text-white p-4">App Name</nav>
  
        {/* Page Content */}
        <main className="flex-1 p-4">{children}</main>
  
        {/* Footer (optional) */}
      </div>
    );
  };
  
  export default MainLayout;
  