import React from "react";
import "./BodySection.css";

// Import Components
import RightDiv from "../BodySection/RightDiv";
import LeftDiv from "../BodySection/LeftDiv";

const BodySection = () => {
  return (
    <div className="BodySection flex">
      <LeftDiv />
      <RightDiv />
    </div>
  );
};

export default BodySection;
