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

  const { error, product } = useSelector((state) => state.productDetails);
  const { loading, error: updateError, isUpdated } = useSelector(
    (state) => state.deleteUpdateProduct
  );

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [info, setInfo] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageUrls, setImageUrls] = useState([]);
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');

  const categories = ["Clothing", "T-shirt", "Hoodie"];

  const handleUpload = () => {
    if (imageUrl.trim() !== "") {
      setImageUrls([...imageUrls, { url: imageUrl.trim() }]);
      setImageUrl("");
    } else {
      toast.warning("Please enter a valid image URL.");
    }
  };

  useEffect(() => {
    if (product && product._id !== id) {
      dispatch(getProductDetails(id));
    } else if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setDiscount(product.discount || 0);
      setCategory(product.category || "Clothing");
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
  }, [dispatch, error, navigate, isUpdated, id, product, updateError]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("discount", discount ? discount : 0);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", Stock);
    myForm.set("info", info);
    myForm.set("size", size);
    myForm.set("color", color);
    tags.forEach((tag) => myForm.append("tags", tag));
    imageUrls.forEach((currImg) => {
      if (currImg.url && currImg.url.trim() !== "") {
        myForm.append("images", currImg.url);
      }
    });

    dispatch(updateProduct(id, myForm));
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
                <form className="w-full" onSubmit={createProductSubmitHandler}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label className="flex flex-col">
                      <span className="text-sm font-medium mb-1">Product Name</span>
                      <input className="p-2 border rounded" value={name} onChange={(e) => setName(e.target.value)} />
                    </label>
                    <label className="flex flex-col">
                      <span className="text-sm font-medium mb-1">Price (₹)</span>
                      <input type="number" className="p-2 border rounded" value={price} onChange={(e) => setPrice(e.target.value)} />
                    </label>
                    <label className="flex flex-col">
                      <span className="text-sm font-medium mb-1">Discount (%)</span>
                      <input type="number" className="p-2 border rounded" value={discount} onChange={(e) => setDiscount(e.target.value)} />
                    </label>
                    <label className="flex flex-col">
                      <span className="text-sm font-medium mb-1">Stock</span>
                      <input type="number" className="p-2 border rounded" value={Stock} onChange={(e) => setStock(e.target.value)} />
                    </label>
                    <label className="flex flex-col sm:col-span-2">
                      <span className="text-sm font-medium mb-1">Product Info</span>
                      <input className="p-2 border rounded" value={info} onChange={(e) => setInfo(e.target.value)} />
                    </label>
                    <label className="flex flex-col">
                      <span className="text-sm font-medium mb-1">Size</span>
                      <input className="p-2 border rounded" value={size} onChange={(e) => setSize(e.target.value)} />
                    </label>
                    <label className="flex flex-col">
                      <span className="text-sm font-medium mb-1">Color</span>
                      <input className="p-2 border rounded" value={color} onChange={(e) => setColor(e.target.value)} />
                    </label>
                    <label className="flex flex-col sm:col-span-2">
                      <span className="text-sm font-medium mb-1">Description</span>
                      <textarea className="p-2 border rounded" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </label>
                    <label className="flex flex-col sm:col-span-2">
                      <span className="text-sm font-medium mb-1">Category</span>
                      <select className="p-2 border rounded" value={category} onChange={(e) => setCategory(e.target.value)}>
                        {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                      </select>
                    </label>
                  </div>

                  {/* TAGS */}
                  <div className="mt-6">
                    <label className="block font-medium mb-1">Tags</label>
                    <div className="flex space-x-2">
                      <input className="flex-1 p-2 border rounded" value={tagInput} onChange={(e) => setTagInput(e.target.value)} placeholder="Enter a tag" />
                      <button
                        type="button"
                        onClick={() => {
                          if (tagInput.trim()) {
                            setTags([...tags, tagInput.trim()]);
                            setTagInput("");
                          }
                        }}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {tags.map((tag, i) => (
                        <span key={i} className="bg-gray-200 px-2 py-1 rounded">
                          {tag}
                          <button onClick={() => setTags(tags.filter((_, idx) => idx !== i))} className="text-red-500 ml-2">&times;</button>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* IMAGE URLs */}
                  <div className="mt-6">
                    <label className="block font-medium mb-1">Image URLs</label>
                    {imageUrls.map((img, idx) => (
                      <div key={idx} className="flex items-center gap-2 mb-2">
                        <img
                          src={img.url}
                          alt="Preview"
                          className="w-16 h-16 object-cover border rounded"
                          onError={(e) => { e.target.src = "/no-image.png"; }}
                        />
                        <input
                          type="text"
                          className="flex-1 p-2 border rounded"
                          value={img.url}
                          onChange={(e) => {
                            const updated = [...imageUrls];
                            updated[idx].url = e.target.value;
                            setImageUrls(updated);
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => setImageUrls(imageUrls.filter((_, i) => i !== idx))}
                          className="text-red-500 font-bold text-lg"
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                    <div className="flex gap-2 mt-2">
                      <input
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="flex-1 p-2 border rounded"
                        placeholder="Enter image URL"
                      />
                      <button
                        type="button"
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={handleUpload}
                      >
                        Add Image URL
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 mt-6"
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
