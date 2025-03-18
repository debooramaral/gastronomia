import Navbar from "./componentes/navbar/navbar";
import { Outlet } from "react-router-dom"; //Onde renderizar as rotas filhas

export default function App() {
  return (
    <>
      <Navbar />
      <Outlet /> 
    </>
  );
}
