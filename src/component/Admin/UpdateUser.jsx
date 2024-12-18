// import { toast } from 'react-toastify';
// import { useSelector, useDispatch } from "react-redux";
// import MetaData from "../Layouts/MetaData/MetaData";
// import Sidebar from "./Siderbar";
// import { UPDATE_USER_RESET } from "../../constants/userConstant";
// import {
//   getUserDetails,
//   updateUser,
//   clearErrors,
// } from "../../actions/userAction";
// import Loader from "../Layouts/loader/Loader";
// import { useNavigate, useParams } from "react-router-dom";

function UpdateUser() {
  // const dispatch = useDispatch();
  // const { id } = useParams();
  // const userId = id;
  // const navigate = useNavigate();
  // const classes = useStyles;
  // const { loading, error, user } = useSelector((state) => state.userDetails);
  // const { loading: updateLoading, error: updateError, isUpdated } = useSelector(
  //   (state) => state.profileData
  // );

  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [role, setRole] = useState("");
  // const [toggle, setToggle] = useState(false);
  // // togle handler =>
  // const toggleHandler = () => {
  //   console.log("toggle");
  //   setToggle(!toggle);
  // };

  // useEffect(() => {
  //   // initial value user Details  getting initially user._id will be undefind then call will occures  g(etUserDetails(id)
  //   if (user && user._id !== userId) {
  //     dispatch(getUserDetails(userId));
  //   } else {
  //     setName(user.name);
  //     setEmail(user.email);
  //     setRole(user.role);
  //   }

  //   if (error) {
  //     toast.error(error);
  //     dispatch(clearErrors());
  //   }

  //   if (updateError) {
  //     toast.error(updateError);
  //     dispatch(clearErrors());
  //   }

  //   if (isUpdated) {
  //     toast.success("User Updated Successfully");
  //     navigate("/admin/users");
  //     dispatch({ type: UPDATE_USER_RESET });
  //   }
  // }, [dispatch, alert,
  //   error,
  //   navigate,
  //   isUpdated, updateError, user, userId]);

  // const updateUserSubmitHandler = (e) => {
  //   e.preventDefault();
  //   const myForm = new FormData();
  //   myForm.set("name", name);
  //   myForm.set("email", email);
  //   myForm.set("role", role);
  //   dispatch(updateUser(userId, myForm));
  // };

  return (
    <>
      {/* {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Update User" />
          <div style={classes.updateUser1}>
            <div
              style={
                !toggle ? classes.firstBox_01 : classes.toggleBox_01
              }
            >
              <Sidebar />
            </div>

            <div style={classes.secondBox_01}>

              <div style={classes.formSection}>
                <form
                  style={classes.form}
                  onSubmit={updateUserSubmitHandler}
                >
                  <Avatar style={classes.avatar}>
                    <AccountCircleIcon />
                  </Avatar>
                  <Typography
                    variant="h5"
                    component="h1"
                    style={classes.heading}
                  >
                    Update Role
                  </Typography>

                  <TextField
                    variant="outlined"
                    fullWidth
                    style={{
                      position: "relative",
                      "& > label": {
                        left: ".2rem",
                      },
                      padding: "4px 0px",
                      fontSize: "1rem",
                      width: "100%",
                      marginBottom: "5.5rem",
                      height: ".7rem",

                      marginBottom: "2rem",
                      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
                        color: "black",
                        padding: "12px 14px",
                      },
                      "& .MuiInputLabel-root": {
                        color: "black",
                        fontSize: "14px",
                        textAlign: "center",
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "black",
                        fontSize: "14px",
                        textAlign: "center",
                      },
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": {
                          borderColor: "black",
                          color: "black",
                        },
                        "& .MuiOutlinedInput-input": {
                          padding: "13px 8px",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "black",
                          color: "black",
                          outline: "none",
                        },
                      },
                    }}
                    label="User Name"
                    required
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value)
                    }
                    }
                  />

                  <TextField
                    variant="outlined"
                    fullWidth
                    style={{
                      position: "relative",
                      "& > label": {
                        left: ".2rem",
                      },
                      padding: "4px 0px",
                      fontSize: "1rem",
                      width: "100%",
                      marginBottom: "5.5rem",
                      height: ".7rem",

                      marginBottom: "2rem",
                      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
                        color: "black",
                        padding: "12px 14px",
                      },
                      "& .MuiInputLabel-root": {
                        color: "black",
                        fontSize: "14px",
                        textAlign: "center",
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "black",
                        fontSize: "14px",
                        textAlign: "center",
                      },
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": {
                          borderColor: "black",
                          color: "black",
                        },
                        "& .MuiOutlinedInput-input": {
                          padding: "13px 8px",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "black",
                          color: "black",
                          outline: "none",
                        },
                      },
                    }}
                    label="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <MailOutlineIcon
                            style={{
                              fontSize: 20,
                              color: "#414141",
                            }}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <div style={{ position: "relative" }}>
                    <label
                      htmlFor="role_field"
                      style={{
                        marginLeft: "10px",
                        fontSize: "12px",
                        width: "300px",
                        color: "#414141",
                      }}
                    >
                      Role*
                    </label>
                    <Select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      style={classes.select}
                      MenuProps={{
                        classes: { paper: classes.selectMenuPaper }, // Update the class name here
                        anchorOrigin: {
                          vertical: "bottom",
                          horizontal: "left",
                        },
                        getContentAnchorEl: null,
                      }}
                    >
                      <MenuItem value="">
                        <em style={{ background: "inherit", color: "#414141" }}>
                          Choose Role
                        </em>
                      </MenuItem>
                      <MenuItem value="admin">Admin</MenuItem>
                      <MenuItem value="user">User</MenuItem>
                    </Select>
                  </div>

                  <Button
                    id="createProductBtn"
                    type="submit"
                    fullWidth
                    variant="contained"
                    style={classes.loginButton}
                    disabled={
                      updateLoading ? true : false || role === "" ? true : false
                    }
                  >
                    Update
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </>
      )} */}
    </>
  );
}

export default UpdateUser;


