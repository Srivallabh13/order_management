import { Add, Dashboard, ExpandMore, ImportExport, ListAlt, People, PostAdd } from "@mui/icons-material";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isProductsExpanded, setIsProductsExpanded] = useState(false);

  const toggleProducts = () => {
    setIsProductsExpanded(!isProductsExpanded);
  };

  return (
    <div className="sidebar p-8 bg-white flex flex-col">
      <Link to="/admin/dashboard" className="p-4 text-gray-700 hover:text-tomato transition-transform transform hover:scale-110">
        <p className="flex items-center">
          <Dashboard className="mr-2" /> Dashboard
        </p>
      </Link>

      <div className="p-4 text-gray-700 hover:text-tomato transition-transform transform hover:scale-110">
        <p className="flex items-center cursor-pointer" onClick={toggleProducts}>
          <ImportExport className="mr-2" /> Products <ExpandMore className={`transform transition-transform ${isProductsExpanded ? 'rotate-180' : ''}`} />
        </p>
        {isProductsExpanded && (
          <div className="pl-8">
            <Link to="/admin/products" className="block p-2 text-gray-700 hover:text-tomato transition-transform transform hover:scale-110">
              <p className="flex items-center">
                <PostAdd className="mr-2" /> All
              </p>
            </Link>
            <Link to="/admin/product/create" className="block p-2 text-gray-700 hover:text-tomato transition-transform transform hover:scale-110">
              <p className="flex items-center">
                <Add className="mr-2" /> Create
              </p>
            </Link>
          </div>
        )}
      </div>

      <Link to="/admin/orders" className="p-4 text-gray-700 hover:text-tomato transition-transform transform hover:scale-110">
        <p className="flex items-center">
          <ListAlt className="mr-2" /> Orders
        </p>
      </Link>

      <Link to="/admin/users" className="p-4 text-gray-700 hover:text-tomato transition-transform transform hover:scale-110">
        <p className="flex items-center">
          <People className="mr-2" /> Users
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;