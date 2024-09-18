// import React from "react";
// import { Link } from "react-router-dom";
// import { Typography } from "@mui/material";
// import { CheckCircle } from "@mui/icons-material";

// const OrderSuccess = () => {
//   return (
//     <div className="m-auto text-center p-[20vmax] h-[50vh] flex flex-col justify-center items-center">
//       <CheckCircle style={{ fontSize: '5vmax', margin: '2vmax', color: "#e75343" }} />
//       <Typography className="text-[2vmax] my-[2vmax]">Your Order has been Placed successfully</Typography>
//       <Link to="/orders" className="bg-[#333333] text-white border-none p-[1vmax_3vmax] cursor-pointer font-[400] text-[1vmax] no-underline m-[2vmax]">
//         View Orders
//       </Link>
//     </div>
//   );
// };

// export default OrderSuccess;

import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

const OrderSuccess = () => {
  return (
    <div className=" text-center h-[89vh] flex flex-col my-auto justify-center items-center">
      <CheckCircle style={{ fontSize: '10vw', margin: '2vw', color: "#e75343" }} />
      <Typography className="text-xl my-4 sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
        Your Order has been Placed successfully
      </Typography>
      <Link
        to="/orders"
        className="bg-[#333333] text-white border-none px-4 py-2 cursor-pointer font-medium text-sm no-underline my-4 sm:px-6 sm:py-3 sm:text-base md:px-8 md:py-4 md:text-lg"
      >
        View Orders
      </Link>
    </div>
  );
};

export default OrderSuccess;
