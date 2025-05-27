import React from "react";
import { Navbar } from "../../components/Navs/Navbar.jsx";
import { Footer } from "../../components/Footer/Footer.jsx";
import {Servicios} from "../../components/Servicios/Servicios.jsx";

export const ServiciosPage = () => {
  return (
    <div className="servicios-container">
      <Servicios />
    </div>
  );
};