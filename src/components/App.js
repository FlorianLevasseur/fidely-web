import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import SubscriptionUser from "../pages/SubscriptionUser";
import SubscriptionStore from "../pages/SubscriptionStore";
import Connexion from "../pages/Connexion";


export default function App() {
  
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/subscriptionUser" element={<SubscriptionUser />} />
          <Route path="/subscriptionStore" element={<SubscriptionStore />} />
          <Route path="/connexion" element={<Connexion />} />
      </Routes>
    </BrowserRouter>
    
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
