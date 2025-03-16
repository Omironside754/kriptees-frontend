import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "../../actions/cartAction";
import MetaData from "../Layouts/MetaData/MetaData";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = React.useState(shippingInfo.address || "");
  const [firstName, setFirstName] = React.useState(shippingInfo.firstName || "");
  const [lastName, setLastName] = React.useState(shippingInfo.lastName || "");
  const [city, setCity] = React.useState(shippingInfo.city || "");
  const [pinCode, setPinCode] = React.useState(shippingInfo.pinCode || "");
  const [state, setState] = React.useState(shippingInfo.state || "");
  const [country, setCountry] = React.useState(shippingInfo.country || "India");
  const [phoneNo, setPhone] = React.useState(shippingInfo.phoneNo || "");
  const [email, setEmail] = React.useState(shippingInfo.email || "");
  const [isValidEmail, setIsValidEmail] = React.useState(true);
  const [isPhoneNoValid, setIsPhoneNoValid] = React.useState(true);

  // Handle Input Changes
  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);
  const handleAddressChange = (e) => setAddress(e.target.value);
  const handleCityChange = (e) => setCity(e.target.value);
  const handlePincodeChange = (e) => setPinCode(e.target.value);
  const handleStateChange = (e) => setState(e.target.value);
  const handleCountryChange = (e) => setCountry(e.target.value);

  const handlePhoneChange = (e) => {
    const newPhoneNo = e.target.value;
    setPhone(newPhoneNo);
    setIsPhoneNoValid(newPhoneNo === "" || newPhoneNo.length === 10);
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsValidEmail(
      newEmail === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)
    );
  };

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !email ||
      !firstName ||
      !lastName ||
      !address ||
      !city ||
      !state ||
      !country ||
      !pinCode ||
      !phoneNo
    ) {
      toast.error("Please fill all the fields");
      return;
    }

    if (phoneNo && phoneNo.length !== 10) {
      toast.error("Phone Number should be 10 digits Long");
      return;
    }

    dispatch(
      saveShippingInfo({
        address,
        city,
        state,
        country,
        pinCode,
        phoneNo,
        email,
        firstName,
        lastName,
      })
    );
    navigate("/process/payment", {
      state: location.state, // forward the same state to Payment
    });
  };

  return (
    <>
      <MetaData title={"Shipping Info"} />
      <div className="Home_Page min-h-screen mt-16">
        <div className="max-w-7xl mx-auto px-4 py-16">
          {/* Page Heading */}
          <h2 className="text-4xl font-black uppercase tracking-widest mb-8 text-center">
            Shipping Info
          </h2>

          {/* Form Container */}
          <div className="bg-white border border-gray-300 rounded shadow-lg p-6">
            <form onSubmit={handleSubmit}>
              {/* First + Last Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={handleFirstNameChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={handleLastNameChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none"
                  />
                </div>
              </div>

              {/* Address */}
              <div className="mb-6">
                <label className="block text-sm font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={handleAddressChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none"
                />
              </div>

              {/* City + Pincode */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={handleCityChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Pincode
                  </label>
                  <input
                    type="text"
                    value={pinCode}
                    onChange={handlePincodeChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none"
                  />
                </div>
              </div>

              {/* State + Country */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider text-gray-700 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    value={state}
                    onChange={handleStateChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    value={country}
                    onChange={handleCountryChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="mb-6">
                <label className="block text-sm font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="text"
                  value={phoneNo}
                  onChange={handlePhoneChange}
                  className={`w-full p-2 border rounded focus:outline-none ${
                    !isPhoneNoValid && phoneNo !== ""
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {!isPhoneNoValid && phoneNo !== "" && (
                  <p className="text-red-500 text-sm mt-1">
                    Please enter a valid phone number.
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="mb-6">
                <label className="block text-sm font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  className={`w-full p-2 border rounded focus:outline-none ${
                    !isValidEmail && email !== ""
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {!isValidEmail && email !== "" && (
                  <p className="text-red-500 text-sm mt-1">
                    Please enter a valid email address.
                  </p>
                )}
              </div>

              {/* Continue Button */}
              <button
                type="submit"
                className="
                  w-full mt-4 py-3
                  bg-black text-white 
                  text-sm font-bold uppercase tracking-wider
                  rounded
                  hover:bg-gray-800 transition-colors
                "
              >
                Continue
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shipping;
