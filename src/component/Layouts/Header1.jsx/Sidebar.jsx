// import React from "react";
// // import { logout } from "../../../actions/userAction";
// import { Link } from "react-router-dom";
// // import { useDispatch } from "react-redux";
// import { toast } from 'react-toastify';
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import HomeIcon from "@mui/icons-material/Home";
// import InfoIcon from "@mui/icons-material/Info";
// import ExitToAppIcon from "@mui/icons-material/ExitToApp";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import CloseIcon from "@mui/icons-material/Close";
// import Inventory2Icon from "@mui/icons-material/Inventory2";
// import ContactPageIcon from "@mui/icons-material/ContactPage";
// import LoginIcon from "@mui/icons-material/Login";
// import "./SideBar.css";

// const Sidebar = ({ handleSideBarMenu, isAuthenticated, user }) => {
//   // const dispatch = useDispatch();
//   // const alert = useAlert();

//   const logOutHandler = () => {
//     // dispatch(logout());
//     alert.success("Logout Successfully");
//   };

//   return (
//     <div className="sidebar-container">
//       <button className="sidebar-close-btn" onClick={handleSideBarMenu}>
//         <CloseIcon />
//       </button>
//       <ul className="sidebar-menu">
//         {isAuthenticated && user.role === "admin" && (
//           <Link
//             to="/admin/dashboard"
//             style={{ color: "inherit", textDecoration: "none" }}
//           >
//             <li className="sidebar-menu-item">
//               <DashboardIcon fontSize="large" />
//               <span className="sidebar-menu-item-text">Dashboard</span>
//             </li>
//           </Link>
//         )}
//         <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
//           <li className="sidebar-menu-item">
//             <HomeIcon fontSize="large" />
//             <span className="sidebar-menu-item-text">Home</span>
//           </li>
//         </Link>
//         <Link
//           to="/products"
//           style={{ color: "inherit", textDecoration: "none" }}
//         >
//           <li className="sidebar-menu-item">
//             <Inventory2Icon fontSize="large" />
//             <span className="sidebar-menu-item-text">Products</span>
//           </li>
//         </Link>
//         <Link
//           to="/contact"
//           style={{ color: "inherit", textDecoration: "none" }}
//         >
//           <li className="sidebar-menu-item">
//             <ContactPageIcon fontSize="large" />
//             <span className="sidebar-menu-item-text">Contact</span>
//           </li>
//         </Link>
//         <Link
//           to="/about_us"
//           style={{ color: "inherit", textDecoration: "none" }}
//         >
//           <li className="sidebar-menu-item">
//             <InfoIcon fontSize="large" />
//             <span className="sidebar-menu-item-text">About Us</span>
//           </li>
//         </Link>
//         <Link
//           to="/account"
//           style={{ color: "inherit", textDecoration: "none" }}
//         >
//           <li className="sidebar-menu-item">
//             <AccountCircleIcon fontSize="large" />
//             <span className="sidebar-menu-item-text">Account</span>
//           </li>
//         </Link>

//         {isAuthenticated ? (
//           <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
//             <li className="sidebar-menu-item" onClick={logOutHandler}>
//             <ExitToAppIcon fontSize="large" />
//             <span className="sidebar-menu-item-text">Logout</span>
//           </li>
//           </Link>
//         ) : (
//           <Link
//             to="/login"
//             style={{ color: "inherit", textDecoration: "none" }}
//           >
//             <li
//               className="sidebar-menu-item"
//               style={{ textDecorationLine: "none", textDecoration: "none" }}
//             >
//               <LoginIcon fontSize="large" />
//               <span className="sidebar-menu-item-text">Login</span>
//             </li>
//           </Link>
//         )}
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;
