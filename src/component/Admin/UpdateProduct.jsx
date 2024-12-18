import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import MetaData from "../Layouts/MetaData/MetaData";
import Loader from "../Layouts/loader/Loader";
import Sidebar from "./Siderbar";
import {
  updateProduct,
  clearErrors,
  getProductDetails,
} from "../../actions/productAction";
import { UPDATE_PRODUCT_RESET } from "../../constants/productsConstants";
import { useNavigate, useParams } from "react-router-dom";
function UpdateProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const alert = useAlert();

  // const classes = useStyles;
  const { id } = useParams();
  const productId = id;
  // const productId = 1;

  const { error, product } = useSelector((state) => state.productDetails);

  const { loading, error: updateError, isUpdated } = useSelector(
    (state) => state.deleteUpdateProduct
  );

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [isCategory, setIsCategory] = useState(false);
  const [Stock, setStock] = useState(0);
  const [info, setInfo] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageUrls, setImageUrls] = useState([]);

  const [toggle, setToggle] = useState(false);
  const categories = [
    "Clothing",
  ];
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setIsCategory(true);
  };

  const handleInputChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleUpload = () => {
    if (imageUrl.trim() !== '') {
      setImageUrls([...imageUrls, imageUrl]);
      setImageUrl('');
    }
  };


  const clear = () => {
    setImageUrls('')
  }

  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      console.log(product);
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory("Clothing");
      setIsCategory(true)
      setInfo(product.info);
      setStock(product.Stock);
      setImageUrls(product.images);
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Product Updated Successfully");
      navigate("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [
    dispatch,
    // alert,
    error,
    navigate,
    isUpdated,
    productId,
    product,
    updateError,
  ]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", Stock);
    myForm.set("info", info);
    imageUrls.forEach((currImg) => {
      myForm.append("images", currImg.url);
    });

    dispatch(updateProduct(productId, myForm));
  };


  // togle handler =>
  const toggleHandler = () => {
    console.log("toggle");
    setToggle(!toggle);
  };
  console.log(imageUrls)

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <>
            <MetaData title="Update Product" />
            <div className="flex">
              <div
              >
                <Sidebar />
              </div>
              <div className=" flex  w-full justify-center bg-slate-300">
                <div
                >
                  <div
                    className="flex flex-col items-center bg-white m-4 p-8 rounded-md"
                    encType="multipart/form-data"
                  >
                    <div
                      className=" text-xl font-semibold m-4"
                    >
                      Update Product
                    </div>
                    <div>Product Name:</div>
                    <input
                      placeholder="Product Name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />

                    <div>Price:</div>
                    <input
                      placeholder="Price"
                      value={price}
                      required
                      onChange={(e) => setPrice(e.target.value)}
                    />

                    <div>Stock</div>
                    <input
                      placeholder="Stock"
                      value={Stock}
                      required
                      onChange={(e) => setStock(e.target.value)}
                    />

                    <div>Product Info</div>
                    <input
                      label="Product Info"
                      value={info}
                      className=" w-96"
                      required
                      onChange={(e) => setInfo(e.target.value)}
                    />

                    <div >
                      {!isCategory && (
                        <div
                        >
                          Choose Category
                        </div>
                      )}
                      <div >
                        <select
                          value={category}
                          onChange={handleCategoryChange}
                        >
                          {!category && (
                            <option value="">
                              <em>Choose Category</em>
                            </option>
                          )}
                          {categories.map((cate) => (
                            <option key={cate} value={cate}>
                              {cate}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>Product Description</div>
                    <textarea
                      placeholder="Product Description"
                      value={description}
                      className=" w-96 h-96 m-4"
                      onChange={(e) => setDescription(e.target.value)}
                    />

                    <div className=" flex flex-col">
                      <div className=" text-center" >Moddify Image URL:</div>


                      {imageUrls &&
                        imageUrls.map((url, index) => (
                          <div>
                            < input
                              placeholder="Enter image URL"
                              value={url.url}
                              onChange={(e) => {
                                const updatedImageUrl = imageUrls.map((item, i) =>
                                  i === index ? { ...item, url: e.target.value } : item
                                );
                                setImageUrls(updatedImageUrl);
                              }
                              }
                            />
                            < div className=" text-center" >Image Id :{index}</div>
                          </div>
                        ))}
                    </div>

                    < button
                      className=" px-2 py-1 bg-blue-400 m-2 rounded-md text-white font-semibold shadow-sm hover:bg-blue-500"
                      onClick={handleUpload}
                    >Set URL</ button>

                    <div className=" w-96">
                      {imageUrls &&
                        imageUrls.map((url, index) => (
                          < img
                            key={index}
                            src={url.url}
                            alt="Product Preview"
                          />
                        ))}
                    </div>


                    <div
                      className=" p-4 bg-green-400 m-2 rounded-md text-white font-semibold shadow-sm disabled:bg-gray-40 hover:bg-green-500"

                      onClick={createProductSubmitHandler}
                      disabled={loading ? true : false}
                    >
                      Update
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        </>
      )
      }
    </>
  );
}
export default UpdateProduct;
