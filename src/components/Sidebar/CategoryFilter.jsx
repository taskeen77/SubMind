import { useSubscriptionContext } from "../../context/SubscriptionContext";
import { FileText } from "lucide-react";

const CategoryFilter = ({ isOpen }) => {
  const { category, setCategory } = useSubscriptionContext();
  return (
    <div className="px-4 mt-4">
      {isOpen ? (
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-2 py-1 text-black rounded-md cursor-pointer"
        >
          <option value="all">All</option>
          <option value="entertainment">Entertainment</option>
          <option value="education">Education</option>
          <option value="utilities">Utilities</option>
          <option value="productivity">Productivity</option>
          <option value="other">Other</option>
        </select>
      ) : (
        <FileText size={20} className="text-white" />
      )}
    </div>
  );
};

export default CategoryFilter;