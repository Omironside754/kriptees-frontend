import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import MetaData from "../Layouts/MetaData/MetaData";
import Loader from "../Layouts/loader/Loader";
import Sidebar from "./Siderbar";
import { createProduct, clearErrors } from "../../actions/productAction";
import { NEW_PRODUCT_RESET } from "../../constants/productsConstants";
import { useNavigate } from "react-router-dom";

function NewProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector(
    (state) => state.addNewProduct
  );

  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState();
  const [info, setInfo] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageUrls, setImageUrls] = useState([]);

  const user = sessionStorage.getItem("user");
  const categories = ["Clothing", "T-shirt", "Hoodie"];

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Product Created Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, error, navigate, success]);

  const handleTagInput = (e) => {
    setTagInput(e.target.value);
  };

  const addTag = () => {
    if (tagInput.trim() !== "") {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleUpload = () => {
    if (imageUrl.trim() !== "") {
      setImageUrls([...imageUrls, imageUrl]);
      setImageUrl("");
    }
  };

  const createProductSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", stock);
    myForm.set("info", info);
    myForm.set("size", size);
    myForm.set("color", color);
    myForm.set("user", JSON.parse(user)._id);
    tags.forEach((tag) => myForm.append("tags", tag));
    imageUrls.forEach((currImg) => myForm.append("images", currImg));

    dispatch(createProduct(myForm));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={"New Product"} />
          <div className="flex">
            <Sidebar />
            <div className="flex w-full justify-center bg-gray-100">
              <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-6">Create Product</h2>
                <form onSubmit={createProductSubmitHandler} className="space-y-4">
                  <input
                    placeholder="Product Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  <input
                    type="number"
                    placeholder="Stock"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  <input
                    placeholder="Product Info"
                    value={info}
                    onChange={(e) => setInfo(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Choose Category</option>
                    {categories.map((cate) => (
                      <option key={cate} value={cate}>
                        {cate}
                      </option>
                    ))}
                  </select>
                  <input
                    placeholder="Product Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  <select
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select Size</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                  </select>
                  <input
                    placeholder="Color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  <div className="flex flex-col">
                    <div className="flex items-center mb-2">
                      <input
                        placeholder="Enter Tags"
                        value={tagInput}
                        onChange={handleTagInput}
                        className="flex-1 p-2 border border-gray-300 rounded-md"
                      />
                      <button
                        type="button"
                        onClick={addTag}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md ml-2 hover:bg-blue-600"
                      >
                        Add Tag
                      </button>
                    </div>
                    <div className="flex flex-wrap">
                      {tags.map((tag, index) => (
                        <span key={index} className="bg-gray-200 px-2 py-1 rounded-md m-1">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <input
                      placeholder="Enter Image URL"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    <button
                      type="button"
                      onClick={handleUpload}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md mt-2 hover:bg-blue-600"
                    >
                      Upload Image
                    </button>
                    <div className="flex flex-wrap mt-2">
                      {imageUrls.map((url, index) => (
                        <img key={index} src={url} alt="Product Preview" className="w-24 h-24 object-cover m-1 border rounded" />
                      ))}
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                    disabled={loading}
                  >
                    Create
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

export default NewProduct;
