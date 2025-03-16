import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import { toast } from "react-toastify";
import MetaData from "../Layouts/MetaData/MetaData";
import ProductCard from "../Home/ProductCard";

import img from "../../ecommerce images/TshirtTop.png";

function Tshirt() {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    // Pass the category "T-shirt" to filter API results.
    dispatch(getProduct("", 1, [0, 25000], "T-shirt"));
  }, [dispatch, error]);

  // Now products should only contain T-shirt products
  console.log("TshirtProducts", products);

  return (
    <>
      <MetaData title="Kriptees" />
      {/* 
        1) Add top padding (pt-20) so the banner image 
        won't be hidden behind the fixed header 
      */}
      <div className="Home_Page pt-20">
        {/* 1) Top Banner */}
        <div className="w-full">
          <img src={img} alt="Banner" className="w-full h-auto" />
        </div>

        {/* 2) Heading & Subtext below banner */}
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

        {/* 3) T-Shirt Products */}
        {products.length > 0 && (
          <div
            className="
               md:mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-8 p-3 md:px-8
            "
          >
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Tshirt;
