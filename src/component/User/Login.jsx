import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { login, clearErrors } from "../../actions/userAction";
import CricketBallLoader from "../Layouts/loader/Loader";
import { Link } from "react-router-dom";
import MetaData from "../Layouts/MetaData/MetaData";
import { toast } from 'react-toastify';

function Login() {

    const navigate = useNavigate();

    const location = useLocation();

    const dispatch = useDispatch();
    // const alert = useAlert();

    const { isAuthenticated, loading, error } = useSelector(
        (state) => state.userData
    );

    // const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(true);

    const handleEmailChange = (event) => {
        const newEmail = event.target.value;
        setEmail(newEmail);
        setIsValidEmail(
            newEmail !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)
        );
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleShowPasswordClick = () => {
        setShowPassword(!showPassword);
    };


    const isSignInDisabled = !(email && password && isValidEmail);


    const redirect = location.search
        ? location.search.split("=")[1]
        : "/";
    useEffect(() => {
        if (error) {
            if (isAuthenticated)
                toast.error(error);
            dispatch(clearErrors());
        }

        if (isAuthenticated) {
            navigate(redirect);
        }
    }, [dispatch, isAuthenticated, loading, error, alert,
        navigate,
        redirect
    ]);

    function handleLoginSubmit(e) {
        e.preventDefault();
        dispatch(login(email, password));
    }


    return (
        <>
            <MetaData title={"Login"} />
            {loading ? (
                <CricketBallLoader />
            ) : (

                <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-md">
                        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
                            Sign in to your account
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-600 max-w">
                            <Link to={"/signup"} href="#" className="font-medium text-blue-600 hover:text-blue-500">
                                create an account
                            </Link>
                        </p>
                    </div>

                    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                            <form className="space-y-6" action="#" method="POST">
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
                                            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                            placeholder="Enter your email address" />
                                    </div>
                                </div>

                                <div>
                                    <label for="password" className="block text-sm font-medium text-gray-700">
                                        Password
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            value={password}
                                            onChange={handlePasswordChange}
                                            id="password" name="password" type="password" autocomplete="current-password" required
                                            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                            placeholder="Enter your password" />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input id="remember_me" name="remember_me" type="checkbox"
                                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                                        <label for="remember_me" className="ml-2 block text-sm text-gray-900">
                                            Remember me
                                        </label>
                                    </div>

                                    <div className="text-sm">
                                        <Link
                                            to="/password/forgot" className="font-medium text-blue-600 hover:text-blue-500">
                                            Forgot your password?
                                        </Link>
                                    </div>
                                </div>

                                <div>
                                    <button type="submit"
                                        disabled={isSignInDisabled}
                                        onClick={handleLoginSubmit}
                                        className="group disabled:bg-zinc-500 relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                        Sign in
                                    </button>
                                </div>
                            </form>
                            {/* <div className="mt-6">

                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-300"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-2 bg-gray-100 text-gray-500">
                                            Or continue with
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-6 grid grid-cols-3 gap-3">
                                    <div>
                                        <a href="#"
                                            className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                                            <img className="h-5 w-5" src="https://www.svgrepo.com/show/512120/facebook-176.svg"
                                                alt=""/>
                                        </a>
                                    </div>
                                    <div>
                                        <a href="#"
                                            className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                                            <img className="h-5 w-5" src="https://www.svgrepo.com/show/513008/twitter-154.svg"
                                                alt=""/>
                                        </a>
                                    </div>
                                    <div>
                                        <a href="#"
                                            className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                                            <img className="h-6 w-6" src="https://www.svgrepo.com/show/506498/google.svg"
                                                alt=""/>
                                        </a>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>

                // <div className="formContainer">
                //     <form className="form">
                //         <Avatar className="avatar">
                //             <LockOpen />
                //         </Avatar>
                //         <Typography variant="h5" component="h1" style={{
                //             textAlign: "center",
                //             marginBottom: "50px",
                //             color: "#414141",
                //             fontWeight: "bold",
                //         }} >
                //             Sign in to Your Account
                //         </Typography>

                //         <TextField
                //             label="Email"
                //             variant="outlined"
                //             fullWidth
                //             className="emailInput textField"
                //             value={email}
                //             onChange={handleEmailChange}
                //             error={!isValidEmail && email !== ""}
                //             helperText={
                //                 !isValidEmail && email !== ""
                //                     ? "Please enter a valid email address."
                //                     : ""
                //             }
                //         />


                //         <TextField
                //             label="Password"
                //             variant="outlined"
                //             type={showPassword ? "text" : "password"}
                //             fullWidth
                //             className="passwordInput textField"
                //             InputProps={{
                //                 endAdornment: (
                //                     <Button
                //                         variant="outlined"
                //                         className="showPasswordButton"
                //                         onClick={handleShowPasswordClick}
                //                     >
                //                         {showPassword ? <VisibilityOff color="disabled" /> : <Visibility color="primary" />}
                //                     </Button>
                //                 ),
                //             }}
                //             value={password}
                //             onChange={handlePasswordChange}
                //         />

                //         <Grid container className="rememberMeContainer">
                //             <Grid item>
                //                 <FormControlLabel
                //                     control={<Checkbox color="primary" />}
                //                     label="Remember me"
                //                 />
                //             </Grid>
                //             <Grid item>
                //                 <Link
                //                     to="/password/forgot"
                //                     className="forgotPasswordLink"
                //                 >
                //                     Forgot your password?
                //                 </Link>
                //             </Grid>
                //         </Grid>

                //         <Typography
                //             variant="body2"
                //             className="termsAndConditionsText"
                //         >
                //             I accept the terms and conditions
                //             <Link to="/policy/privacy" className="privacyText">
                //                 Privacy Policy.
                //             </Link>
                //         </Typography>

                //         <Button
                //             variant="contained"
                //             className="loginButton"
                //             fullWidth
                //             disabled={isSignInDisabled}
                //             onClick={handleLoginSubmit}
                //         >
                //             Sign in
                //         </Button>

                //         <Typography
                //             variant="body1"
                //             align="center"
                //             style={{ marginTop: "1rem" }}
                //         >
                //             Don't have an account?
                //             <Link to="/signup" className="createAccount">
                //                 Create Account
                //             </Link>
                //         </Typography>
                //     </form>
                // </div>
            )}
        </>
    )
}

export default Login;