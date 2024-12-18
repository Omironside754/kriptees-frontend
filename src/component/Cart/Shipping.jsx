import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "../../actions/cartAction";
import MetaData from "../Layouts/MetaData/MetaData";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const Shipping = () => {
  // const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = React.useState(shippingInfo.address);
  const [firstName, setFirstName] = React.useState(shippingInfo.firstName);
  const [lastName, setLastName] = React.useState(shippingInfo.lastName);
  const [city, setCity] = React.useState(shippingInfo.city);
  const [pinCode, setPinCode] = React.useState(shippingInfo.pinCode);
  const [state, setState] = React.useState(shippingInfo.state);
  const [country, setCountry] = React.useState(shippingInfo.country || "India");
  const [phoneNo, setPhone] = React.useState(shippingInfo.phoneNo || "");
  const [email, setEmail] = React.useState(shippingInfo.email);
  const [saveAddress, setSaveAddress] = React.useState(false);
  const [sameBillingDelivery, setSameBillingDelivery] = React.useState(false);
  const [isValidEmail, setIsValidEmail] = React.useState(true);
  const [isPhoneNoValid, setIsPhoneNoValid] = React.useState(true);

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handlePincodeChange = (event) => {
    setPinCode(event.target.value);
  };

  const handleStateChange = (event) => {

    setState(event.target.value);
  };

  const handleCountryChange = (value) => {
    setCountry(value.label);
  };

  const handlePhoneChange = (event) => {
    const newPhoneNo = event.target.value;
    setPhone(newPhoneNo);
    setIsPhoneNoValid(newPhoneNo !== "" && newPhoneNo.length === 10);
  };

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;

    setEmail(newEmail);
    setIsValidEmail(
      newEmail === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)
    );
  };

  const handleSaveAddressChange = (event) => {
    setSaveAddress(event.target.checked);
  };

  const handleSameBillingDeliveryChange = (event) => {
    setSameBillingDelivery(event.target.checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      email === "" ||
      firstName === "" ||
      lastName === "" ||
      address === "" ||
      city === "" ||
      state === "" ||
      country === "" ||
      pinCode === "" ||
      phoneNo === ""
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
    navigate("/process/payment");
  };






  return (
    <>
      <div>
        <MetaData title={"Shipping Info"} />

        <div>
          <div className=" lg:mx-36">
            <div className=" mt-32">
              <MetaData title={"Shipping Info"} />
              <div className="container mx-auto px-4">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <form onSubmit={handleSubmit}>
                    <h2 className="text-2xl font-semibold mb-6">SHIPPING ADDRESS</h2>
                    <div className="grid grid-cols-1 gap-6">
                      <div>
                        <label className="block text-gray-700">First Name</label>
                        <input
                          type="text"
                          value={firstName}
                          onChange={handleFirstNameChange}
                          className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700">Last Name</label>
                        <input
                          type="text"
                          value={lastName}
                          onChange={handleLastNameChange}
                          className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700">Address</label>
                        <input
                          type="text"
                          value={address}
                          onChange={handleAddressChange}
                          className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-gray-700">City</label>
                          <input
                            type="text"
                            value={city}
                            onChange={handleCityChange}
                            className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700">Pincode</label>
                          <input
                            type="text"
                            value={pinCode}
                            onChange={handlePincodeChange}
                            className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-gray-700">State</label>
                          <input
                            type="text"
                            value={state}
                            onChange={handleStateChange}
                            className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700">Country</label>
                          <input
                            type="text"
                            value={country}
                            onChange={handleCountryChange}
                            className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-gray-700">Phone</label>
                        <input
                          type="text"
                          value={phoneNo}
                          onChange={handlePhoneChange}
                          className={`w-full mt-2 p-2 border rounded-md ${!isPhoneNoValid && phoneNo !== "" ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {!isPhoneNoValid && phoneNo !== "" && (
                          <p className="text-red-500 text-sm">Please enter a valid phone number.</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-gray-700">Email</label>
                        <input
                          type="email"
                          value={email}
                          onChange={handleEmailChange}
                          className={`w-full mt-2 p-2 border rounded-md ${!isValidEmail && email !== "" ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {!isValidEmail && email !== "" && (
                          <p className="text-red-500 text-sm">Please enter a valid email address.</p>
                        )}
                      </div>
                      {/* <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={saveAddress}
                          onChange={handleSaveAddressChange}
                          className="form-checkbox text-black"
                        />
                        <label className="ml-2 text-gray-700">Save Address to Address Book</label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={sameBillingDelivery}
                          onChange={handleSameBillingDeliveryChange}
                          className="form-checkbox text-black"
                        />
                        <label className="ml-2 text-gray-700">My billing and delivery information are the same.</label>
                      </div> */}
                      <div>
                        <button
                          type="submit"
                          className="w-full mt-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                          Continue
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            {/* <div >
              <form onSubmit={handleSubmit}>
                <Typography variant="h6" style={classes.heading}>
                  SHIPPING ADDRESS
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      label="First Name"
                      variant="outlined"
                      fullWidth
                      value={firstName}
                      onChange={handleFirstNameChange}
                      style={classes.outlinedInput}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Last Name"
                      variant="outlined"
                      fullWidth
                      value={lastName}
                      onChange={handleLastNameChange}
                      style={classes.outlinedInput}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Address"
                      variant="outlined"
                      fullWidth
                      value={address}
                      onChange={handleAddressChange}
                      style={classes.outlinedInput}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="City"
                      variant="outlined"
                      fullWidth
                      value={city}
                      onChange={handleCityChange}
                      style={classes.outlinedInput}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Pincode"
                      variant="outlined"
                      fullWidth
                      value={pinCode}
                      onChange={handlePincodeChange}
                      style={classes.outlinedInput}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="State"
                      variant="outlined"
                      fullWidth
                      value={state}
                      onChange={handleStateChange}
                      style={classes.outlinedInput}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Country"
                      variant="outlined"
                      fullWidth
                      value={country}
                      onChange={handleCountryChange}
                      style={classes.outlinedInput}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      label="Phone"
                      variant="outlined"
                      fullWidth
                      value={phoneNo}
                      onChange={handlePhoneChange}
                      style={classes.outlinedInput}
                      error={!isPhoneNoValid && phoneNo !== ""}
                      helperText={
                        !isPhoneNoValid &&
                        phoneNo &&
                        "Please enter a valid phone number."
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Email"
                      variant="outlined"
                      fullWidth
                      value={email}
                      onChange={handleEmailChange}
                      style={classes.outlinedInput}
                      error={!isValidEmail && email !== ""}
                      helperText={
                        !isValidEmail &&
                        email &&
                        "Please enter a valid email address."
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={saveAddress}
                          style={{ color: "#000000" }}
                          onChange={handleSaveAddressChange}
                        />
                      }
                      label="Save Address to Address Book"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={sameBillingDelivery}
                          style={{ color: "#000000" }}
                          onChange={handleSameBillingDeliveryChange}
                        />
                      }
                      label="My billing and delivery information are the same."
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      style={classes.submitButton}

                    >
                      Continue
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Shipping;
