import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {  useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import MetaData from "../Layouts/MetaData/MetaData";
import Sidebar from "./Siderbar";
import Loader from "../Layouts/loader/Loader";
import { getAllUsers, clearErrors, deleteUser } from "../../actions/userAction";
import { DELETE_USER_RESET } from "../../constants/userConstant";
// import { useHistory } from "react-router-dom";

function UserList() {
  const dispatch = useDispatch();
  const { error, users, loading } = useSelector((state) => state.allUsers);
  const { error: deleteError, isDeleted, message } = useSelector(
    (state) => state.profileData
  );
  const { id } = useParams();
  // const alert = useAlert();
  // const history = useHistory();
  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success(message);
      // history.push("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers());
  }, [dispatch,
    // alert,
    error, deleteError,
    // history,
    isDeleted, message]);

  // Datagrid  values  and schema


  const rows = [];

  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
      });
    });

  // togle handler =>
  const toggleHandler = () => {
    console.log("toggle");
    setToggle(!toggle);
  };

  // to close the sidebar when the screen size is greater than 1000px
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 999 && toggle) {
        setToggle(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [toggle]);

  console.log(rows)

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`ALL Users - Admin`} />

          <div className=" flex h-full">
            <div >
              <Sidebar />
            </div>

            <div className="">
              <div className="">
                <h4 >ALL USERS</h4>
                <div className=" ">
                  <div className=" ">
                    <div class="relative overflow-x-auto m-16 rounded-lg shadow-lg">
                      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">

                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                            <th scope="col" class="px-6 py-3">
                              ID
                            </th>
                            <th scope="col" class="px-6 py-3">
                              Name
                            </th>
                            <th scope="col" class="px-6 py-3">
                              Email
                            </th>
                            <th scope="col" class="px-6 py-3">
                              Role
                            </th>
                            <th scope="col" class="px-6 py-3">
                              Actions
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {rows.map((item) => (
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {item.id}
                              </th>
                              <td class="px-6 py-4">
                                {item.name}

                              </td>
                              <td class="px-6 py-4">
                                {item.email}

                              </td>
                              <td class="px-6 py-4">
                                {item.role}
                              </td>
                              <td class="px-6 py-4">

                                <button
                                  onClick={() =>
                                    deleteUserHandler(item.id)
                                  }
                                  className=" mx-1 px-1 bg-red-500 text-white rounded-md">

                                  Delete

                                </button>

                              </td>
                            </tr>

                          ))}

                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default UserList;
