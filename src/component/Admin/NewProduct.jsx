import React, { useEffect, useState, useRef } from "react";
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
  // const alert = useAlert();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector(
    (state) => state.addNewProduct
  );
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [info, setInfo] = useState("")
  const [isCategory, setIsCategory] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [imageUrls, setImageUrls] = useState([]);

  const handleInputChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleUpload = () => {
    if (imageUrl.trim() !== '') {
      setImageUrls([...imageUrls, imageUrl]);
      setImageUrl('');
    }
  };


  const [toggle, setToggle] = useState(false);
  const user = sessionStorage.getItem("user");

  // const classes = useStyles();
  // togle handler =>
  const toggleHandler = () => {
    console.log("toggle");
    setToggle(!toggle);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setIsCategory(true);
  };


  const categories = [
    "Clothing",
  ];
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
  }, [dispatch,
    // alert,
    error,
    navigate,
    success]);



  const createProductSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", Stock);
    myForm.set("info", info);
    myForm.set("user", JSON.parse(user)._id);
    imageUrls.forEach((currImg) => {
      myForm.append("images", currImg);
    });

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
            <div
            >
              <Sidebar />
            </div >

            <div className=" flex  w-full justify-center bg-slate-300">

              <div>
                <div
                  // encType="multipart/form-data"
                  className="flex flex-col items-center bg-white m-4 p-8 rounded-md"
                >
                  < div className=" text-xl font-semibold m-4">
                    Create Product
                  </ div>

                  <div>
                    <div>Product Name:</div>
                    < input
                      placeholder="Product Name"
                      required
                      className=" rounded-md"

                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <div>Price:</div>
                    < input
                      placeholder="Price"
                      value={price}
                      required
                      className=" rounded-md"

                      onChange={(e) => setPrice(e.target.value)}

                    />
                  </div>
                  <div>
                    <div>Stock:</div>
                    <input
                      placeholder="Stock"
                      value={Stock}
                      className=" rounded-md"

                      required
                      onChange={(e) => setStock(e.target.value)}

                    />
                  </div>

                  <div>
                    <div>Product Info:</div>

                    <input
                      placeholder="Product info"
                      className=" rounded-md"
                      value={info}
                      required
                      onChange={(e) => setInfo(e.target.value)}

                    />
                  </div>


                  <div className=" rounded-md"
                  >
                    {!isCategory && (
                      < div>
                        Choose Category
                      </ div>
                    )}
                    <form className="">
                      <select
                        value={category}
                        onChange={handleCategoryChange}
                      >
                        {!category && (
                          <option value="">
                            <em>Choose Category</em>
                          </option>
                        )}
                        {
                          categories.map((cate) => (
                            <option key={cate} value={cate}>
                              {cate}
                            </option>
                          ))
                        }
                      </select >
                    </form >
                  </div >

                  <div>
                    <div>Product Description:</div>

                    < input
                      placeholder="Product Description"
                      className=" rounded-md"

                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>

                  <div>
                    <div>Enter Image URL:</div>

                    < input
                      placeholder="Enter image URL"
                      value={imageUrl}
                      className=" rounded-md"
                      onChange={handleInputChange}
                    />
                  </div>

                  < button
                    className=" px-2 py-1 bg-blue-400 m-2 rounded-md text-white font-semibold shadow-sm hover:bg-blue-500"
                    onClick={handleUpload}
                  >Upload Image</ button>

                  <div className=" w-96">
                    {imageUrls &&
                      imageUrls.map((url, index) => (
                        <img
                          key={index}
                          src={url}
                          alt="Product Preview"
                        />
                      ))}
                  </div>

                  <  button
                    className=" px-2 py-1 bg-green-400 m-2 rounded-md text-white font-semibold shadow-sm disabled:bg-gray-40 hover:bg-green-500"
                    onClick={createProductSubmitHandler}
                    disabled={loading ? true : false}
                  >
                    Create
                  </  button>
                </div>
              </div >

            </div >
          </div >
        </>
      )}
    </>
  );
}
export default NewProduct;
