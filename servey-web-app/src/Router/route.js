import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Home from "../Page/Home/home";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
     <Home/>
    ),
  },
  {
    path: "predict",
    element: <div>About</div>,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);