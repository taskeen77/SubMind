import { ShieldCheck, XCircle, Info, X } from "lucide-react";
import { useEffect } from "react";

const Notification = ({ type = "info", message, onClose }) => {
  const iconMap = {
    success: <ShieldCheck className="text-green-600" size={20} />,
    error: <XCircle className="text-red-500" size={20} />,
    info: <Info className="text-blue-500" size={20} />,
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000); 

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-[100] bg-white border border-gray-200 shadow-xl rounded-xl px-5 py-3 flex items-center gap-3 max-w-lg w-full animate-fade-in-down">
      {iconMap[type] || <Info size={20} />}
      <span className="text-sm font-medium text-gray-800">{message}</span>
      <button
        onClick={onClose}
        className="ml-auto text-gray-400 hover:text-gray-600 transition"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default Notification;
