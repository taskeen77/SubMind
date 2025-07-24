// // // import { useState, useEffect } from "react";
// // // import SubscriptionForm from "./SubscriptionForm";
// // // import axios from "axios";

// // // const API_URL = "http://localhost:3001/subscriptions";

// // // const SubscriptionManager = () => {
// // //   const [subscriptions, setSubscriptions] = useState([]);
// // //   const [editing, setEditing] = useState(false);
// // //   const [editData, setEditData] = useState(null);

// // //   const fetchSubscriptions = async () => {
// // //     try {
// // //       const res = await axios.get(API_URL);
// // //       setSubscriptions(res.data);
// // //     } catch (err) {
// // //       console.error("Failed to fetch subscriptions:", err);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchSubscriptions();
// // //   }, []);

// // //   const handleAddSubscription = async (data) => {
// // //     try {
// // //       const res = await axios.post(API_URL, data);
// // //       setSubscriptions((prev) => [...prev, res.data]);
// // //     } catch (err) {
// // //       console.error("Failed to add subscription:", err);
// // //     }
// // //   };

// // //   const handleUpdateSubscription = async (updatedData) => {
// // //     try {
// // //       const res = await axios.put(`${API_URL}/${updatedData.id}`, updatedData);
// // //       setSubscriptions((prev) =>
// // //         prev.map((sub) => (sub.id === updatedData.id ? res.data : sub))
// // //       );
// // //       setEditing(false);
// // //       setEditData(null);
// // //     } catch (err) {
// // //       console.error("Failed to update subscription:", err);
// // //     }
// // //   };

// // //   const handleEdit = (sub) => {
// // //     setEditData(sub);
// // //     setEditing(true);
// // //     window.scrollTo({ top: 0, behavior: "smooth" }); // bring form into view
// // //   };

// // //   const handleDelete = async (id) => {
// // //     try {
// // //       await axios.delete(`${API_URL}/${id}`);
// // //       setSubscriptions((prev) => prev.filter((sub) => sub.id !== id));
// // //     } catch (err) {
// // //       console.error("Failed to delete:", err);
// // //     }
// // //   };

// // //   return (
// // //     <div className="min-h-screen p-4 sm:p-6 md:p-10">
// // //       <SubscriptionForm
// // //         onSubmit={editing ? handleUpdateSubscription : handleAddSubscription}
// // //         initialData={editData}
// // //         isEditing={editing}
// // //       />

// // //       <div className="mt-12 max-w-2xl mx-auto">
// // //         <h3 className="text-xl font-semibold mb-6 text-gray-800">Your Subscriptions</h3>

// // //         {subscriptions.length === 0 ? (
// // //           <p className="text-center text-gray-500">No subscriptions yet. Add one above.</p>
// // //         ) : (
// // //           <ul className="space-y-5">
// // //             {subscriptions.map((sub) => (
// // //               <li
// // //                 key={sub.id}
// // //                 className="flex justify-between items-start p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition"
// // //               >
// // //                 <div>
// // //                   <h4 className="text-lg font-semibold text-emerald-700">{sub.name}</h4>
// // //                   <p className="text-sm text-gray-600 mt-1">
// // //                     ${sub.price} / {sub.frequency}
// // //                   </p>
// // //                   <p className="text-xs text-gray-500 mt-1">Category: {sub.category}</p>
// // //                 </div>
// // //                 <div className="flex flex-col items-end gap-2">
// // //                   <button
// // //                     onClick={() => handleEdit(sub)}
// // //                     className="cursor-pointer text-blue-500 hover:text-blue-700 text-sm"
// // //                   >
// // //                     Edit
// // //                   </button>
// // //                   <button
// // //                     onClick={() => handleDelete(sub.id)}
// // //                     className="cursor-pointer text-red-500 hover:text-red-700 text-sm"
// // //                   >
// // //                     Delete
// // //                   </button>
// // //                 </div>
// // //               </li>
// // //             ))}
// // //           </ul>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default SubscriptionManager;
// // import { useState, useEffect } from "react";
// // import SubscriptionForm from "./SubscriptionForm";
// // import axios from "axios";
// // import { toast } from "react-toastify";


// // const API_URL = "http://localhost:3001/subscriptions";

// // const SubscriptionManager = () => {
// //   const [subscriptions, setSubscriptions] = useState([]);
// //   const [editing, setEditing] = useState(false);
// //   const [editData, setEditData] = useState(null);

// //   const fetchSubscriptions = async () => {
// //     try {
// //       const res = await axios.get(API_URL);
// //       setSubscriptions(res.data);
// //     } catch (err) {
// //       console.error("Failed to fetch subscriptions:", err);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchSubscriptions();
// //   }, []);

