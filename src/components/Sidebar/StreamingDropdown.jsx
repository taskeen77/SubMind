import { useSubscriptionContext } from "../../context/SubscriptionContext";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const StreamingDropdown = ({ isOpen }) => {
  const { filteredSubscriptions } = useSubscriptionContext();
  const [show, setShow] = useState(false);

  return (
    <div className="px-4 mt-4">
      {isOpen && (
        <button
          className="w-full flex justify-between items-center px-2 py-2 bg-emerald-600 rounded-md cursor-pointer"
          onClick={() => setShow((prev) => !prev)}
        >
          Streaming Services <ChevronDown size={16} />
        </button>
      )}

      {isOpen && show && (
        <div className="mt-2 bg-emerald-800 rounded-md px-3 py-2 text-sm">
          {filteredSubscriptions.length === 0 ? (
            <p>No subscriptions found.</p>
          ) : (
            <ul className="space-y-1">
              {filteredSubscriptions.map((sub) => (
                <li key={sub.id}>
                  {sub.name} – ${sub.price} / {sub.frequency}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default StreamingDropdown;