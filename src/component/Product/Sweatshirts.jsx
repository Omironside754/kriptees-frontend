import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import { toast } from "react-toastify";
import MetaData from "../Layouts/MetaData/MetaData";
import ProductCard from "../Home/ProductCard";
import sweatshirtBanner from "../../ecommerce images/SweatShirtTop.png";

function Sweatshirts() {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    // Fetch products in the "Sweatshirt" category
    dispatch(getProduct("", 1, [0, 25000], "Sweatshirt"));
  }, [dispatch, error]);

  return (
    <>
      <MetaData title="Sweatshirts - Kriptees" />

      {/* Page Container with responsive top padding */}
      <div className="Home_Page pt-14 md:pt-14">

        {/* Top Banner */}
        <div className="w-full">
          <img
            src={sweatshirtBanner}
            alt="Sweatshirts Banner"
            className="w-full h-auto"
          />
        </div>

        {/* Heading & Subtext below banner */}
        <div className="text-center px-2 py-6 md:px-4 md:py-8">
          {/* Smaller text on mobile, larger on bigger screens */}
          <h3 className="text-sm sm:text-base md:text-xl font-Montserrat-bold uppercase tracking-[0.2em] mb-2 md:mb-4">
            WINTERWEARS
          </h3>
          {/* Adjust the main heading size for different breakpoints */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-widest mb-4">
            SWEATSHIRTS
          </h2>
          {/* Responsive paragraph text */}
          <p className="max-w-3xl mx-auto text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed tracking-wide">
            Our sweatshirts combine cozy warmth with premium fabrics that
            are both ultra-comfortable and durable. Designed for style and
            durability, they’re perfect for staying snug while looking
            effortlessly cool!
          </p>
        </div>

        {/* Sweatshirt Products Grid */}
        {products.length > 0 && (
          <div className="md:mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-8 p-3 md:px-8">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

        {/* "Coming Soon" message when no products are available */}
        {products.length === 0 && !loading && (
          <div className="text-center py-16 px-4 md:py-28 md:px-20">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-Montserrat-bold font-semibold uppercase tracking-[0.2em]">
              Coming Soon
            </h3>
          </div>
        )}
      </div>
    </>
  );
}

export default Sweatshirts;