// //  const handleAddSubscription = async (data) => {
// //   try {
// //     const res = await axios.post(API_URL, data);
// //     setSubscriptions((prev) => [...prev, res.data]);
// //     toast.success("Subscription added!");
// //   } catch (err) {
// //     console.error("Failed to add subscription:", err);
// //     toast.error("Failed to add subscription");
// //   }
// // };

// //   const handleUpdateSubscription = async (updatedData) => {
// //   try {
// //     const res = await axios.put(`${API_URL}/${updatedData.id}`, updatedData);
// //     setSubscriptions((prev) =>
// //       prev.map((sub) => (sub.id === updatedData.id ? res.data : sub))
// //     );
// //     setEditing(false);
// //     setEditData(null);
// //     toast.success("Subscription updated!");
// //   } catch (err) {
// //     console.error("Failed to update subscription:", err);
// //     toast.error("Update failed");
// //   }
// // };


// //   const handleEdit = (sub) => {
// //     setEditData(sub);
// //     setEditing(true);
// //     window.scrollTo({ top: 0, behavior: "smooth" }); // bring form into view
// //   };

// //   const handleDelete = async (id) => {
// //     try {
// //       await axios.delete(`${API_URL}/${id}`);
// //       setSubscriptions((prev) => prev.filter((sub) => sub.id !== id));
// //     } catch (err) {
// //       console.error("Failed to delete:", err);
// //     }
// //   };

// //   const ConfirmModal = ({ onConfirm, onCancel }) => {
// //   return (
// //     <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
// //       <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full">
// //         <h3 className="text-lg font-semibold text-gray-800 mb-4">Are you sure?</h3>
// //         <div className="flex justify-end gap-4">
// //           <button
// //             onClick={onCancel}
// //             className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-800"
// //           >
// //             Cancel
// //           </button>
// //           <button
// //             onClick={onConfirm}
// //             className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white"
// //           >
// //             Delete
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };



// //   return (
// //     <><div className="min-h-screen p-4 sm:p-6 md:p-10">
// //       <SubscriptionForm
// //         onSubmit={editing ? handleUpdateSubscription : handleAddSubscription}
// //         initialData={editData}
// //         isEditing={editing} />

// //       <div className="mt-12 max-w-2xl mx-auto">
// //         <h3 className="text-xl font-semibold mb-6 text-gray-800">Your Subscriptions</h3>

// //         {subscriptions.length === 0 ? (
// //           <p className="text-center text-gray-500">No subscriptions yet. Add one above.</p>
// //         ) : (
// //           <ul className="space-y-5">
// //             {subscriptions.map((sub) => (
// //               <li
// //                 key={sub.id}
// //                 className="flex justify-between items-start p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition"
// //               >
// //                 <div>
// //                   <h4 className="text-lg font-semibold text-emerald-700">{sub.name}</h4>
// //                   <p className="text-sm text-gray-600 mt-1">
// //                     ${sub.price} / {sub.frequency}
// //                   </p>
// //                   <p className="text-xs text-gray-500 mt-1">Category: {sub.category}</p>
// //                 </div>
// //                 <div className="flex flex-col items-end gap-2">
// //                   <button
// //                     onClick={() => handleEdit(sub)}
// //                     className="cursor-pointer text-blue-500 hover:text-blue-700 text-sm"
// //                   >
// //                     Edit
// //                   </button>
// //                   <button
// //                     onClick={() => handleDelete(sub.id)}
// //                     className="cursor-pointer text-red-500 hover:text-red-700 text-sm"
// //                   >
// //                     Delete
// //                   </button>
// //                 </div>
// //               </li>
// //             ))}
// //           </ul>
// //         )}
// //       </div>
// //     </div><footer className="pt-10 text-center text-sm bg-none text-gray-400 mt-2 flex justify-center items-center">
// //         &copy; {new Date().getFullYear()} Subscription Manager. Built with ❤️ using React.
// //       </footer></>
// //   );
// // };

// // export default SubscriptionManager;






// import { useState, useEffect } from "react";
// import SubscriptionForm from "./SubscriptionForm";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { AlertTriangle, X, Check } from "lucide-react";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Notification from "../../notification";

// const API_URL = "http://localhost:3001/subscriptions";

// const SubscriptionManager = () => {
//   const [subscriptions, setSubscriptions] = useState([]);
//   const [editing, setEditing] = useState(false);
//   const [editData, setEditData] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [deleteId, setDeleteId] = useState(null);

//   const [notification, setNotification] = useState(null);

//   const showNotification = (type, message) => {
//     setNotification({ type, message });
//   };

