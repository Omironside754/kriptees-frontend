import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import useActive from "../hook/useActive";
import ReviewCard from "./ReviewCard";
import { clearErrors, getProductDetails } from "../../actions/productAction";
import MetaData from "../Layouts/MetaData/MetaData";
import { addItemToCart } from "../../actions/cartAction";
import CricketBallLoader from "../Layouts/loader/Loader";
import { PRODUCT_DETAILS_RESET } from "../../constants/productsConstants";
import { toast } from 'react-toastify';

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [i, setI] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [previewImg, setPreviewImg] = useState("");
  const { handleActive, activeClass } = useActive(0);
  const [size, setSize] = useState("S");
  const { product, loading, error, success } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      dispatch({ type: PRODUCT_DETAILS_RESET });
    }
    dispatch(getProductDetails(id));
  }, [dispatch, error, success, id]);

  useEffect(() => {
    if (product && product.images && product.images.length > 0) {
      setPreviewImg(product.images[0].url);
      handleActive(0);
    }
  }, [product]);

  const handleAddItem = () => {
    dispatch(addItemToCart(id, quantity, size));
    toast.success("Item Added To Cart");
  };

  const handlePreviewImg = (images, index) => {
    setPreviewImg(images[index].url);
    handleActive(index);
    setI(index); // Update the `i` state to track the selected image
  };

  const increaseQuantityHandler = () => {
    if (product.Stock <= quantity) {
      return;
    }
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantityHandler = () => {
    if (quantity <= 1) {
      return;
    }
    setQuantity((prev) => prev - 1);
  };

  const convertToPoints = (text) => {
    if (text && typeof text === 'string') {
      return text.split('. ').filter(sentence => sentence.trim().length > 0);
    }
  };

  const points = convertToPoints(product.description);

  return (
    <>
      {loading ? (
        <CricketBallLoader />
      ) : (
        <>
          <MetaData title={product.name} />
          <div className="bg-white mt-16 dark:bg-gray-800 py-16">
            <div className="mx-auto px-6 lg:px-8">
              <div className="flex flex-col md:flex-row -mx-4">


                <div className="md:flex-1 px-4 flex">
                  <div className="w-full md:w-3/4">
                    <img src={previewImg} className="mb-4 rounded-lg w-full h-auto" alt="Product Main" />
                  </div>
                  <div className="w-full md:w-1/4 flex flex-col items-center md:items-start justify-start md:justify-center space-y-4 md:space-y-2 md:ml-4">
                    {product.images && product.images.map((img, index) => (
                      <img
                        key={index}
                        src={img.url}
                        className={`cursor-pointer rounded-lg w-20 h-20 object-cover ${index === i ? 'border-2 border-blue-500' : ''}`}
                        alt={`Product Preview ${index + 1}`}
                        onClick={() => handlePreviewImg(product.images, index)}
                      />
                    ))}
                  </div>
                </div>


                <div className="md:flex-1 px-4">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{product.name}</h2>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{product.info}</p>
                  <div className="flex mb-4">
                    <div className="mr-4">
                      <span className="font-bold text-gray-700 dark:text-gray-300">Price:</span>
                      <span className="text-gray-600 dark:text-gray-300">₹{product.price}</span>
                    </div>
                    <div>
                      <span className="font-bold text-gray-700 dark:text-gray-300">Availability:</span>
                      <span className="text-gray-600 dark:text-gray-300">In Stock</span>
                    </div>
                  </div>
                  <div className="flex align-middle items-center gap-4 mb-4">
                    <div className="flex">
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map(ratingValue => (
                          <div
                            key={ratingValue}
                            className={`text-2xl ${product.ratings >= ratingValue ? 'text-yellow-500' : 'text-gray-300'}`}
                          >
                            &#9733;
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div>
                        <strong> Total Reviews: </strong>
                        {product.numOfReviews}
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <span className="font-bold text-gray-700 dark:text-gray-300">Select Size:</span>
                    <div className="flex items-center mt-2">
                      {["S", "M", "L", "XL", "XXL"].map(sizeOption => (
                        <button
                          key={sizeOption}
                          onClick={() => setSize(sizeOption)}
                          className={`bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600 ${size === sizeOption ? 'border-2 border-blue-500' : ''}`}
                        >
                          {sizeOption}
                        </button>
                      ))}
                    </div>
                    <div className="mt-4 font-bold text-gray-700">Selected Size: {size}</div>
                  </div>
                  <div className="flex -mx-2 mb-4 mt-6">
                    <div className="w-1/2 px-2">
                      <button
                        onClick={handleAddItem}
                        disabled={product.Stock <= 0}
                        className="w-full bg-gray-900 disabled:bg-gray-500 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                  <div>
                    <span className="font-bold text-gray-700 dark:text-gray-300">Product Description:</span>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                      <ul className="list-disc list-inside space-y-2">
                        {points && points.map((point, index) => (
                          <li key={index}>{point}</li>
                        ))}
                      </ul>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <ReviewCard product={product} />
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;
