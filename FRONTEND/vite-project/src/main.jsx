import React from "react";
import ReactDOM from "react-dom/client"
import App from "./App.jsx";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

//Importando as nossas paginas criadas
import Home from "./pages/home/pages.jsx";
import Cart from "./pages/cart/pages.jsx";
import Profile from "./pages/profile/pages.jsx";
import Plates from "./pages/plates/pages.jsx";
import Auth from "./pages/auth/pages.jsx";

//Criando as rotas de maneira conjunta
const pages = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/cart", element: <Cart /> },
      { path: "/profile", element: <Profile /> },
      { path: "/plates", element: <Plates /> },
      { path: "/auth", element: <Auth /> },
    ],
  },
]);

//Chamando as rotas para renderizar
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={pages}></RouterProvider>
  </React.StrictMode>,
)