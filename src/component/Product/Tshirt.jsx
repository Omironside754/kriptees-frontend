import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import { toast } from "react-toastify";
import MetaData from "../Layouts/MetaData/MetaData";
import ProductCard from "../Home/ProductCard";

import img from "../../ecommerce images/TshirtTop.png";

function Tshirt() {
  const dispatch = useDispatch();

  const {
    loading,
    error,
    products,
    filterdProductCount = 0,
  } = useSelector((state) => state.products);

  const [currentPage, setCurrentPage] = useState(1);
  const PRODUCTS_PER_PAGE = 12;

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    // Fetch T-shirt products of current page
    dispatch(getProduct("", currentPage, [0, 25000], "T-shirt"));
  }, [dispatch, error, currentPage]);

  // Pagination buttons array (max 10 pages shown)
  const getPaginationArray = () => {
    const totalPages = Math.ceil(filterdProductCount / PRODUCTS_PER_PAGE);
    return Array.from({ length: Math.min(totalPages, 10) }, (_, i) => i + 1);
  };

  return (
    <>
      <MetaData title="Kriptees" />

      <div className="Home_Page pt-14">
        {/* Top Banner */}
        <div className="w-full">
          <img src={img} alt="Banner" className="w-full h-auto" />
        </div>

        {/* Heading */}
        <div className="text-center px-4 py-8">
          <h2 className="text-5xl font-black uppercase tracking-widest mb-4">
            KRIPTEES
          </h2>
          <p className="max-w-3xl mx-auto text-gray-700 text-sm leading-relaxed tracking-widest">
            Our Special Design Range features exclusive, one-of-a-kind creations
            crafted with premium quality and unmatched attention to detail.
            Perfect for those who love standing out in style!
          </p>
        </div>

        {/* T-Shirt Products */}
        {products.length > 0 && (
          <div className="md:mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-8 p-3 md:px-8">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {products.length > 0 && (
          <div className="flex justify-center mt-6 gap-1">
            {getPaginationArray().map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`min-w-[2.5rem] h-10 border ${
                  currentPage === page
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                } rounded`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Tshirt;
