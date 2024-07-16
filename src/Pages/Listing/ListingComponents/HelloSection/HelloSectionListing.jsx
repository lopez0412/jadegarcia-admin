import React, { useState } from "react";
import "./HelloSection.css";

// Imported Images
import Logo from "../../../../Assets/IconosJade/LOGOS MODIFICADOS-01.png";
import Logo2 from "../../../../Assets/IconosJade/LOGOS MODIFICADOS-02.png"

// Imported Images
import { BiSearchAlt } from "react-icons/bi";
import { GoBell } from "react-icons/go";

const HelloSectionListing = ({ selectedMenu, setSelectedMenu }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  
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
          {/*<li className="menuList ">
            <a href="/dashboard">Dashboard</a>
          </li>*/}
          <li className="menuList active">
            <a href="/listing">Mantenimientos</a>
          </li>
          {/*<li className="menuList">
            <a href="/transactions">Transacciones</a>
          </li>*/}
        </div>
      </div>
      {/* Admin Section */}
      <div className="account flex">
       
        
        <img src={Logo2} alt="Admin Image" onClick={toggleDropdown} />
        {dropdownOpen && (
        <div className="dropdown">
        <div className="dropdown-content">
          <a href="/" onClick={() => localStorage.removeItem('token')}>Cerrar Sesión</a>
        </div>
      </div>
        )}
        
      </div>
    </div>
    <div className="InHello">
      <h1 className="title">Bienvenido al panel de administrador</h1>
      <ul className="subMenu flex">
        <li  className={selectedMenu === 'Citas' ? 'active' : ''}
          onClick={() => setSelectedMenu('Citas')}>Citas</li>
        <li
          className={selectedMenu === 'Servicios' ? 'active' : ''}
          onClick={() => setSelectedMenu('Servicios')}
        >
          Servicios
          </li>
      </ul>
    </div>
  </div>
  );
};

export default HelloSectionListing;
