import React, { useState, useEffect } from "react";
// import CricketBallLoader from "../Layouts/loader/Loader";
// import MetaData from "../Layouts/MetaData/MetaData";
import { Link, useNavigate } from "react-router-dom";
import { signUp, clearErrors } from "../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';

function SignUp() {

    // const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidName, setIsValidName] = useState(true);
    const [isValidPassword, setIsValidPassword] = useState(true);
    const [loading, setLoading] = useState(false);

    const [areCheckboxesChecked, setAreCheckboxesChecked] = useState({
        checkbox1: false,
        checkbox2: false,
    });
    const navigate = useNavigate();

    const dispatch = useDispatch();
    // const alert = useAlert();

    const { isAuthenticated, error } = useSelector((state) => state.userData);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (isAuthenticated) {
            toast.success("User Registered Successfully");
            console.log("User Registered Successfully")
            navigate("/");
        }
    }, [dispatch, isAuthenticated, loading, error,
        // alert, 
        navigate
    ]);

    const handleEmailChange = (event) => {
        const newEmail = event.target.value;
        setEmail(newEmail);
        setIsValidEmail(
            newEmail !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)
        );
    };

    const handleNameChange = (event) => {
        const newName = event.target.value;
        setName(newName);
        setIsValidName(newName.length >= 4 && newName.length <= 20);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setIsValidPassword(event.target.value.length >= 8);
    };
    const handleConfirmPasswordChange = (event) => {
        setconfirmPassword(event.target.value);
    };

    const handleShowPasswordClick = () => {
        setShowPassword(!showPassword);
    };

    const handleCheckboxChange = (checkboxName) => (event) => {
        setAreCheckboxesChecked((prevState) => ({
            ...prevState,
            [checkboxName]: event.target.checked,
        }));
    };

    let isSignInDisabled = !(
        email &&
        password &&
        isValidEmail &&
        confirmPassword &&
        name &&
        isValidName 
        // areCheckboxesChecked.checkbox1 &&
        // areCheckboxesChecked.checkbox2
    );

    function handleSignUpSubmit(e) {
        setLoading(true);
        e.preventDefault();


        if (password !== confirmPassword) {
            toast.error("Password and Confirm Password do not match");
            setLoading(false);
            return;
        }

        const formData = new FormData();
        formData.set("name", name);
        formData.set("email", email);
        formData.set("password", password);

        dispatch(signUp(formData));
        setLoading(false);

    }
    return (
        <>
            <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
                        Create an Account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600 max-w">
                        <Link to={"/login"} href="#" className="font-medium text-blue-600 hover:text-blue-500">
                            Login if already created
                        </Link>
                    </p>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form className="space-y-6" action="#" method="POST">

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
                                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
                                        error={!isValidPassword && password !== ""}
                                        helperText={!isValidPassword && password !== "" ? "Password must be at least 8 characters." : ""}
                                        value={password}
                                        onChange={handlePasswordChange}
                                        id="password" name="password" type="password" autocomplete="current-password" required
                                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="Enter your password" />
                                </div>
                            </div>

                            <div>
                                <label for="password" className="block text-sm font-medium text-gray-700">
                                    Confirm Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        value={confirmPassword}
                                        onChange={handleConfirmPasswordChange}
                                        id="cnfpassword" name="cnfpassword" type="password" autocomplete="current-password" required
                                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="Enter your password" />
                                </div>
                            </div>


                            <div>
                                <button type="submit"
                                    onClick={handleSignUpSubmit}
                                    disabled={isSignInDisabled}
                                    className="group disabled:bg-zinc-500 relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    Create Account
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* <div className="formContainer">
                <form className="form">
                    <Avatar className="avatar">
                        <LockOutlined />
                    </Avatar>
                    <Typography variant="h5" component="h1" style={{
                        textAlign: "center",
                        marginBottom: "50px",
                        color: "#414141",
                        fontWeight: "bold",
                    }} >
                        Sign Up for an Account
                    </Typography>
                    <TextField
                        label="Name"
                        variant="outlined"
                        fullWidth
                        className="nameInput textField"
                        value={name}
                        onChange={handleNameChange}
                        error={!isValidName && name !== ""}
                        helperText={
                            !isValidName && name !== "" ? "Name must be between 4 and 20 characters." : ""
                        }
                    />

                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        className="emailInput textField"
                        value={email}
                        onChange={handleEmailChange}
                        error={!isValidEmail && email !== ""}
                        helperText={
                            !isValidEmail && email !== ""
                                ? "Please enter a valid email address."
                                : ""
                        }
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        type={showPassword ? "text" : "password"}
                        fullWidth
                        className="passwordInput textField"
                        error={!isValidPassword && password !== ""}
                        helperText={!isValidPassword && password !== "" ? "Password must be at least 8 characters." : ""}

                        value={password}
                        onChange={handlePasswordChange}


                                                InputProps={{
                            endAdornment: (
                                <Button
                                    variant="outlined"
                                    className="showPasswordButton"
                                    onClick={handleShowPasswordClick}
                                >
                                    {showPassword ? <VisibilityOff color="disabled" /> : <Visibility color="primary" />}
                                </Button>
                            ),
                        }}
                    />
                    <TextField
                        label="Confirm Password"
                        variant="outlined"
                        type={showPassword ? "text" : "password"}
                        fullWidth
                        className="passwordInput textField"
                        InputProps={{
                            endAdornment: (
                                <Button
                                    variant="outlined"
                                    className="showPasswordButton"
                                    onClick={handleShowPasswordClick}
                                >
                                    {showPassword ? <VisibilityOff color="disabled" /> : <Visibility color="primary" />}
                                </Button>
                            ),
                        }}
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                    />

                    <Grid
                        container
                        className="gridcheckbox"
                        justify="flex-start"
                        alignItems="center"
                    >
                        <Grid item>
                            <FormControlLabel
                                control={<Checkbox />}
                                label="I Accept The Kriptees Terms & Conditions"
                                className="checkbox"
                                checked={areCheckboxesChecked.checkbox1}
                                onChange={handleCheckboxChange("checkbox1")}
                            />
                        </Grid>
                        <Grid item>
                            <FormControlLabel
                                control={<Checkbox />}
                                label="I Accept The Kriptees Terms Of Use"
                                className="checkbox"
                                checked={areCheckboxesChecked.checkbox2}
                                onChange={handleCheckboxChange("checkbox2")}
                            />
                        </Grid>
                    </Grid>

                    <Typography
                        variant="body2"
                        className="termsAndConditionsText"
                    >
                        I acknowledge the use of my information in accordance
                        with its
                        <Link href="#" className="privacyText">
                            Privacy Policy.
                        </Link>
                    </Typography>

                    <Button
                        variant="contained"
                        className="loginButton"
                        fullWidth
                        onClick={handleSignUpSubmit}
                        disabled={isSignInDisabled || loading}
                    >
                        Create Account
                    </Button>

                    <Typography
                        variant="body1"
                        align="center"
                        style={{ marginTop: "1rem" }}
                    >
                        Already have an account?
                        <Link to="/login" className="createAccount">
                            Login
                        </Link>
                    </Typography>
                </form>
            </div> */}
        </>
    )
}
export default SignUp;