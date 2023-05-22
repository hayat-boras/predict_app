import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  BrowserRouter,
  Routes,
} from "react-router-dom";
import Home from "./Page/Home/home";
import ThankYouPage from "./Page/Home/thankyou";
import { ToastContainer } from "react-toastify";

export default function App() {
  return (
  
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/predict" element={<ThankYouPage />} />
      </Routes>
    </BrowserRouter>
    

  );
}

const root =createRoot(document.getElementById('root'));
root.render(<App />);