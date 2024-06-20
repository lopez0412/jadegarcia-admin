import "./App.css";

import HelloSection from "./Pages/Dashboard/DashboardComponents/HelloSection/HelloSection";
import BodySection from "./Pages/Dashboard/DashboardComponents/BodySection/BodySection";
import HelloSectionListing from "./Pages/Listing/ListingComponents/HelloSection/HelloSectionListing";
import BodySectionListing from "./Pages/Listing/ListingComponents/BodySection/BodySectionListing";
import HelloSectionTransaction from "./Pages/Transaction/TransactionComponents/HelloSection/HelloSectionTransaction";
import BodySectionTransaction from "./Pages/Transaction/TransactionComponents/BodySection/BodySectionTransaction";

// Import React router dom
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Pages/Login/Login";
import ListingAdmin from "./Pages/Listing/ListingComponents/ListingAdmin";

// lets create a router
const router = createBrowserRouter([
  /**{
    path: "/",
    element: (
      <div className="body">
        <HelloSection />
        <BodySection />
      </div>
    ),
  },*/
  {
    path: "/login",
    element: (
      <div className="body">
        <Login />
      </div>
    ),
  },
  {
    path: "/transactions",
    element: (
      <div className="body">
        <HelloSectionTransaction />
        <BodySectionTransaction />
      </div>
    ),
  },
  {
    path: "/listing",
    element: (
       <ListingAdmin />
    ),
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
