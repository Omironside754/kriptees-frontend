import React, { useEffect } from "react";
import "./Products.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Layouts/loader/Loader";
import { toast } from 'react-toastify';
// import { useRouteMatch } from "react-router-dom";
import MetaData from "../Layouts/MetaData/MetaData";
import { clearErrors, getProduct, getProductDetails } from "../../actions/productAction";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { addItemToCart } from "../../actions/cartAction";
import { Link } from "react-router-dom";

const categories = [
  "Anime",
  "Manga",
  "Clothing",
  "Accessories",
];

function Products() {
  const { id } = useParams();
  let keyword = id;
  const dispatch = useDispatch();
  const {
    products,
    loading,
    productsCount,
    error,
    resultPerPage,
    // filterdProductCount,
  } = useSelector((state) => state.products);
  // const alert = useAlert();

  const [currentPage, setCurrentPage] = React.useState();
  const [price, setPrice] = React.useState([0, 100000]); // initial limit from min=0 to max=100000
  const [category, setCategory] = React.useState("");
  const [ratings, setRatings] = React.useState(0);
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [open, toggle] = useState(false);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(
      keyword,
      currentPage, price, category, ratings));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch,
    keyword,
    currentPage, price, ratings, category]);

  const setCurrentPageNoHandler = (e) => {
    setCurrentPage(e); // e is the clicked page value
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };
  const handleCategoryChange = (category) => {
    setCategory(category);
    setSelectedCategory(category);
    // Perform any additional actions or filtering based on the selected category
  };


  const [selectedRating, setSelectedRating] = React.useState("all");

  const handleRatingChange = (event) => {
    setRatings(event.target.value);
    setSelectedRating(event.target.value);
  };

  const addTocartHandler = (id, qty) => {
    dispatch(addItemToCart(id, qty));
    toast.success("Item added to cart!");
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Products" />

          <div className="bg-white mt-0 lg:mt-12 ">
            <div>

              <div className="relative z-40 lg:hidden hidden" role="dialog" aria-modal="true">

                <div className="fixed inset-0 bg-black bg-opacity-25"></div>

                <div className="fixed inset-0 z-40 flex">

                  <div className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                    <div className="flex items-center justify-between px-4">
                      <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                      <button type="button" className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400">
                        <span className="sr-only">Close menu</span>
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <form className="mt-4 border-t border-gray-200">
                      <h3 className="sr-only">Categories</h3>
                      <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                        <li>
                          <a href="/" className="block px-2 py-3">Totes</a>
                        </li>
                        <li>
                          <a href="/" className="block px-2 py-3">Backpacks</a>
                        </li>
                        <li>
                          <a href="/" className="block px-2 py-3">Travel Bags</a>
                        </li>
                        <li>
                          <a href="/" className="block px-2 py-3">Hip Bags</a>
                        </li>
                        <li>
                          <a href="/" className="block px-2 py-3">Laptop Sleeves</a>
                        </li>
                      </ul>

                      <div className="border-t border-gray-200 px-4 py-6">
                        <h3 className="-mx-2 -my-3 flow-root">
                          <button type="button" className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500" aria-controls="filter-section-mobile-0" aria-expanded="false">
                            <span className="font-medium text-gray-900">Color</span>
                            <span className="ml-6 flex items-center">
                              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                              </svg>
                              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z" clip-rule="evenodd" />
                              </svg>
                            </span>
                          </button>
                        </h3>
                        <div className="pt-6" id="filter-section-mobile-0">
                          <div className="space-y-6">
                            <div className="flex items-center">
                              <input id="filter-mobile-color-0" name="color[]" value="white" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                              </input>
                              <label for="filter-mobile-color-0" className="ml-3 min-w-0 flex-1 text-gray-500">White</label>
                            </div>
                            <div className="flex items-center">
                              <input id="filter-mobile-color-1" name="color[]" value="beige" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                              </input>

                              <label for="filter-mobile-color-1" className="ml-3 min-w-0 flex-1 text-gray-500">Beige</label>
                            </div>
                            <div className="flex items-center">
                              <input id="filter-mobile-color-2" name="color[]" value="blue" type="checkbox" checked className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                              </input>

                              <label for="filter-mobile-color-2" className="ml-3 min-w-0 flex-1 text-gray-500">Blue</label>
                            </div>
                            <div className="flex items-center">
                              <input id="filter-mobile-color-3" name="color[]" value="brown" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                              </input>

                              <label for="filter-mobile-color-3" className="ml-3 min-w-0 flex-1 text-gray-500">Brown</label>
                            </div>
                            <div className="flex items-center">
                              <input id="filter-mobile-color-4" name="color[]" value="green" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                              </input>

                              <label for="filter-mobile-color-4" className="ml-3 min-w-0 flex-1 text-gray-500">Green</label>
                            </div>
                            <div className="flex items-center">
                              <input id="filter-mobile-color-5" name="color[]" value="purple" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                              </input>

                              <label for="filter-mobile-color-5" className="ml-3 min-w-0 flex-1 text-gray-500">Purple</label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="border-t border-gray-200 px-4 py-6">
                        <h3 className="-mx-2 -my-3 flow-root">
                          <button type="button" className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500" aria-controls="filter-section-mobile-1" aria-expanded="false">
                            <span className="font-medium text-gray-900">Category</span>
                            <span className="ml-6 flex items-center">

                              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                              </svg>

                              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z" clip-rule="evenodd" />
                              </svg>
                            </span>
                          </button>
                        </h3>
                        <div className="pt-6" id="filter-section-mobile-1">
                          <div className="space-y-6">
                            <div className="flex items-center">
                              <input id="filter-mobile-category-0" name="category[]" value="new-arrivals" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                              </input>
                              <label for="filter-mobile-category-0" className="ml-3 min-w-0 flex-1 text-gray-500">New Arrivals</label>
                            </div>
                            <div className="flex items-center">
                              <input id="filter-mobile-category-1" name="category[]" value="sale" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                              </input>
                              <label for="filter-mobile-category-1" className="ml-3 min-w-0 flex-1 text-gray-500">Sale</label>
                            </div>
                            <div className="flex items-center">
                              <input id="filter-mobile-category-2" name="category[]" value="travel" type="checkbox" checked className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                              </input>
                              <label for="filter-mobile-category-2" className="ml-3 min-w-0 flex-1 text-gray-500">Travel</label>
                            </div>
                            <div className="flex items-center">
                              <input id="filter-mobile-category-3" name="category[]" value="organization" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                              </input>
                              <label for="filter-mobile-category-3" className="ml-3 min-w-0 flex-1 text-gray-500">Organization</label>
                            </div>
                            <div className="flex items-center">
                              <input id="filter-mobile-category-4" name="category[]" value="accessories" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                              </input>
                              <label for="filter-mobile-category-4" className="ml-3 min-w-0 flex-1 text-gray-500">Accessories</label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="border-t border-gray-200 px-4 py-6">
                        <h3 className="-mx-2 -my-3 flow-root">
                          <button type="button" className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500" aria-controls="filter-section-mobile-2" aria-expanded="false">
                            <span className="font-medium text-gray-900">Size</span>
                            <span className="ml-6 flex items-center">
                              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                              </svg>
                              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z" clip-rule="evenodd" />
                              </svg>
                            </span>
                          </button>
                        </h3>
                        <div className="pt-6" id="filter-section-mobile-2">
                          <div className="space-y-6">
                            <div className="flex items-center">
                              <input id="filter-mobile-size-0" name="size[]" value="2l" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                              </input>
                              <label for="filter-mobile-size-0" className="ml-3 min-w-0 flex-1 text-gray-500">2L</label>
                            </div>
                            <div className="flex items-center">
                              <input id="filter-mobile-size-1" name="size[]" value="6l" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                              </input>
                              <label for="filter-mobile-size-1" className="ml-3 min-w-0 flex-1 text-gray-500">6L</label>
                            </div>
                            <div className="flex items-center">
                              <input id="filter-mobile-size-2" name="size[]" value="12l" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                              </input>
                              <label for="filter-mobile-size-2" className="ml-3 min-w-0 flex-1 text-gray-500">12L</label>
                            </div>
                            <div className="flex items-center">
                              <input id="filter-mobile-size-3" name="size[]" value="18l" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                              </input>
                              <label for="filter-mobile-size-3" className="ml-3 min-w-0 flex-1 text-gray-500">18L</label>
                            </div>
                            <div className="flex items-center">
                              <input id="filter-mobile-size-4" name="size[]" value="20l" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                              </input>
                              <label for="filter-mobile-size-4" className="ml-3 min-w-0 flex-1 text-gray-500">20L</label>
                            </div>
                            <div className="flex items-center">
                              <input id="filter-mobile-size-5" name="size[]" value="40l" type="checkbox" checked className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                              </input>
                              <label for="filter-mobile-size-5" className="ml-3 min-w-0 flex-1 text-gray-500">40L</label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <main className="mx-auto max-w-screen px-4 sm:px-6 lg:px-8">
                <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                  <h1 className="text-4xl font-bold tracking-tight text-gray-900">New Arrivals</h1>

                  <div className="flex items-center">
                    <div className="relative inline-block text-left">
                      <div>
                        <button onClick={() => { toggle(!open) }} type="button" className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900" id="menu-button" aria-expanded="false" aria-haspopup="true">
                          Sort
                          <svg className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                          </svg>
                        </button>
                      </div>

                      <div
                        style={{
                          display: `${open ? "" : "none"}`
                        }}
                        className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                        <div className="py-1" role="none">

                          <a href="/" className="font-medium text-gray-900 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0">Most Popular</a>
                          <a href="/" className="text-gray-500 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-1">Best Rating</a>
                          <a href="/" className="text-gray-500 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-2">Newest</a>
                          <a href="/" className="text-gray-500 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-3">Price: Low to High</a>
                          <a href="/" className="text-gray-500 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-4">Price: High to Low</a>
                        </div>
                      </div>
                    </div>

                    {/* <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                      <span className="sr-only">View grid</span>
                      <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M4.25 2A2.25 2.25 0 002 4.25v2.5A2.25 2.25 0 004.25 9h2.5A2.25 2.25 0 009 6.75v-2.5A2.25 2.25 0 006.75 2h-2.5zm0 9A2.25 2.25 0 002 13.25v2.5A2.25 2.25 0 004.25 18h2.5A2.25 2.25 0 009 15.75v-2.5A2.25 2.25 0 006.75 11h-2.5zm9-9A2.25 2.25 0 0011 4.25v2.5A2.25 2.25 0 0013.25 9h2.5A2.25 2.25 0 0018 6.75v-2.5A2.25 2.25 0 0015.75 2h-2.5zm0 9A2.25 2.25 0 0011 13.25v2.5A2.25 2.25 0 0013.25 18h2.5A2.25 2.25 0 0018 15.75v-2.5A2.25 2.25 0 0015.75 11h-2.5z" clip-rule="evenodd" />
                      </svg>
                    </button> */}
                    {/* <button type="button" className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden">
                      <span className="sr-only">Filters</span>
                      <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 01.628.74v2.288a2.25 2.25 0 01-.659 1.59l-4.682 4.683a2.25 2.25 0 00-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 018 18.25v-5.757a2.25 2.25 0 00-.659-1.591L2.659 6.22A2.25 2.25 0 012 4.629V2.34a.75.75 0 01.628-.74z" clip-rule="evenodd" />
                      </svg>
                    </button> */}
                  </div>
                </div>

                <section aria-labelledby="products-heading" className="pb-24 pt-6">
                  <h2 id="products-heading" className="sr-only">Products</h2>

                  <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                    <form className="hidden lg:block">
                      <h3 className="sr-only">Categories</h3>
                      <ul role="list" className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
                        <li>
                          <a href="/">Totes</a>
                        </li>
                        <li>
                          <a href="/">Backpacks</a>
                        </li>
                        <li>
                          <a href="/">Travel Bags</a>
                        </li>
                        <li>
                          <a href="/">Hip Bags</a>
                        </li>
                        <li>
                          <a href="/">Laptop Sleeves</a>
                        </li>
                      </ul>

                      <div className="border-b border-gray-200 py-6">
                        <h3 className="-my-3 flow-root">
                          <button type="button" className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500" aria-controls="filter-section-0" aria-expanded="false">
                            <span className="font-medium text-gray-900">Color</span>
                            <span className="ml-6 flex items-center">
                              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                              </svg>
                              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z" clip-rule="evenodd" />
                              </svg>
                            </span>
                          </button>
                        </h3>
                        <div className="pt-6" id="filter-section-0">
                          <div className="space-y-4">
                            <div className="flex items-center">
                              <input id="filter-color-0" name="color[]" value="white" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                              </input>
                              <label for="filter-color-0" className="ml-3 text-sm text-gray-600">White</label>
                            </div>
                            <div className="flex items-center">
                              <input id="filter-color-1" name="color[]" value="beige" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                              </input>
                              <label for="filter-color-1" className="ml-3 text-sm text-gray-600">Beige</label>
                            </div>
                            <div className="flex items-center">
                              <input id="filter-color-2" name="color[]" value="blue" type="checkbox" checked className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                              </input>
                              <label for="filter-color-2" className="ml-3 text-sm text-gray-600">Blue</label>
                            </div>
                            <div className="flex items-center">
                              <input id="filter-color-3" name="color[]" value="brown" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                              </input>
                              <label for="filter-color-3" className="ml-3 text-sm text-gray-600">Brown</label>
                            </div>
                            <div className="flex items-center">
                              <input id="filter-color-4" name="color[]" value="green" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                              </input>
                              <label for="filter-color-4" className="ml-3 text-sm text-gray-600">Green</label>
                            </div>
                            <div className="flex items-center">
                              <input id="filter-color-5" name="color[]" value="purple" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                              </input>
                              <label for="filter-color-5" className="ml-3 text-sm text-gray-600">Purple</label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="border-b border-gray-200 py-6">
                        <h3 className="-my-3 flow-root">
                          <button type="button" className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500" aria-controls="filter-section-1" aria-expanded="false">
                            <span className="font-medium text-gray-900">Category</span>
                            <span className="ml-6 flex items-center">
                              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                              </svg>
                              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z" clip-rule="evenodd" />
                              </svg>
                            </span>
                          </button>
                        </h3>
                        <div className="pt-6" id="filter-section-1">
                          <div className="space-y-4">
                            <div className="flex items-center">
                              <input id="filter-category-0" name="category[]" value="new-arrivals" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                              </input>
                              <label for="filter-category-0" className="ml-3 text-sm text-gray-600">New Arrivals</label>
                            </div>
                            <div className="flex items-center">
                              <input id="filter-category-1" name="category[]" value="sale" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                              </input>
                              <label for="filter-category-1" className="ml-3 text-sm text-gray-600">Sale</label>
                            </div>
                            <div className="flex items-center">
                              <input id="filter-category-2" name="category[]" value="travel" type="checkbox" checked className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                              </input>
                              <label for="filter-category-2" className="ml-3 text-sm text-gray-600">Travel</label>
                            </div>
                            <div className="flex items-center">
                              <input id="filter-category-3" name="category[]" value="organization" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                              </input>
                              <label for="filter-category-3" className="ml-3 text-sm text-gray-600">Organization</label>
                            </div>
                            <div className="flex items-center">
                              <input id="filter-category-4" name="category[]" value="accessories" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                              </input>
                              <label for="filter-category-4" className="ml-3 text-sm text-gray-600">Accessories</label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="border-b border-gray-200 py-6">
                        <h3 className="-my-3 flow-root">
                          <button type="button" className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500" aria-controls="filter-section-2" aria-expanded="false">
                            <span className="font-medium text-gray-900">Size</span>
                            <span className="ml-6 flex items-center">
                              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                              </svg>
                              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z" clip-rule="evenodd" />
                              </svg>
                            </span>
                          </button>
                        </h3>
                        <div className="pt-6" id="filter-section-2">
                          <div className="space-y-4">
                            <div className="flex items-center">
                              <input id="filter-size-0" name="size[]" value="2l" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                              </input>
                              <label for="filter-size-0" className="ml-3 text-sm text-gray-600">2L</label>
                            </div>
                            <div className="flex items-center">
                              <input id="filter-size-1" name="size[]" value="6l" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                              </input>
                              <label for="filter-size-1" className="ml-3 text-sm text-gray-600">6L</label>
                            </div>
                            <div className="flex items-center">
                              <input id="filter-size-2" name="size[]" value="12l" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                              </input>
                              <label for="filter-size-2" className="ml-3 text-sm text-gray-600">12L</label>
                            </div>
                            <div className="flex items-center">
                              <input id="filter-size-3" name="size[]" value="18l" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                              </input>
                              <label for="filter-size-3" className="ml-3 text-sm text-gray-600">18L</label>
                            </div>
                            <div className="flex items-center">
                              <input id="filter-size-4" name="size[]" value="20l" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                              </input>
                              <label for="filter-size-4" className="ml-3 text-sm text-gray-600">20L</label>
                            </div>
                            <div className="flex items-center">
                              <input id="filter-size-5" name="size[]" value="40l" type="checkbox" checked className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                              </input>
                              <label for="filter-size-5" className="ml-3 text-sm text-gray-600">40L</label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>


                    <div className="lg:col-span-3">
                      <div className="bg-white">
                        <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
                          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>



                          <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">

                            {products &&
                              products.map((product) => (
                                // <ProductCard key={product._id} product={product} />


                                <div className="group relative border rounded-[15px]">
                                  <div className="aspect-h-1 aspect-w-1 w-full border rounded-t-[15px] overflow-hidden bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                    <img src={product.images[0].url} alt="Front of men&#039;s Basic Tee in black." className="h-full max-h-96 w-full object-cover object-center lg:h-full lg:w-full" />
                                  </div>
                                  <div className="flex justify-between p-2 border rounded-b-[15px] bg-[#3A68B8]">
                                    <div>
                                      <h3 className="text-sm text-white overflow-clip h-12 mr-2 ml-2">
                                        <Link to={`/product/${product._id}`}>
                                          <span aria-hidden="true" className="absolute inset-0"></span>
                                          {product.name}
                                        </Link>
                                      </h3>
                                    </div>
                                    <p className="text-sm font-medium text-white">
                                      ₹{product.price}</p>
                                  </div>

                                  {/* <button
                                 onClick={() => addTocartHandler(product._id, 1)}
                                 className=" w-full bg-[#3A68B8] mt-2 text-white p-1 rounded-md">Add to Cart</button> */}
                                </div>

                              ))}


                          </div>
                        </div>
                      </div>

                    </div>


                  </div>
                </section>
              </main >

            </div >
          </div >
        </>
      )}
      </>
    // <>
    //   {loading ? (
    //     <Loader />
    //   ) : (
    //     <>
    //       <MetaData title="PRODUCTS --Ecart" />
    //       {products === undefined || products.length === 0 ? (
    //         <>
    //           <div
    //             className="emptyCartContainer "
    //             style={{ marginTop: "5rem", background: "white" }}
    //           >
    //             <InventoryIcon className="cartIcon" />

    //             <Typography variant="h5" component="h1" className="cartHeading">
    //               Product Not Found
    //             </Typography>
    //             <Typography variant="body" className="cartText">
    //               Nothin' to see here.
    //             </Typography>
    //             <Typography variant="body" className="cartText">
    //               There is no product with this name
    //             </Typography>

    //             <Button
    //               className="shopNowButton"
    //               onClick={() => window.location.reload()}
    //               style={{ width: "7rem" }}
    //             >
    //               Refresh
    //             </Button>
    //           </div>
    //         </>
    //       ) : (
    //         <div className="productPage">
    //           <div className="prodcutPageTop">
    //             <div className="filterBox">
    //               {/* Price */}
    //               <div className="priceFilter">
    //                 <Typography
    //                   style={{
    //                     fontSize: "18px",
    //                     padding: "5px",
    //                     fontWeight: 700,
    //                     color: "#414141",
    //                   }}
    //                 >
    //                   Price
    //                 </Typography>
    //                 <div className="priceSlider">
    //                   <Slider
    //                     value={price}
    //                     onChange={priceHandler}
    //                     min={0}
    //                     max={100000}
    //                     step={100}
    //                     valueLabelDisplay="auto"
    //                     aria-labelledby="range-slider"
    //                   />
    //                 </div>
    //                 <div className="priceSelectors">
    //                   <div className="priceSelector">
    //                     <Select
    //                       value={price[0]}
    //                       onChange={(e) =>
    //                         setPrice([+e.target.value, price[1]])
    //                       }
    //                       className="priceOption"
    //                       IconComponent={ArrowDropDownIcon}
    //                       renderValue={(selected) =>
    //                         selected !== "" ? selected : "min"
    //                       } // Display "min" as default label
    //                     >
    //                       <MenuItem value={5000} className="menu_item">
    //                         5000
    //                       </MenuItem>
    //                       <MenuItem value={10000} className="menu_item">
    //                         10000
    //                       </MenuItem>
    //                       {/* Add more options as per your requirement */}
    //                     </Select>
    //                     <span className="toText">to</span>
    //                     <Select
    //                       value={price[1]}
    //                       onChange={(e) =>
    //                         setPrice([price[0], +e.target.value])
    //                       }
    //                       className="priceOption"
    //                       IconComponent={ArrowDropDownIcon}
    //                       renderValue={(selected) =>
    //                         selected !== "" ? selected : "max"
    //                       }
    //                     >
    //                       <MenuItem value={50000} className="menu_item">
    //                         50000
    //                       </MenuItem>
    //                       <MenuItem value={20000} className="menu_item">
    //                         20000
    //                       </MenuItem>
    //                       {/* Add more options as per your requirement */}
    //                     </Select>
    //                   </div>
    //                 </div>
    //               </div>

    //               <div className="filter_divider"></div>

    //               {/* Categories */}
    //               <div className="categoriesFilter">
    //                 <Typography
    //                   style={{
    //                     fontSize: "18px",
    //                     padding: "10px",
    //                     fontWeight: 700,
    //                     color: "#414141",
    //                   }}
    //                 >
    //                   Categories
    //                 </Typography>
    //                 <ul className="categoryBox">
    //                   {categories.map((category, index) => (
    //                     <li className="category-link" key={index}>
    //                       <label
    //                         htmlFor={`category-${index}`}
    //                         className="category-label"
    //                       >
    //                         <input
    //                           type="checkbox"
    //                           id={`category-${index}`}
    //                           className="category-checkbox"
    //                           value={category}
    //                           checked={category === selectedCategory}
    //                           onChange={() => handleCategoryChange(category)}
    //                         />
    //                         {category}
    //                       </label>
    //                     </li>
    //                   ))}
    //                 </ul>
    //               </div>

    //               <div className="filter_divider"></div>
    //               {/* Ratings */}
    //               <div className="ratingsFilter">
    //                 <Typography
    //                   style={{
    //                     fontSize: "18px",
    //                     padding: "10px",
    //                     fontWeight: 700,
    //                     color: "#414141",
    //                   }}
    //                 >
    //                   Ratings Above
    //                 </Typography>
    //                 <RadioGroup
    //                   value={selectedRating}
    //                   onChange={handleRatingChange}
    //                   row
    //                   className="ratingsBox"
    //                 >
    //                   <FormControlLabel
    //                     value="4"
    //                     control={<Radio />}
    //                     label="4★ & above"
    //                   />
    //                   <FormControlLabel
    //                     value="3"
    //                     control={<Radio />}
    //                     label="3★ & above"
    //                   />
    //                   <FormControlLabel
    //                     value="2"
    //                     control={<Radio />}
    //                     label="2★ & above"
    //                   />
    //                 </RadioGroup>
    //               </div>
    //               <div className="filter_divider"></div>
    //               {/* Clear Filters */}
    //             </div>

    //             <div
    //               className={products.length < 2 ? "products1" : "products"}
    //             >
    //               {products &&
    //                 products.map((product) => (
    //                   <ProductCard key={product._id} product={product} />
    //                 ))}
    //             </div>
    //           </div>

    //           {/* Pagination */}

    //           <div className="paginationBox">
    //             <Pagination
    //               activePage={currentPage}
    //               itemsCountPerPage={resultPerPage}
    //               totalItemsCount={productsCount}
    //               onChange={setCurrentPageNoHandler}
    //               nextPageText="Next"
    //               prevPageText="Prev"
    //               firstPageText="First"
    //               lastPageText="Last"
    //               itemClass="page-item"
    //               linkClass="page-link"
    //               activeClass="pageItemActive"
    //               activeLinkClass="pageLinkActive"
    //             />
    //           </div>

    //         </div>
    //       )}
    //     </>
    //   )}
    // </>
  );
}

export default Products;
