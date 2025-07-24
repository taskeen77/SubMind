import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import SubscriptionProvider from './context/SubscriptionContext';

createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <BrowserRouter>
        <SubscriptionProvider>
          <App />
        </SubscriptionProvider>
    </BrowserRouter>
  </StrictMode>
  
)
