const CapsuleWrapper = ({ minWidth = "auto", additionalClasses = "", children, isText = false }) => {
    return (
      <div
        className={`inline-flex items-center justify-center p-2 bg-slate-50 ${additionalClasses} 
        ${isText ? "rounded-lg" : "rounded-full"} 
        min-w-[${minWidth}]`}
      >
        {children}
      </div>
    );
  };
  export default CapsuleWrapper;