//   useEffect(() => {
//     const fetchSubscriptions = async () => {
//       try {
//         const res = await axios.get(API_URL);
//         setSubscriptions(res.data);
//       } catch (err) {
//         console.error("Failed to fetch subscriptions:", err);
//       }
//     };
//     fetchSubscriptions();
//   }, []);

//  const handleAddSubscription = async (data) => {
//     try {
//       const res = await axios.post(API_URL, data);
//       setSubscriptions((prev) => [...prev, res.data]);
//       showNotification("success", "Subscription added!");
//     } catch (err) {
//       console.error(err);
//       showNotification("error", "Failed to add subscription.");
//     }
//   };

//   const handleUpdateSubscription = async (updatedData) => {
//     try {
//       const res = await axios.put(`${API_URL}/${updatedData.id}`, updatedData);
//       setSubscriptions((prev) =>
//         prev.map((sub) => (sub.id === updatedData.id ? res.data : sub))
//       );
//       setEditing(false);
//       setEditData(null);
//       showNotification("success", "Subscription updated!");
//     } catch (err) {
//       console.error(err);
//       showNotification("error", "Update failed.");
//     }
//   };

//   const handleEdit = (sub) => {
//     setEditData(sub);
//     setEditing(true);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const confirmDelete = (id) => {
//     setDeleteId(id);
//     setShowModal(true);
//   };

//   const handleDelete = async () => {
//     try {
//       await axios.delete(`${API_URL}/${deleteId}`);
//       setSubscriptions((prev) => prev.filter((sub) => sub.id !== deleteId));
//       setShowModal(false);
//       toast.success("Subscription deleted");
//     } catch (err) {
//       console.error("Failed to delete:", err);
//       toast.error("Delete failed");
//     }
//   };


// const ConfirmModal = ({ onConfirm, onCancel }) => {
//   return (
//     <div className="fixed inset-0 bg-gray-100 bg-opacity-50 z-50 flex items-center justify-center">
//       <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg max-w-sm w-full p-6 relative">
//         <div className="flex items-center gap-3 mb-4">
//           <AlertTriangle className="text-red-500" size={24} />
//           <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
//             Confirm Deletion
//           </h2>
//         </div>
//         <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
//           Are you sure you want to delete this subscription? This action cannot be undone.
//         </p>
//         <div className="flex justify-end gap-3">
//           <button
//             onClick={onCancel}
//             className="flex items-center gap-1 px-4 py-2 cursor-pointer rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 transition"
//           >
//             <X size={16} /> Cancel
//           </button>
//           <button
//             onClick={onConfirm}
//             className="flex items-center gap-1 cursor-pointer px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white transition"
//           >
//             <Check size={16} /> Delete
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };


//   return (
//     <>
//       <div className="min-h-screen p-4 sm:p-6 md:p-10">
//         <SubscriptionForm
//           onSubmit={editing ? handleUpdateSubscription : handleAddSubscription}
//           initialData={editData}
//           isEditing={editing}
//         />

//         <div className="mt-12 max-w-2xl mx-auto">
//           <h3 className="text-xl font-semibold mb-6 text-gray-800">Your Subscriptions</h3>

//           {subscriptions.length === 0 ? (
//             <p className="text-center text-gray-500">No subscriptions yet. Add one above.</p>
//           ) : (
//             <ul className="space-y-5">
//               {subscriptions.map((sub) => (
//                 <li
//                   key={sub.id}
//                   className="flex justify-between items-start p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition"
//                 >
//                   <div>
//                     <h4 className="text-lg font-semibold text-emerald-700">{sub.name}</h4>
//                     <p className="text-sm text-gray-600 mt-1">
//                       ${sub.price} / {sub.frequency}
//                     </p>
//                     <p className="text-xs text-gray-500 mt-1">Category: {sub.category}</p>
//                   </div>
//                   <div className="flex flex-col items-end gap-2">
//                     <button
//                       onClick={() => handleEdit(sub)}
//                       className="cursor-pointer text-blue-500 hover:text-blue-700 text-sm"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => confirmDelete(sub.id)}
//                       className="cursor-pointer text-red-500 hover:text-red-700 text-sm"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       </div>
//       <ToastContainer />

//       <footer className="pt-10 text-center text-sm bg-none text-gray-400 mt-2 flex justify-center items-center">
//         &copy; {new Date().getFullYear()} Subscription Manager. Built with ❤️ using React.
//       </footer>

//       {showModal && (
//         <ConfirmModal onConfirm={handleDelete} onCancel={() => setShowModal(false)} />
//       )}
//     </>
//   );
// };

// export default SubscriptionManager;






import { useState, useEffect } from "react";
import SubscriptionForm from "./SubscriptionForm";
import axios from "axios";
import { AlertTriangle, X, Check, Info, ShieldCheck, XCircle } from "lucide-react";

