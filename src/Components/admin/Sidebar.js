import React, { useState } from "react";
import { Link } from "react-router-dom";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import RateReviewIcon from "@material-ui/icons/RateReview";

const Sidebar = () => {
  const [isProductsExpanded, setIsProductsExpanded] = useState(false);

  const toggleProducts = () => {
    setIsProductsExpanded(!isProductsExpanded);
  };

  return (
    <div className="sidebar p-8 bg-white flex flex-col">
      <Link to="/admin/dashboard" className="p-4 text-gray-700 hover:text-tomato transition-transform transform hover:scale-110">
        <p className="flex items-center">
          <DashboardIcon className="mr-2" /> Dashboard
        </p>
      </Link>

      <div className="p-4 text-gray-700 hover:text-tomato transition-transform transform hover:scale-110">
        <p className="flex items-center cursor-pointer" onClick={toggleProducts}>
          <ImportExportIcon className="mr-2" /> Products <ExpandMoreIcon className={`transform transition-transform ${isProductsExpanded ? 'rotate-180' : ''}`} />
        </p>
        {isProductsExpanded && (
          <div className="pl-8">
            <Link to="/admin/products" className="block p-2 text-gray-700 hover:text-tomato transition-transform transform hover:scale-110">
              <p className="flex items-center">
                <PostAddIcon className="mr-2" /> All
              </p>
            </Link>
            <Link to="/admin/product" className="block p-2 text-gray-700 hover:text-tomato transition-transform transform hover:scale-110">
              <p className="flex items-center">
                <AddIcon className="mr-2" /> Create
              </p>
            </Link>
          </div>
        )}
      </div>

      <Link to="/admin/orders" className="p-4 text-gray-700 hover:text-tomato transition-transform transform hover:scale-110">
        <p className="flex items-center">
          <ListAltIcon className="mr-2" /> Orders
        </p>
      </Link>

      <Link to="/admin/users" className="p-4 text-gray-700 hover:text-tomato transition-transform transform hover:scale-110">
        <p className="flex items-center">
          <PeopleIcon className="mr-2" /> Users
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;
