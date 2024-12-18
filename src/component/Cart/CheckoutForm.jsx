import React, { useEffect, useState } from "react";

import './App.css';

export default function CheckoutForm() {


  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsLoading(false);
  };

  return (
    <form className="form1" id="payment-form" onSubmit={handleSubmit}>

      <button className="button1" disabled={isLoading} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}