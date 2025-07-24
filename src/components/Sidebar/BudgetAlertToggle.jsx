import { useEffect, useState } from "react";
import { useSubscriptionContext } from "../../context/SubscriptionContext";
import { Pencil } from "lucide-react";

const BudgetAlertToggle = ({ isOpen }) => {
  const {
    budgetAlertEnabled,
    setBudgetAlertEnabled,
    budgetThreshold,
    updateBudgetSettings,
    isOverBudget,
    settingsLoaded,
  } = useSubscriptionContext();

  const [showPrompt, setShowPrompt] = useState(false);
  const [input, setInput] = useState("");

  // Show prompt on initial load if no budget
  useEffect(() => {
    if (settingsLoaded && (budgetThreshold === null || budgetThreshold === undefined)) {
      setShowPrompt(true);
    }
  }, [settingsLoaded, budgetThreshold]);

  const handlePromptSubmit = () => {
    const value = parseFloat(input);
    if (!isNaN(value) && value > 0) {
      updateBudgetSettings(true, value);
      setShowPrompt(false);
    }
  };

  return (
    <>
      {/* Budget Edit Prompt */}
      {showPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white text-black p-6 rounded-lg w-80 space-y-3 shadow-lg">
            <h2 className="text-lg font-semibold">Set Monthly Budget</h2>
            <input
              type="number"
              className="w-full px-3 py-2 border rounded"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter budget"
            />
            <button
              className="bg-emerald-500 text-white px-4 py-2 rounded w-full cursor-pointer"
              onClick={handlePromptSubmit}
            >
              Save Budget
            </button>
          </div>
        </div>
      )}

      {/* Budget Alert UI */}
      <div className="px-4 mt-4">
        <div className="flex items-center gap-2 justify-between">
          <div className="flex items-center gap-2 text-sm">
            {isOpen && (
              <>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={budgetAlertEnabled}
                    className="cursor-pointer"
                    onChange={(e) =>
                      updateBudgetSettings(e.target.checked, budgetThreshold || 0)
                    }
                  />
                  Budget Alert
                </label>
                {budgetThreshold && (
                  <span className="text-black">
                    (${budgetThreshold})
                  </span>
                )}
              </>
            )}
          </div>
          <button onClick={() => {
            setInput(budgetThreshold || "");
            setShowPrompt(true);
          }}>
            <Pencil size={18} className="text-black hover:text-gray-700 cursor-pointer" />
          </button>
        </div>

        {isOpen && budgetAlertEnabled && isOverBudget && (
          <div className="mt-2 text-red-300 text-sm">⚠ Over budget!</div>
        )}
      </div>
    </>
  );
};

export default BudgetAlertToggle;
