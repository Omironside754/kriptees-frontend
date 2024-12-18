import React from "react";
import { useSelector } from "react-redux";
import MetaData from "../Layouts/MetaData/MetaData";
import { Link } from "react-router-dom";

import Loader from "../Layouts/loader/Loader"
function ConfirmOrder() {


  // const { shippingInfo, cartItems } = useSelector((state) => state.cart);

  // const { user
  //   , loading
  // } = useSelector((state) => state.userData);

  // const subTotal = cartItems.reduce((acc, currItem) => {
  //   return acc + currItem.quantity * currItem.price;
  // }, 0);

  // const shippingCharges = subTotal > 1000 ? 0 : 99;

  // const gst = subTotal * 0.18;

  // const totalFinalPrice = subTotal + gst + shippingCharges;


  // const address = `${shippingInfo.address} , ${shippingInfo.city} ${shippingInfo.state} , ${shippingInfo.pinCode} , ${shippingInfo.country}`;

  // function proceedToPayment() {
  //   const data = {
  //     subTotal,
  //     shippingCharges,
  //     gst,
  //     totalFinalPrice,
  //   };
  //   // session storage allowd save data untill  browser tab is opend
  //   sessionStorage.setItem("orderInfo", JSON.stringify(data));
  // }

  return (
    <>

    </>
  );
}

export default ConfirmOrder;
