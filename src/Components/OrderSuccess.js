import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="m-auto text-center p-[20vmax] h-[50vh] flex flex-col justify-center items-center">
      <CheckCircleIcon style={{ fontSize: '5vmax', margin: '2vmax', color: "#e75343" }} />
      <Typography className="text-[2vmax] my-[2vmax]">Your Order has been Placed successfully</Typography>
      <Link to="/orders" className="bg-[#333333] text-white border-none p-[1vmax_3vmax] cursor-pointer font-[400] text-[1vmax] no-underline m-[2vmax]">
        View Orders
      </Link>
    </div>
  );
};

export default OrderSuccess;
