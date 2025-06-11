import React, { useEffect, useState } from "react";
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
  const { id } = useParams();
  const productId = id;

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
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');

  const categories = ["Clothing", "T-shirt", "Hoodie"];

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setIsCategory(true);
  };

  const handleInputChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleUpload = () => {
    if (imageUrl.trim() !== '') {
      setImageUrls([...imageUrls, { url: imageUrl }]);
      setImageUrl('');
    }
  };

  const clear = () => {
    setImageUrls('');
  };

  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category || "Clothing");
      setIsCategory(true);
      setInfo(product.info);
      setStock(product.Stock);
      setImageUrls(product.images || []);
      setSize(product.size || '');
      setColor(product.color || '');
      setTags(product.tags || []);
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
    myForm.set("size", size);
    myForm.set("color", color);
    tags.forEach((tag) => myForm.append("tags", tag));
    imageUrls.forEach((currImg) => {
      myForm.append("images", currImg.url);
    });

    dispatch(updateProduct(productId, myForm));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Update Product" />
          <div className="flex">
            <Sidebar />
            <div className="flex w-full justify-center bg-gray-100 min-h-screen">
              <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-8 m-4 w-full max-w-3xl">
                <h2 className="text-2xl font-bold text-gray-700 mb-6">Update Product</h2>
                <form
                  className="w-full space-y-4"
                  encType="multipart/form-data"
                  onSubmit={createProductSubmitHandler}
                >
                  <div>
                    <label className="block text-gray-700 mb-2">Product Name</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="Product Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Price</label>
                    <input
                      type="number"
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="Price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Stock</label>
                    <input
                      type="number"
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="Stock"
                      value={Stock}
                      onChange={(e) => setStock(e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="productInfo" className="block text-gray-700 mb-2">Product Info</label>
                    <input
                      type="text"
                      id="productInfo"
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="Product Info"
                      value={info}
                      onChange={(e) => setInfo(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Size</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                      id="size"
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Color</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                      id="color"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Description</label>
                    <textarea
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Category</label>
                    <select
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                      value={category}
                      onChange={handleCategoryChange}
                    >
                      {categories.map((cate) => (
                        <option key={cate} value={cate}>
                          {cate}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Tags</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter a tag"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                      />
                      <button
                        type="button"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        onClick={() => {
                          if (tagInput.trim() !== "") {
                            setTags([...tags, tagInput.trim()]);
                            setTagInput("");
                          }
                        }}
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap mt-2 space-x-2">
                      {tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full flex items-center space-x-2"
                        >
                          {tag}
                          <button
                            type="button"
                            className="text-red-500 hover:text-red-700"
                            onClick={() => setTags(tags.filter((_, i) => i !== index))}
                          >
                            &times;
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Existing Image URLs</label>
                    <div className="space-y-2">
                      {imageUrls.map((url, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <input
                            type="text"
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={url.url}
                            onChange={(e) => {
                              const updatedImageUrl = imageUrls.map((item, i) =>
                                i === index ? { ...item, url: e.target.value } : item
                              );
                              setImageUrls(updatedImageUrl);
                            }}
                          />
                          <button
                            type="button"
                            className="text-red-500 hover:text-red-700"
                            onClick={() =>
                              setImageUrls(imageUrls.filter((_, i) => i !== index))
                            }
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* 👇 Add New URL Input */}
                    <div className="mt-4">
                      <label className="block text-gray-700 mb-2">Enter New Image URL</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Image URL"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                      />
                    </div>

                    {/* 👇 Add Button */}
                    <button
                      type="button"
                      className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                      onClick={handleUpload}
                    >
                      Add Image URL
                    </button>
                  </div>
                    <button
                      type="button"
                      className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                      onClick={handleUpload}
                    >
                      Add Image URL
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                    disabled={loading}
                  >
                    Update Product
                  </button>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default UpdateProduct;
