import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import { toast } from "react-toastify";
import MetaData from "../Layouts/MetaData/MetaData";
import ProductCard from "../Home/ProductCard";
import img from "../../ecommerce images/HoodieTop.png";

function Hoodies() {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    // Call the API with category "Hoodie" to fetch only hoodie products
    dispatch(getProduct("", 1, [0, 25000], "Hoodie"));
  }, [dispatch, error]);

  return (
    <>
      <MetaData title="Kriptees" />
      <div className="Home_Page pt-14">
        {/* Top Banner */}
        <div className="w-full">
          <img src={img} alt="Banner" className="w-full h-auto" />
        </div>

        {/* Heading & Subtext below banner */}
        <div className="text-center px-4 py-8">
          <h2 className="text-5xl font-black uppercase tracking-widest mb-4">
            HOODIES
          </h2>
          <p className="max-w-3xl mx-auto text-gray-700 text-sm leading-relaxed tracking-widest">
            Our hoodies are crafted from ultra-soft, premium fabrics for unbeatable comfort. With a cozy fit and breathable design, they’re perfect for any season, keeping you relaxed and stylish all day long!
          </p>
        </div>

        {/* Hoodies Products */}
        {products.length > 0 && (
          <div className="md:mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-8 p-3 md:px-8">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Hoodies;
