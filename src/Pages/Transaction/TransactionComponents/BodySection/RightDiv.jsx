import React from "react";
import "./BodySection.css";

// Imported icons
import { GiMoneyStack } from "react-icons/gi";
import { GoMoveToTop } from "react-icons/go";
import { GoMoveToBottom } from "react-icons/go";
import { GiWallet } from "react-icons/gi";
import { PiDotFill } from "react-icons/pi";

// Imported images
import Trello from "../../../../Assets/trello.png";
import microsoft from "../../../../Assets/microsoft.png";
import itunes from "../../../../Assets/itunes.png";
import adobe from "../../../../Assets/adobe.png";
import insurance from "../../../../Assets/insurance.png";

const RightDiv = () => {
  return (
    <div className="RightDiv grid">
      {/* <div className="firstCard grid">
        <div className="firstCard_top flex">
          <div className="income">
            <span className="cardTitle flex">
              <span>Total Income</span>
              <GiMoneyStack className="icon" />
            </span>
            <h1>$349,700.00</h1>
            <span className="flex rate">
              <GoMoveToTop className="icon" />
              <blockquote>+23.7% </blockquote>
              compared to last week
            </span>
          </div>
          <div className="limit">
            <span className="cardTitle flex">
              <span>Spending Limit</span>
              <small>Week</small>
            </span>
            <div className="range">
              <span className="amount">
                $2,453.00
                <small>used from $10,000.00</small>
              </span>
              <div className="progress flex">
                <span className="color completed"></span>
                <span className="color unCompleted"></span>
              </div>
            </div>
          </div>
        </div>
        <div className="firstCard_bottom flex">
          <div className="expenses">
            <span className="cardTitle flex">
              <span>Total Expenses</span>
              <GiWallet className="icon" />
            </span>
            <h1>$2,453.00</h1>
            <span className="flex rate">
              <GoMoveToBottom className="icon" />
              <blockquote>-2.7% </blockquote>
              compared to last week
            </span>
          </div>
          <div className="analytics ">
            <span className="cardTitle flex">
              <span>Expenses Analytics</span>
              <small>Week</small>
            </span>

            <div className="ranges flex">
              <div className="singleRange Refurbrishment">
                <span className="color"></span>
                <small className="text">
                  <PiDotFill className="icon" />
                  Refurbrishment
                </small>
                <small className="amount">$1200.00</small>
              </div>
              <div className="singleRange Furniture">
                <span className="color"></span>
                <small className="text">
                  <PiDotFill className="icon" />
                  Furniture
                </small>
                <small className="amount">$1200</small>
              </div>
              <div className="singleRange Others">
                <span className="color"></span>
                <small className="text">
                  <PiDotFill className="icon" />
                  Others
                </small>
                <small className="amount">$253</small>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <div className="secondCard">
        <span className="cardTitle flex">
          <span>Transaction History</span>
          <small>Week</small>
        </span>
        <div className="secContainer grid">
          <div className="singleItem flex">
            <section className="nameDiv flex">
              <img src={Trello} alt="Logo" />
              <span className="text">
                Trello Premium Plan
                <small>Apllication</small>
              </span>
            </section>

            <section className="SubscriptionDiv">
              <span className="text">Subscription</span>
            </section>

            <section className="dateDiv">
              <span className="text">
                Sept 12.2023
                <small>10:23 PM</small>
              </span>
            </section>

            <section className="amount">
              <span className="text">$76.00</span>
            </section>

            <section className="status">
              <span className="text">Completed</span>
            </section>
          </div>
          <div className="singleItem flex">
            <section className="nameDiv flex">
              <img src={microsoft} alt="Logo" />
              <span className="text">
                Microsoft Monthly.
                <small>Technology corporation</small>
              </span>
            </section>

            <section className="SubscriptionDiv">
              <span className="text">Subscription</span>
            </section>

            <section className="dateDiv">
              <span className="text">
                Sept 01.2023
                <small>10:23 AM</small>
              </span>
            </section>

            <section className="amount">
              <span className="text">$16.00</span>
            </section>

            <section className="status">
              <span className="text">Completed</span>
            </section>
          </div>
          <div className="singleItem flex">
            <section className="nameDiv flex">
              <img src={itunes} alt="Logo" />
              <span className="text">
                Itunes Subscription
                <small>Software program</small>
              </span>
            </section>

            <section className="SubscriptionDiv">
              <span className="text">Subscription</span>
            </section>

            <section className="dateDiv">
              <span className="text">
                Sept 12.2023
                <small>7:34 AM</small>
              </span>
            </section>

            <section className="amount">
              <span className="text">$33.00</span>
            </section>

            <section className="status">
              <span className="text">Completed</span>
            </section>
          </div>
          <div className="singleItem flex">
            <section className="nameDiv flex">
              <img src={adobe} alt="Logo" />
              <span className="text">
                Adobe Cloud
                <small>Computer software company</small>
              </span>
            </section>

            <section className="SubscriptionDiv">
              <span className="text">Subscription</span>
            </section>

            <section className="dateDiv">
              <span className="text">
                Sept 03.2023
                <small>6:00 PM</small>
              </span>
            </section>

            <section className="amount">
              <span className="text">$10.00</span>
            </section>

            <section className="status">
              <span className="text">Completed</span>
            </section>
          </div>
          <div className="singleItem flex">
            <section className="nameDiv flex">
              <img src={insurance} alt="Logo" />
              <span className="text">
                Car Insurance
                <small>Vehicle Insurance Company</small>
              </span>
            </section>

            <section className="SubscriptionDiv">
              <span className="text">Subscription</span>
            </section>

            <section className="dateDiv">
              <span className="text">
                Sept 01.2023
                <small>2:33 AM</small>
              </span>
            </section>

            <section className="amount">
              <span className="text">$200.00</span>
            </section>

            <section className="status">
              <span className="text">Completed</span>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightDiv;
