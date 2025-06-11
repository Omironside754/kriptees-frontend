import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  getAdminProducts,
  deleteProduct,
} from "../../actions/productAction";
import {
  Link, useNavigate,
} from "react-router-dom";
import MetaData from "../Layouts/MetaData/MetaData";
import Sidebar from "./Siderbar";
import { DELETE_PRODUCT_RESET } from "../../constants/productsConstants";
import Loader from "../Layouts/loader/Loader";
import { toast } from 'react-toastify';

function ProductList() {
  const dispatch = useDispatch();
  // const alert = useAlert();
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);

  const { error, products, loading } = useSelector((state) => state.products);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deleteUpdateProduct
  );
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
      toast.success("Product Deleted Successfully");

      dispatch({ type: DELETE_PRODUCT_RESET });
    }
    dispatch(getAdminProducts());
  }, [dispatch, error,
    // alert,
    deleteError,
    navigate,
    isDeleted]);

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };




  const rows = [];

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.Stock,
        price: item.price,
        name: item.name,
        image: item.images && item.images.length > 0 ? item.images[0].url : '',
      });
    });

  // togle handler =>
  const toggleHandler = () => {

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


  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`ALL PRODUCTS - Admin`} />

          <div className=" flex" >
            <div className="">
              <Sidebar />
            </div>

            <div className=" bg-gray-200 w-full h-screen">
              <div className=" ">
                <h4 className=" flex  m-4 font-semibold text-xl">ALL PRODUCTS</h4>

                <div class="relative overflow-x-auto m-16 rounded-lg shadow-lg">
                  <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">

                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" class="px-6 py-3">
                          Product ID
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Name
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Preview
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Stock
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Price
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
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-12 h-12 object-cover rounded border"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://via.placeholder.com/50x50?text=No+Image";
                              }}
                            />
                          </td>
                          <td class="px-6 py-4">
                            {item.stock}

                          </td>
                          <td class="px-6 py-4">
                            ₹{item.price}
                          </td>
                          <td class="px-6 py-4">

                            <Link to={`/admin/product/${item.id}`}>
                              <button className="mx-1 px-2 bg-gray-200 text-black rounded-md">
                                Edit
                              </button>
                            </Link>
                            <Link to={`/product/${item.id}`}>
                              <button className="mx-1 px-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                                View
                              </button>
                            </Link>
                            <button
                              onClick={() => deleteProductHandler(item.id)}
                              className="mx-1 px-2 bg-red-500 text-white rounded-md"
                            >
                              Delete
                            </button>


                          </td>

                        </tr>

                      ))}

                    </tbody>
                  </table>
                </div>



                {/* <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={10}
                  disableSelectionOnClick
                  className="productListTable"
                  autoHeight
                /> */}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ProductList;
