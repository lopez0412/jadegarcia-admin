import React from "react";
import "./HelloSection.css";

// Imported Images
import Logo from "../../../../Assets/Logo4.png";
import IsratechLogo from "../../../../Assets/IsratechLogo.jpg";

// Imported Images
import { BiSearchAlt } from "react-icons/bi";
import { GoBell } from "react-icons/go";

const HelloSectionTransaction = () => {
  return (
    <div className="HelloSection">
    <div className="navBar flex">
      <div className="menuDiv flex">
        {/*Logo Div  */}
        <div className="logoDiv">
          <img src={Logo} alt="Logo Image" />
        </div>
        {/* Menu */}
        <div className="menu flex">
          <li className="menuList ">
            <a href="/">Dashboard</a>
          </li>
          <li className="menuList ">
            <a href="/listing">Mantenimientos</a>
          </li>
          <li className="menuList active">
            <a href="/transactions">Transacciones</a>
          </li>
        </div>
      </div>
      {/* Admin Section */}
      <div className="account flex">
        <GoBell className="icon notificationsIcon" />
        <img src={IsratechLogo} alt="Admin Image" />
      </div>
    </div>
    <div className="InHello">
      <h1 className="title">Bienvenido al panel de administrador</h1>
      <ul className="subMenu flex">
        <li className="active">Gastos</li>
        <li>Recibos</li>
      </ul>
    </div>
  </div>
  );
};

export default HelloSectionTransaction;
