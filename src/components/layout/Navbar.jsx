const Navbar = () => {
  return (
    <div className="h-[70px] bg-card-inner border-b border-border flex items-center">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-[1.4rem] font-bold tracking-[1px] text-text-main flex items-center uppercase">
          <i className="material-icons text-accent-blue mr-3">analytics</i>
          Sovereign Insight Analysis
        </div>
      </div>
    </div>
  );
};

export default Navbar;
