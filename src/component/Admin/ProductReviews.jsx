import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import {
  getAllreviews,
  clearErrors,
  deleteProductReview,
} from "../../actions/productAction";
import MetaData from "../Layouts/MetaData/MetaData";
import Loader from "../Layouts/loader/Loader";
import Sidebar from "./Siderbar";
import { DELETE_REVIEW_RESET } from "../../constants/productsConstants";


function ProductReviews() {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const { error, reviews, loading } = useSelector(
    (state) => state.getAllReview
  );
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deleteReview
  );

  const [productId, setProductId] = useState("");

  // togle handler =>
  const toggleHandler = () => {
    console.log("toggle");
    setToggle(!toggle);
  };

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getAllreviews(productId)); // when in input box string lenght goes ===24 then automatically search occures
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      toast.success("Review Deleted Successfully");
      // history.push("/admin/reviews");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, error,
    // alert,
    deleteError, isDeleted, productId,
    // history
  ]);

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

  // delet review from given prodcuts reviews =>
  const deleteReviewHandler = (reviewId) => {

    dispatch(deleteProductReview(reviewId, productId));
  };

  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllreviews(productId)); // get this product reviews
  };
  const columns = [
    {
      field: "id",
      headerName: "Review ID",
      minWidth: 230,
      flex: 0.5,
      headerClassName: "column-header",
    },
    {
      field: "user",
      headerName: "User",
      flex: 0.8,
      magin: "0 auto",
      headerClassName: "column-header hide-on-mobile",
    },

    {
      field: "comment",
      headerName: "Comment",
      minWidth: 350,
      flex: 0.8,
    },
    {
      field: "recommend",
      headerName: "Recommend",
      minWidth: 100,
      flex: 1,
      headerClassName: "column-header hide-on-mobile",

    },

    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 200,
      flex: 0.5,
      headerClassName: "column-header hide-on-mobile",
    },

    {
      field: "actions",
      flex: 1,
      headerName: "Actions",
      minWidth: 230,
      headerClassName: "column-header1",
      sortable: false,
    }
  ];

  const rows = [];

  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        user: item.name,
        comment: item.comment,
        rating: item.ratings,
        recommend: item.recommend ? "Yes" : "No",
      });
    });

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="All Reviews" />

          <div className="flex  ">
            <div
            >
              <Sidebar />
            </div>

            <div className=" w-full flex-col justify-center" >

              <div className=" m-16 ">
                <form
                  className=""
                  onSubmit={productReviewsSubmitHandler}
                >
                  <div
                    className=" flex flex-col  m-4 font-semibold text-xl">
                    All Reviews
                  </ div>

                  <div>Enter Product ID:</div>

                  < input
                    label="Product Id"
                    required
                    className=" rounded-md m-2"
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                  />

                  <button
                    className=" rounded-md bg-blue-400 hover:bg-blue-500 p-2 text-white font-semibold w-24 self-center"
                    id="createProductBtn"
                    type="submit"
                    disabled={
                      loading ? true : false || productId === "" ? true : false
                    }
                  >
                    Search
                  </button>
                </form>

                {reviews && reviews.length > 0 ? (
                  <div >


                    <div className="  ">
                      <div className=" ">
                        <div class="relative overflow-x-auto m-16 rounded-lg shadow-lg">
                          <h4 id="productListHeading">Product Reviews:</h4>

                          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">

                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                              <tr>
                                <th scope="col" class="px-6 py-3">
                                  Product ID
                                </th>
                                <th scope="col" class="px-6 py-3">
                                  User
                                </th>
                                <th scope="col" class="px-6 py-3">
                                  Comment
                                </th>
                                <th scope="col" class="px-6 py-3">
                                  Recommend
                                </th>
                                <th scope="col" class="px-6 py-3">
                                  Rating
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
                                    {item.user}

                                  </td>
                                  <td class="px-6 py-4">
                                    {item.comment}

                                  </td>
                                  <td class="px-6 py-4">
                                    {item.recommend}
                                  </td>
                                  <td class="px-6 py-4">
                                    {item.rating}
                                  </td>
                                  <td class="px-6 py-4">

                                    <button
                                      onClick={() =>
                                        deleteProductReview(item.id)
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
                ) : (
                  <h1 >No Reviews Found</h1>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ProductReviews;
