import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export const SubscriptionContext = createContext();

const SubscriptionProvider = ({ children }) => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");

  const [budgetAlertEnabled, setBudgetAlertEnabled] = useState(false);
  const [budgetThreshold, setBudgetThreshold] = useState(null);
  const [settingsLoaded, setSettingsLoaded] = useState(false);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedSub, setSelectedSub] = useState(null);

  // Load subscriptions and settings
  useEffect(() => {
    axios.get("http://localhost:3001/subscriptions")
      .then(res => setSubscriptions(res.data))
      .catch(err => console.error("Failed to load subscriptions", err));

    axios.get("http://localhost:3001/settings")
      .then(res => {
        setBudgetAlertEnabled(res.data.budgetAlertEnabled);
        setBudgetThreshold(res.data.budgetThreshold);
        setSettingsLoaded(true);
      })
      .catch(err => console.error("Failed to load settings", err));
  }, []);

  // Save settings to backend
  const updateBudgetSettings = async (enabled, threshold) => {
    try {
      await axios.put("http://localhost:3001/settings", {
        budgetAlertEnabled: enabled,
        budgetThreshold: threshold,
      });
      setBudgetAlertEnabled(enabled);
      setBudgetThreshold(threshold);
    } catch (err) {
      console.error("Failed to update budget settings", err);
    }
  };

  const filteredSubscriptions = subscriptions.filter((sub) => {
    const matchesCategory = category === "all" || sub.category === category;
    const matchesSearch = sub.name?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalMonthlySpending = subscriptions.reduce((total, sub) => {
    return sub.frequency === "monthly" ? total + parseFloat(sub.price || 0) : total;
  }, 0);

  const isOverBudget = budgetAlertEnabled && budgetThreshold && totalMonthlySpending > budgetThreshold;

  const addSubscription = async (data) => {
    const newSub = {
      id: uuidv4(),
      ...data,
      position: data.position || { x: 100, y: 100 },
    };
    try {
      await axios.post("http://localhost:3001/subscriptions", newSub);
      setSubscriptions((prev) => [...prev, newSub]);
    } catch (err) {
      console.error("Add failed", err);
    }
  };

  const updateSubscription = async (updated) => {
    try {
      await axios.put(`http://localhost:3001/subscriptions/${updated.id}`, updated);
      setSubscriptions((prev) =>
        prev.map((sub) => (sub.id === updated.id ? updated : sub))
      );
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  const deleteSubscription = async (id) => {
    try {
      await fetch(`http://localhost:3001/subscriptions/${id}`, {
        method: "DELETE",
      });
      setSubscriptions((prev) => prev.filter((sub) => sub.id !== id));
    } catch (error) {
      console.error("Failed to delete subscription from server:", error);
    }
  };

  const getNodes = () => {
    return subscriptions.map((sub) => ({
      id: sub.id,
      label: sub.name,
      x: sub.position?.x || 100,
      y: sub.position?.y || 100,
    }));
  };

  const updateNodePosition = (id, x, y) => {
    const sub = subscriptions.find((s) => s.id === id);
    if (!sub) return;
    const updated = { ...sub, position: { x, y } };
    updateSubscription(updated);
  };

  return (
    <SubscriptionContext.Provider
      value={{
        subscriptions,
        filteredSubscriptions,
        searchTerm,
        setSearchTerm,
        category,
        setCategory,
        budgetAlertEnabled,
        setBudgetAlertEnabled,
        budgetThreshold,
        setBudgetThreshold,
        totalMonthlySpending,
        isOverBudget,
        updateBudgetSettings,
        settingsLoaded,

        addSubscription,
        updateSubscription,
        deleteSubscription,

        isPopupOpen,
        setIsPopupOpen,
        selectedSub,
        setSelectedSub,

        getNodes,
        updateNodePosition,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscriptionContext = () => useContext(SubscriptionContext);
export default SubscriptionProvider;
