const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0F1419]">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-[#364153] rounded-full"></div>
        <div className="absolute inset-0 border-4 border-transparent border-t-[#2B7FFF] rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default Loader;
