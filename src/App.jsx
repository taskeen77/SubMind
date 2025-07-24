// import './App.css';
// import { Routes, Route } from "react-router-dom";
// import Header from './components/header/Header';
// import Sidebar from './components/Sidebar/Sidebar';
// import SubscriptionManager from './components/pages/form/SubscriptionManager';
// import SubscriptionProvider from './context/SubscriptionContext';
// import Analytics from './components/pages/analytics';
// import ReminderPanel from './components/pages/RemainderPanel';
// import Dashboard from './components/pages/Dashboard';
// import SettingsPage from './components/pages/settings';
// import Description from './components/pages/Description';

// function App() {
//   return (
//     <SubscriptionProvider>
//         <div className="min-h-screen bg-gray-50 dark:bg-slate-900 text-black dark:text-white flex flex-col content-center">
//           <Header />
//           <div className="flex flex-1">
//             <Sidebar />
//             <div className="flex-1 ml-16 md:ml-64 p-4 transition-all">
//               <Routes>
//                 <Route path="/" element={<Dashboard />} />
//                 <Route path="/analytics" element={<Analytics />} />
//                 <Route path="/reminders" element={<ReminderPanel />} />
//                 <Route path="/settings" element={<SettingsPage />} />
//                 <Route path="/description" element={<Description />} />
//                 <Route path="/add-subscription" element={<SubscriptionManager />} />
//               </Routes>

//             </div>
//           </div>
//         </div>
//     </SubscriptionProvider>
//   );
// }

// export default App;


import './App.css';
import { Routes, Route } from "react-router-dom";
import Header from './components/header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import SubscriptionManager from './components/pages/form/SubscriptionManager';
import SubscriptionProvider from './context/SubscriptionContext';
import Analytics from './components/pages/analytics';
import ReminderPanel from './components/pages/RemainderPanel';
import Dashboard from './components/pages/Dashboard';
import SettingsPage from './components/pages/settings';
import Description from './components/pages/Description';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

function App() {
  return (
    <SubscriptionProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 text-black dark:text-white flex flex-col content-center">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <div className="flex-1 ml-16 md:ml-64 p-4 transition-all">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/reminders" element={<ReminderPanel />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/description" element={<Description />} />
              <Route path="/add-subscription" element={<SubscriptionManager />} />
            </Routes>
          </div>
        </div>

        {/* ✅ Toast notifications always available */}
        <ToastContainer position="top-right" autoClose={2500} />
      </div>
    </SubscriptionProvider>
  );
}

export default App;
