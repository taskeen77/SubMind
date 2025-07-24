// // Notification.jsx
// import { useEffect } from "react";
// import {
//   CheckCircleIcon,
//   ExclamationCircleIcon,
//   InformationCircleIcon,
//   ExclamationTriangleIcon,
//   XMarkIcon,
// } from "@heroicons/react/24/outline";

// const Notification = ({ type = "success", message, onClose }) => {
//   useEffect(() => {
//     const timer = setTimeout(() => onClose(), 7000);
//     return () => clearTimeout(timer);
//   }, [onClose]);

//   const baseStyle =
//     "fixed top-6 right-6 z-[9999] px-5 py-4 rounded-lg shadow-xl flex items-start gap-3 text-white max-w-sm w-full transition-transform animate-slide";

//   const types = {
//     success: "bg-emerald-600",
//     error: "bg-red-500",
//     info: "bg-blue-500",
//     warning: "bg-yellow-500 text-gray-900",
//   };

//   const icons = {
//     success: <CheckCircleIcon className="h-6 w-6 text-white" />,
//     error: <ExclamationCircleIcon className="h-6 w-6 text-white" />,
//     info: <InformationCircleIcon className="h-6 w-6 text-white" />,
//     warning: <ExclamationTriangleIcon className="h-6 w-6 text-gray-800" />,
//   };

//   return (
//     <div className={`${baseStyle} ${types[type]}`}>
//       <div className="mt-1">{icons[type]}</div>
//       <div className="flex-1 text-sm font-medium">{message}</div>
//       <button onClick={onClose} className="mt-0.5">
//         <XMarkIcon className="h-5 w-5 text-white hover:text-gray-200" />
//       </button>
//     </div>
//   );
// };

// export default Notification;
// // 

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
    }, 7000); // Display for 7 seconds

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
