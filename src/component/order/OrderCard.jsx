import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import {useAlert} from "react-alert";
import { addItemToCart } from "../../actions/cartAction";
import { useNavigate } from "react-router-dom";
import DialogBox from "../Product/DialogBox";
import { toast } from 'react-toastify';



const createdAt = (user) => {
  const createdAt = new Date(user.createdAt);
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  };

  const formatter = new Intl.DateTimeFormat("en-IN", options);
  const formattedDate = formatter.format(createdAt);
  return formattedDate;
};


const OrderCard = ({ item, user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const alert = useAlert();
  const [open, setOpen] = useState(false);

  const classes = {};
  const isSmallScreen = false;
  const { shippingInfo, orderItems } = item;

  const addToCartHandler = (id, qty = 0) => {
    dispatch(addItemToCart(id, qty))
    toast.success("Item Added to Cart")
    navigate("/cart")
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    console.log("called");
    setOpen(false);
  };

  return (
    <div style={classes.root}>
      {orderItems.map((product) => (
        <div style={classes.orderCard}>
          <div style={classes.firstBlock}>
            {/* Left side */}
            <div style={classes.leftSide}>
              <p
                variant="subtitle1"
                style={classes.orderPlaced}
              // style={{ fontWeight: "500" }}
              >
                ORDER PLACED
              </p>
              <p
                variant="body2"
                style={classes.orderDate}
                color="#141414"
              >
                {createdAt(item)}
              </p>
              <p
                variant="body2"
                style={classes.orderId}
              // style={{ fontWeight: "500" }}
              >
                ORDER-ID: #{item._id}
              </p>
            </div>

            {/* Right side */}
            {!isSmallScreen && (
              <div style={classes.rightSide}>
                <p
                  variant="subtitle1"
                  style={classes.totalPrice}
                // style={{ fontWeight: "500" }}
                >
                  Total:
                </p>
                <p variant="body2" color="141414">
                  <strong> ₹</strong>
                  {product.price * product.quantity}
                </p>
              </div>
            )}
          </div>

          {/* Second block */}
          <div style={classes.secondBlock}>
            {/* Left side */}
            <div style={classes.secondBlock_left}>
              <div style={classes.productDetailsContainer}>
                <div style={{ width: "25%" }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: "100%", height: "160px" }}
                  />
                </div>

                <div>
                  <p
                    variant="subtitle1"
                    style={classes.productName}
                  // style={{ fontWeight: "500" }}
                  >
                    {product.name}
                  </p>
                  <p variant="body2" style={classes.productQty}>
                    <strong>QTY:</strong> {product.quantity}
                  </p>
                  <p
                    variant="body2"
                    style={classes.deliveryStatus}
                  >
                    <strong>Delivery Status:</strong>{" "}
                    <span
                      style={{
                        color:
                          item.orderStatus === "Delivered" ? "green" : "red",
                      }}
                    >
                      {item.orderStatus}
                    </span>
                  </p>
                  <div style={classes.buttonsContainer}>
                    <button
                      variant="outlined"
                      style={classes.buyAgainButton}
                      onClick={() => addToCartHandler(product.productId, 1)}
                    >
                      Buy Again
                    </button>
                    <button
                      variant="outlined"
                      style={classes.button}
                      onClick={() =>
                        navigate(`/product/${product.productId}`)
                      }
                    >
                      View item
                    </button>
                  </div>
                </div>
              </div>
              <div style={{ padding: "1rem" }}>
                <button
                  variant="outlined"
                  style={classes.reviewButton}
                  onClick={handleClickOpen}
                >
                  Write A Product Review
                </button>

                <DialogBox
                  open={open}
                  handleClose={handleClose}
                  id={product.productId}
                  style={classes.dialog}
                />
              </div>
            </div>

            {/* Right side */}
            {!isSmallScreen && (
              <div style={classes.secondBlock_right}>
                <div style={classes.addressBlock}>
                  <p variant="h6">{user.name}</p>
                  <p variant="subtitle1" style={{ fontWeight: 400 }}>
                    Delivery Address :
                  </p>
                  <p variant="body2" style={classes.addressText}>
                    {shippingInfo.address}
                  </p>
                  <p variant="body2" style={classes.addressText}>
                    {shippingInfo.city}, {shippingInfo.state},{" "}
                    {shippingInfo.country} - {shippingInfo.pinCode}
                  </p>
                  <p variant="body2" style={classes.addressText}>
                    Phone: {shippingInfo.phoneNo}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderCard;
