import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import { BrowserRouter } from "react-router-dom";
import SubscriptionProvider from './context/SubscriptionContext';
 import { HashRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <HashRouter>
        <SubscriptionProvider>
          <App />
        </SubscriptionProvider>
   </HashRouter>
  </StrictMode>
  
)
