import React from "react";
import "./BodySection.css";

// Import Components
import RightDiv from "./RightDiv";
import LeftDiv from "./LeftDiv";
import Citas from "./Citas";

const BodySectionListing = ({ selectedMenu }) => {
  return (
    <div className="BodySection flex">
      <LeftDiv />
      {selectedMenu === 'Citas' && (
        <Citas/>
      )}
      {selectedMenu === 'Servicios' && (
        <RightDiv />
      )}
    </div>
  );
};

export default BodySectionListing;
