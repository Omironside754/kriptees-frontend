import React from "react";
import {
  Link,
  useNavigate
} from "react-router-dom";
import { useSelector } from "react-redux";

function Sidebar() {
  const { user, loading } = useSelector((state) => state.userData);
  const navigate = useNavigate();

  function accountHandler() {
    navigate("/account");
  }

  return (
    <>
      {!loading && (
        <>
          <div className="  shadow-xl p-4 space-y-8 h-screen ">
            <div className=" bg-gray-500 rounded-lg text-white p-4 ">
              < p className="">
                {user && user.name}
              </ p>
              < p className="">
                {user && user.email}
              </ p>
            </div>

            <div className="" />

            <ul className=" space-x-8">
              <Link
                to="/admin/dashboard"
                className={{ color: "inherit", textDecoration: "none" }}
              >
                <li className=" bg-sky-400 p-2 rounded-md hover:bg-sky-500 font-semibold text-white ">
                  <span className="">
                    Dashboard
                  </span>
                </li>
              </Link>

              <Link to="/" >
                <li className=" bg-sky-400 p-2 rounded-md hover:bg-sky-500 font-semibold text-white ">
                  <span >Home</span>
                </li>
              </Link>

              <Link
                to="/admin/products"

              >
                <li className=" bg-sky-400 p-2 rounded-md hover:bg-sky-500 font-semibold text-white ">
                  <span >
                    Products
                  </span>
                </li>
              </Link>
              <Link
                to="/admin/new/product"
              >
                <li className=" bg-sky-400 p-2 rounded-md hover:bg-sky-500 font-semibold text-white ">
                  <span >
                    Add Product
                  </span>
                </li>
              </Link>

              <Link
                to="/admin/orders"
              >
                <li className=" bg-sky-400 p-2 rounded-md hover:bg-sky-500 font-semibold text-white ">
                  <span>Orders</span>
                </li>
              </Link>
              <Link
                to="/admin/reviews"
              >
                <li className=" bg-sky-400 p-2 rounded-md hover:bg-sky-500 font-semibold text-white ">
                  <span >Reviews</span>
                </li>
              </Link>

              <Link
                to="/ContactUs"
              >
                <li className=" bg-sky-400 p-2 rounded-md hover:bg-sky-500 font-semibold text-white ">
                  <span >Contact</span>
                </li>
              </Link>
            </ul>
            <div className="" />
            <button
              className=" bg-blue-400 w-full p-2 rounded-md text-white"
              onClick={accountHandler}
              variant="contained"
            >
              Account
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default Sidebar;
