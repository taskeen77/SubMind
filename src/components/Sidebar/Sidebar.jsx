import { X } from "lucide-react";
import NavLinks from "./NavLinks";
import CategoryFilter from "./CategoryFilter";
import StreamingDropdown from "./StreamingDropdown";
import BudgetAlertToggle from "./BudgetAlertToggle";

const Sidebar = ({ isMobile, showSidebar, setShowSidebar }) => {
  return (
    <div
      className={`
        ${isMobile
          ? `fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] w-1/2 bg-emerald-700 text-white shadow-lg overflow-y-auto transition-transform duration-300 ease-in-out
             ${showSidebar ? "translate-x-0" : "-translate-x-full"}`
          : `fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 overflow-y-auto bg-emerald-700 text-white shadow-md hidden md:block z-30`}
      `}
    >
      <div className="flex flex-col gap-4 px-2 py-6 h-full">
        {isMobile && (
          <X
            size={20}
            className="cursor-pointer ml-auto mr-2 text-white"
            onClick={() => setShowSidebar(false)}
          />
        )}
        <NavLinks isOpen />
        <CategoryFilter isOpen />
        <StreamingDropdown isOpen />
        <BudgetAlertToggle isOpen />
      </div>
    </div>
  );
};

export default Sidebar;