const API_URL = "http://localhost:3001/subscriptions";

const SubscriptionManager = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [notification, setNotification] = useState(null);

  const showNotification = (type, message) => {
    setNotification({ type, message });

    setTimeout(() => setNotification(null), 7000); // auto-dismiss
  };

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const res = await axios.get(API_URL);
        setSubscriptions(res.data);
      } catch (err) {
        console.error("Failed to fetch subscriptions:", err);
        showNotification("error", "Failed to load data.");
      }
    };
    fetchSubscriptions();
  }, []);

  const handleAddSubscription = async (data) => {
    try {
      const res = await axios.post(API_URL, data);
      setSubscriptions((prev) => [...prev, res.data]);
      showNotification("success", "Subscription added!");
    } catch (err) {
      console.error(err);
      showNotification("error", "Failed to add subscription.");
    }
  };

  const handleUpdateSubscription = async (updatedData) => {
    try {
      const res = await axios.put(`${API_URL}/${updatedData.id}`, updatedData);
      setSubscriptions((prev) =>
        prev.map((sub) => (sub.id === updatedData.id ? res.data : sub))
      );
      setEditing(false);
      setEditData(null);
      showNotification("success", "Subscription updated!");
    } catch (err) {
      console.error(err);
      showNotification("error", "Update failed.");
    }
  };

  const handleEdit = (sub) => {
    setEditData(sub);
    setEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/${deleteId}`);
      setSubscriptions((prev) => prev.filter((sub) => sub.id !== deleteId));
      setShowModal(false);
      showNotification("success", "Subscription deleted.");
    } catch (err) {
      console.error("Failed to delete:", err);
      showNotification("error", "Delete failed.");
    }
  };

  const ConfirmModal = ({ onConfirm, onCancel }) => (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6 relative">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="text-red-500" size={24} />
          <h2 className="text-lg font-semibold text-gray-800">
            Confirm Deletion
          </h2>
        </div>
        <p className="text-sm text-gray-600 mb-6">
          Are you sure you want to delete this subscription? This cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="flex items-center gap-1 px-4 cursor-pointer py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-800"
          >
            <X size={16} /> Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex items-center gap-1 px-4 cursor-pointer py-2 rounded-md bg-red-600 hover:bg-red-700 text-white"
          >
            <Check size={16} /> Delete
          </button>
        </div>
      </div>
    </div>
  );

  const Notification = ({ type, message }) => {
    const iconMap = {
      success: <ShieldCheck className="text-green-600" size={20} />,
      error: <XCircle className="text-red-500" size={20} />,
      info: <Info className="text-blue-500" size={20} />,
    };

    return (
      <div className="fixed top-6 right-6 z-[100] bg-white shadow-lg rounded-md px-5 py-3 flex items-center gap-3 border border-gray-200 animate-fade-in-down">
        {iconMap[type] || <Info size={20} />}
        <span className="text-sm font-medium text-gray-800">{message}</span>
        <button
          onClick={() => setNotification(null)}
          className="ml-3 text-gray-400 hover:text-gray-600"
        >
          <X size={16} />
        </button>
      </div>
    );
  };

  return (
    <>
      <div className="min-h-screen p-4 sm:p-6 md:p-10">
        <SubscriptionForm
          onSubmit={editing ? handleUpdateSubscription : handleAddSubscription}
          initialData={editData}
          isEditing={editing}
        />

        <div className="mt-12 max-w-2xl mx-auto">
          <h3 className="text-xl font-semibold mb-6 text-gray-800">
            Your Subscriptions
          </h3>

          {subscriptions.length === 0 ? (
            <p className="text-center text-gray-500">No subscriptions yet. Add one above.</p>
          ) : (
            <ul className="space-y-5">
              {subscriptions.map((sub) => (
                <li
                  key={sub.id}
                  className="flex justify-between items-start p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition"
                >
                  <div>
                    <h4 className="text-lg font-semibold text-emerald-700">{sub.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      ${sub.price} / {sub.frequency}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Category: {sub.category}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => handleEdit(sub)}
                      className="text-blue-500 cursor-pointer hover:text-blue-700 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => confirmDelete(sub.id)}
                      className="text-red-500 cursor-pointer hover:text-red-700 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <footer className="pt-10 text-center text-sm text-gray-400 mt-2">
        &copy; {new Date().getFullYear()} Subscription Manager. Built using React.
      </footer>

      {showModal && (
        <ConfirmModal
          onConfirm={handleDelete}
          onCancel={() => setShowModal(false)}
        />
      )}

      {notification && (
        <Notification type={notification.type} message={notification.message} />
      )}
    </>
  );
};

export default SubscriptionManager;
