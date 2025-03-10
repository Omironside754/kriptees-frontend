import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearErrors, getProduct } from "../../actions/productAction";
import { toast } from "react-toastify";
import MetaData from "../Layouts/MetaData/MetaData";
import ProductCard from "./ProductCard";
import "./Home.css";

import img from "../../ecommerce images/banner.png";
import image from "../../ecommerce images/downimg.png";
import midimage from "../../ecommerce images/midimg.png";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, products } = useSelector((state) => state.products);

  // Fetch products on mount
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error]);

  // Filter products for Top Picks (if any tag includes "new" or "arriv")
  const topPicks = products.filter(
    (p) =>
      p.tags &&
      p.tags.some((tag) => {
        const lowerTag = tag.toLowerCase();
        return lowerTag.includes("new") || lowerTag.includes("arriv");
      })
  );

  // Filter by categories
  const Tshirt = products.filter((p) => p.category === "T-shirt");
  const hoodies = products.filter((p) => p.category === "Hoodie");

  return (
    <>
      <MetaData title="Kriptees" />
      <div className="Home_Page">
        {/* 1) Top Banner */}
        <div className="w-full">
          <img src={img} alt="Banner" className="w-full h-auto" />
        </div>

        {/* 2) Scrolling Marquee */}
        <div className="marquee-container bg-black text-white py-1 text-[1.2rem] uppercase tracking-widest">
          <div className="marquee-content">
            <div className="marquee-group px-4">
              NEW ARRIVALS EVERY MONTH! &nbsp; NEW ARRIVALS EVERY MONTH! &nbsp;
              NEW ARRIVALS EVERY MONTH! &nbsp; NEW ARRIVALS EVERY MONTH! &nbsp;
            </div>
            <div className="marquee-group px-4">
              NEW ARRIVALS EVERY MONTH! &nbsp; NEW ARRIVALS EVERY MONTH! &nbsp;
              NEW ARRIVALS EVERY MONTH! &nbsp; NEW ARRIVALS EVERY MONTH! &nbsp;
            </div>
          </div>
        </div>

        {/* === SECTION 1: Top Picks === */}
        {topPicks.length > 0 && (
          <>
            <h2 className="text-6xl font-black uppercase tracking-widest m-8 px-10 py-4">
              TOP PICKS
            </h2>
            <div className="mt-6 flex flex-wrap justify-center gap-8 max-w-full-xl mx-auto px-4">
              {topPicks.slice(0, 8).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <button
                onClick={() => navigate("/NewArrival")}
                className="bg-white text-black px-6 py-3 uppercase font-bold tracking-widest border border-gray-950 rounded-lg hover:bg-gray-400 transition-colors"
              >
                View More
              </button>
            </div>
          </>
        )}
        <div className="w-full mt-8">
          <img src={midimage} alt="Banner" className="w-full h-auto" />
        </div>
        {/* === SECTION 2: T-Shirt (Only 4 Items) === */}
        {Tshirt.length > 0 && (
          <>
            <h2 className="text-6xl font-black uppercase tracking-widest m-8 px-10 py-4">
              T-SHIRT
            </h2>
            <div className="mt-6 flex flex-wrap justify-center gap-8 max-w-full-xl mx-auto px-4">
              {Tshirt.slice(0, 4).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            {/* Down Arrow Circle Button */}
            <div className="flex justify-center mt-8">
              <button
                onClick={() => navigate("/Tshirt")}
                className="p-2 rounded-full border border-black hover:bg-gray-300 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1}   
                >
                  {/* Arrow Down (bigger path) */}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 8l8 8 8-8"
                  />
                </svg>
              </button>
            </div>

          </>
        )}

        {/* === SECTION 3: Hoodies === */}
        {hoodies.length > 0 && (
          <>
            <h2 className="text-6xl font-black uppercase tracking-widest m-8 px-10 py-4">
              HOODIES
            </h2>
            <div className="mt-6 flex flex-wrap justify-center gap-8 max-w-full-xl mx-auto px-4">
              {hoodies.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
            {/* Down Arrow Circle Button */}
            <div className="flex justify-center mt-8">
              <button
                onClick={() => navigate("/Hoodies")}
                className="p-2 rounded-full border border-black hover:bg-gray-300 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1}   
                >
                  {/* Arrow Down (bigger path) */}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 8l8 8 8-8"
                  />
                </svg>
              </button>
            </div>
          </>
        )}

        {/* Promotional Row */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-[20rem] tracking-widest text-center mt-8 px-4 py-6 border-y-2 border-slate-200">
          {/* Column 1 */}
          <div className="max-w-xs mx-4">
            <h3 className="font-bold text-sm uppercase mb-1 underline underline-offset-4 py-2">
              SHIPPING PAN INDIA
            </h3>
            <p className="text-xs text-gray-700">
              MADE IN INDIA
              <br />
              DELIVERING PAN INDIA
            </p>
          </div>

          {/* Column 2 */}
          <div className="max-w-xs">
            <h3 className="font-bold text-sm uppercase mb-1 underline underline-offset-4 py-2">
              FREE RETURN AND EXCHANGE
            </h3>
            <p className="text-xs text-gray-700">
              7 DAYS EASY RETURNS
              <br />
              NO QUESTIONS ASKED
            </p>
          </div>

          {/* Column 3 */}
          <div className="max-w-xs">
            <h3 className="font-bold text-sm uppercase mb-1 underline underline-offset-4 py-2">
              100% HOME GROWN BRAND
            </h3>
            <p className="text-xs text-gray-700">
              PRODUCTS ARE 100%
              <br />
              MADE IN INDIA
            </p>
          </div>
        </div>

        {/* Another banner/image */}
        <div className="w-full">
          <img src={image} alt="Promotional Banner" className="w-full h-auto" />
        </div>
      </div>
    </>
  );
}

export default Home;
