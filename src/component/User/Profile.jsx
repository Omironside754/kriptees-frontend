import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userAction";
import { toast } from 'react-toastify';
import { updatePassword } from "../../actions/userAction";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstant";
import { clearErrors } from "../../actions/userAction";
import {
  updateProfile,
  load_UserProfile,
} from "../../actions/userAction";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstant";
import { forgetPassword } from "../../actions/userAction";

const ProfilePage = () => {
  // const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.userData);

  const { loading, isUpdated, error } = useSelector(
    (state) => state.profileData
  );


  //User Update data starts
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidName, setIsValidEName] = useState(true);

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    setIsValidEmail(
      newEmail !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)
    );
  };


  const handleNameChange = (event) => {
    setName(event.target.value);
    setIsValidEName(event.target.value.length >= 4);
  };

  const UpdateProfileSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);

    dispatch(updateProfile(myForm));
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      toast.success("Profile Updated Successfully");
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
      navigate("/account");
      dispatch(load_UserProfile());
    }
  }, [dispatch, error,
    // alert,
    navigate, user, isUpdated]);

  const isSignInDisabledProfile = !(email && isValidEmail && name && isValidName);

  //user Update data ends


  const [toggle, setToggle] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isValidConfirmPassword, setisValidConfirmPassword] = useState(true);
  const handleOldPassword = (event) => {
    setOldPassword(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setNewPassword(event.target.value);
    setIsValidPassword(event.target.value.length >= 8);
  };
  const handleConfirmPasswordChange = (event) => {
    setconfirmPassword(event.target.value);
    setisValidConfirmPassword(event.target.value.length >= 8);
  };

  const handleShowPasswordClick = () => {
    setShowPassword(!showPassword);
  };

  function updatePasswordSubmitHandler(e) {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Password and Confirm Password do not match");
      return;
    }
    const myForm = new FormData();
    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(updatePassword(myForm));
  }

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      toast.success("Profile Updated Successfully");
      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
      navigate("/account");
    }
  }, [dispatch, error, alert, isUpdated, loading, navigate]);

  const isSignInDisabled = !(
    newPassword &&
    confirmPassword &&
    oldPassword &&
    isValidPassword
  );


  const logoutHandler = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    navigate("/login");
  };
  useEffect(() => {
    // if user not logged in
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);

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


  function handleforgotPasswordSubmit(e) {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("email", user.email);
    dispatch(forgetPassword(myForm));

  }
  return (
    <>
      <div className="mt-16 lg:mt-36 lg:mx-auto min-h-screen max-w-screen-xl mx-8 xl:mx-auto">
        <div className="grid grid-cols-8 pt-3 sm:grid-cols-10">

          <div className="col-span-10 overflow-hidden rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow">
            <div className="pt-4">
              <h1 className="py-2 text-2xl font-semibold">Account settings</h1>
            </div>
            <hr className="mt-4 mb-8" />

            <div>
              <p className="py-2 text-xl font-semibold">User Details:</p>
              <div className="flex flex-col ">
                <p className="text-gray-600">Name: {user.name}</p>
                <p className="text-gray-600">Phone Number: Coming Soon</p>
                <p className="text-gray-600">Email:{user.email}</p>

                <button
                  onClick={() => { setToggle(!toggle) }}
                  className="inline-flex text-sm w-12 font-semibold text-blue-600 underline decoration-2">Change</button>

              </div>

              {toggle && <div>
                <div className="py-2 text-xl font-semibold">
                  Update User Details:
                </div>
                <div>
                  <label for="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <div className="mt-1">
                    <input
                      value={name}
                      onChange={handleNameChange}
                      error={!isValidName && name !== ""}
                      helperText={
                        !isValidName && name !== "" ? "Name must be between 4 and 20 characters." : ""
                      }
                      id="name" name="name" type="name" required
                      className=" lg:max-w-56 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Enter your full name" />
                  </div>
                </div>

                <div>
                  <label for="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      value={email}
                      onChange={handleEmailChange}
                      error={!isValidEmail && email !== ""}
                      helperText={
                        !isValidEmail && email !== ""
                          ? "Please enter a valid email address."
                          : ""
                      }
                      id="email" name="email" type="email" autocomplete="email" required
                      className="lg:max-w-56 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Enter your email address" />
                  </div>


                </div>
                <button
                  disabled={isSignInDisabledProfile}
                  onClick={UpdateProfileSubmitHandler}
                  className="mt-4 rounded-lg disabled:bg-gray-500 bg-blue-600 px-4 py-2 text-white">Update Profile</button>
                <hr className="mt-4 mb-8" />
              </div>}

            </div>





            <hr className="mt-4 mb-8" />
            <p className="py-2 text-xl font-semibold">Password</p>
            <div className="flex items-center">
              <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
                <label for="login-password">
                  <span className="text-sm text-gray-500">Current Password</span>
                  <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                    <input
                      value={oldPassword}
                      onChange={handleOldPassword}
                      type="password" id="login-password" className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="***********" />
                  </div>
                </label>
                <label for="login-password">
                  <span className="text-sm text-gray-500">New Password</span>
                  <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                    <input
                      value={newPassword}
                      onChange={handlePasswordChange}
                      type="password" id="login-password" className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="***********" />
                  </div>
                </label>
                <label for="login-password">
                  <span className="text-sm text-gray-500">Confirm New Password</span>
                  <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                    <input
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                      type="password" id="login-password" className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="***********" />
                  </div>
                </label>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="mt-5 ml-2 h-6 w-6 cursor-pointer text-sm font-semibold text-gray-600 underline decoration-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
            </div>
            {/* <p className="mt-2">Can't remember your current password. <button onClick={handleforgotPasswordSubmit}
              className="text-sm font-semibold text-blue-600 underline decoration-2" >Recover Account</button></p> */}
            <button
              disabled={isSignInDisabled}
              onClick={updatePasswordSubmitHandler}
              className="mt-4 rounded-lg disabled:bg-gray-500 bg-blue-600 px-4 py-2 text-white">Save Password
            </button>
            <hr className="mt-4 mb-8" />

            <div className="mb-10">
              <p className="py-2 text-xl font-semibold">Logout</p>
              <button onClick={logoutHandler} className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white">Logout</button>

            </div>
          </div>
        </div>
      </div >

    </>
    // <div className="rootProfile">
    //   <div className="header-root">
    //     <Typography variant="h5" component="h1" className="headingProfile">
    //       Hi, {user.name} !
    //     </Typography>

    //     <Typography variant="body2" className="greeting">
    //       Welcome back! Happy shopping!
    //     </Typography>
    //   </div>

    //   <div className="profileConatiner">
    //     <div className="leftCotainer">
    //       <h4

    //         className="profileHeadingLeft"
    //       >
    //         Profile Overview
    //       </h4>
    //       <div className="profileSection">
    //         {/* <Avatar
    //           alt={user.name}
    //           src={user.avatar}
    //           className="profileAvatar"
    //         /> */}
    //         <div className="leftDetails">
    //           <Typography className="profileText">
    //             <h5 className="profileSubHeading">Name :</h5>
    //             {user.name}
    //           </Typography>
    //           <Typography className="profileText">
    //             <h5 className="profileSubHeading">Email : </h5>
    //             {user.email}
    //           </Typography>
    //           <Typography className="profileText">
    //             <h5 className="profileSubHeading">Member since :</h5>{" "}
    //             {/* {createdAt(user)} */}
    //           </Typography>
    //         </div>
    //       </div>

    //       <div className="myOrder">
    //         <Typography variant="h4" component="h1" className="profileHeading">
    //           Orders
    //         </Typography>
    //         <Link
    //           to="/orders"
    //           style={{ textDecoration: "none", color: "inherit" }}
    //         >
    //           <Button variant="contained" className="ordersButton">
    //             Orders
    //           </Button>
    //         </Link>
    //       </div>
    //     </div>

    //     <div className="rightConatiner">
    //       <div className="righHeadings">
    //         <Typography variant="h4" component="h1" className="profileHeading">
    //           Personal Information
    //         </Typography>
    //         <Typography className="profileText2">
    //           Hey there ! Feel free to edit any of your details below so your
    //           account is up to date.
    //         </Typography>
    //       </div>
    //       <div className="profileDetials">
    //         <div className="detials">
    //           <Typography
    //             variant="h4"
    //             component="h1"
    //             className="profileHeading"
    //           >
    //             MY DETAILS
    //           </Typography>
    //           <Typography className="profileText">{user.name}</Typography>
    //           <Typography className="profileText">USER EMAIL</Typography>
    //           <Typography className="profileText"> PHONE NUMBER</Typography>
    //           <Typography className="profileText">GENDER</Typography>
    //         </div>

    //         <Link to="/profile/update" style={{ textDecoration: "none" }}>
    //           <Button variant="contained" className="profileButton">
    //             EDIT DETAILS
    //           </Button>
    //         </Link>
    //         <div className="detials">
    //           <Typography
    //             variant="h4"
    //             component="h1"
    //             className="profileHeading"
    //             style={{ marginTop: "1.5rem" }}
    //           >
    //             LOGIN DETAILS
    //           </Typography>
    //           <Typography className="profileSubHeading">EMAIL</Typography>
    //           <Typography className="profileText">{user.email}</Typography>

    //           <Typography
    //             className="profileSubHeading"
    //             style={{ marginTop: "10px" }}
    //           >
    //             PASSWORD
    //           </Typography>
    //           <Typography className="profileSubHeading">
    //             *************
    //           </Typography>
    //         </div>
    //         <Link
    //           to="/password/update"
    //           style={{ textDecoration: "none", color: "inherit" }}
    //         >
    //           <Button variant="contained" className="profileButton">
    //             UPDATE PASSWORD
    //           </Button>
    //         </Link>

    //         <div className="mangeAccount">
    //           <Typography
    //             variant="h4"
    //             component="h1"
    //             className="profileHeading"
    //           >
    //             Log out from all devices
    //           </Typography>

    //           <p className="profileText3">
    //             To access the Cricket Weapon Store website again, you need to
    //             provide your credentials. This action will log you out from any
    //             other web browsers you have used before.
    //           </p>
    //         </div>
    //         <Button
    //           variant="contained"
    //           color="primary"
    //           className="profileButton"
    //           startIcon={<LogoutIcon />}
    //           onClick={logoutHandler}
    //         >
    //           Logout Account
    //         </Button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};
export default ProfilePage;
