import React, { useState } from "react";
import "./BodySection.css";

// Impored Images
import masterCard from "../../../../Assets/masterCard.png";
import Ring from "../../../../Assets/wedding-ring.png";
import House from "../../../../Assets/house.png";
import Travel from "../../../../Assets/business-trip.png";
import PS from "../../../../Assets/playstation.png";

// Impored Images
import { GiReceiveMoney } from "react-icons/gi";
import { GiPayMoney } from "react-icons/gi";
import { PiDotsThreeOutlineBold } from "react-icons/pi";
import { FiEdit2 } from "react-icons/fi";
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { AiOutlineCloseCircle } from "react-icons/ai";

const LeftDiv = () => {
  const [actions, setActions] = useState("actions");
  const showActions = () => {
    setActions("showActions actions");
  };
  const removeActions = () => {
    setActions("actions");
  };
  return (
    <div className="LeftDiv grid">
      <div className="balance">
        <span className="topFlex flex">
          <small>Total Balance</small>
          <small
            className="rightFlex flex
            "
          >
            <img src={masterCard} alt="masterCard Image" />
            <span className="cardNumber">****4545</span>
          </small>
        </span>
        <h1>$745,983.00</h1>
        <div className="buttons flex">
          <button className="btn flex">
            <GiPayMoney className="icon" />
            Transfer
          </button>
          <button className="btn flex">
            <GiReceiveMoney className="icon" /> Receive
          </button>
        </div>
      </div>

      <div className="savings">
        <span className="cardTitle">Savings Plan</span>
        <div className="items grid">

          <div className="singleItem">
            <span className="cardTop flex">
              <img src={Ring} alt="Car Icon" />
              <span className="text">
                <h4>Wedding Function</h4>
                <small>Monthly Savings: $1500</small>
              </span>
              <span>
                <PiDotsThreeOutlineBold
                  className="icon"
                  onClick={showActions}
                />
              </span>
            </span>
            <div className="progress flex">
              <span className="completed">
                $50,000
                <span className="color"></span>
              </span>
              <span className="unCompleted">
                $250,000
                <span className="color"></span>
              </span>
            </div>
            <div className={actions}>
              <span className="flex">
                <FiEdit2 className="icon" />
                <small>Edit Plan</small>
              </span>
              <span className="flex">
                <AiFillEyeInvisible className="icon" />
                <small>Hide Plan</small>
              </span>
              <span className="flex delete">
                <AiFillDelete className="icon" />
                <small>Delete Plan</small>
              </span>
              <AiOutlineCloseCircle
                className="closeIcon"
                onClick={removeActions}
              />
            </div>
          </div>
          

          <div className="singleItem">
            <span className="cardTop flex">
              <img src={House} alt="Car Icon" />
              <span className="text">
                <h4>New Home</h4>
                <small>Monthly Savings: $1500</small>
              </span>
              <span>
                <PiDotsThreeOutlineBold className="icon" />
              </span>
            </span>
            <div className="progress flex">
              <span className="completed">
                $40,000
                <span className="color"></span>
              </span>
              <span className="unCompleted">
                $50,000
                <span className="color"></span>
              </span>
            </div>
          </div>

          <div className="singleItem">
            <span className="cardTop flex">
              <img src={Travel} alt="Car Icon" />
              <span className="text">
                <h4>Family Trip</h4>
                <small>Monthly Savings: $500</small>
              </span>
              <span>
                <PiDotsThreeOutlineBold className="icon" />
              </span>
            </span>
            <div className="progress flex">
              <span className="completed">
                $5,000
                <span className="color"></span>
              </span>
              <span className="unCompleted">
                $10,000
                <span className="color"></span>
              </span>
            </div>
          </div>

          <div className="singleItem">
            <span className="cardTop flex">
              <img src={PS} alt="Car Icon" />
              <span className="text">
                <h4>Son's Play Station</h4>
                <small>Monthly Savings: $100</small>
              </span>
              <span>
                <PiDotsThreeOutlineBold className="icon" />
              </span>
            </span>
            <div className="progress flex">
              <span className="completed">
                $200
                <span className="color"></span>
              </span>
              <span className="unCompleted">
                $1,000
                <span className="color"></span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftDiv;
