const ResponsiveWrapper = ({ children }) => {
    return (
      <div className="flex justify-center items-center min-h-screen bg-secondary">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
          {children}
        </div>
      </div>
    );
  };
  
  export default ResponsiveWrapper;
  