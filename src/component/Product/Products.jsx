import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import { toast } from 'react-toastify';
import Loader from "../Layouts/loader/Loader";
import MetaData from "../Layouts/MetaData/MetaData";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Filter } from 'lucide-react';

// Default filter values
const DEFAULT_FILTERS = {
  price: [0, 25000],
  category: "",
  ratings: 0,
  currentPage: 1,
  sortBy: "newest"
};

// Price range slider component stays the same
const PriceRangeSlider = ({ value, onChange }) => {
  const [minValue, setMinValue] = useState(value[0]);
  const [maxValue, setMaxValue] = useState(value[1]);

  useEffect(() => {
    setMinValue(value[0]);
    setMaxValue(value[1]);
  }, [value]);

  const getPercent = (value) => {
    return ((value - 0) / (25000 - 0)) * 100;
  };

  const handleMinChange = (event) => {
    const value = Math.min(Number(event.target.value), maxValue - 1);
    setMinValue(value);
    onChange([value, maxValue]);
  };

  const handleMaxChange = (event) => {
    const value = Math.max(Number(event.target.value), minValue + 1);
    setMaxValue(value);
    onChange([minValue, value]);
  };

  return (
    <div className="w-full px-4 py-2">
      <div className="flex items-center justify-between mb-2">
        <span className="text-base font-medium">₹{minValue}</span>
        <span className="text-base font-medium">₹{maxValue}</span>
      </div>

      <div className="relative h-8 mb-4">
        <div className="absolute w-full h-1 bg-blue-200 rounded top-1/2 transform -translate-y-1/2">
          <div
            className="absolute h-full bg-blue-600 rounded"
            style={{
              left: `${getPercent(minValue)}%`,
              width: `${getPercent(maxValue) - getPercent(minValue)}%`
            }}
          />
        </div>

        <input
          type="range"
          min={0}
          max={25000}
          value={minValue}
          onChange={handleMinChange}
          className="absolute w-full top-1/2 -translate-y-1/2 h-1 pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
        />

        <input
          type="range"
          min={0}
          max={25000}
          value={maxValue}
          onChange={handleMaxChange}
          className="absolute w-full top-1/2 -translate-y-1/2 h-1 pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
        />
      </div>
    </div>
  );
};

const categories = ["Clothing", "T-shirt", "Hoodies"];

const Products = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const {
    products,
    filterdProductCount = 0,
    loading,
    error,
  } = useSelector((state) => state.products);

  // Initialize states
  const [currentFilters, setCurrentFilters] = useState(() => {
    if (!sessionStorage.getItem('navigationState')) {
      sessionStorage.setItem('navigationState', 'initial');
      return DEFAULT_FILTERS;
    }
    const storedFilters = sessionStorage.getItem('productFilters');
    return storedFilters ? JSON.parse(storedFilters) : DEFAULT_FILTERS;
  });

  const [pendingFilters, setPendingFilters] = useState(() => {
    const storedFilters = sessionStorage.getItem('productFilters');
    return storedFilters ? JSON.parse(storedFilters) : DEFAULT_FILTERS;
  });

  const [sortOpen, setSortOpen] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const PRODUCTS_PER_PAGE = 12;

  // Handle page refresh
  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.removeItem('navigationState');
      sessionStorage.removeItem('productFilters');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // Handle product navigation
  useEffect(() => {
    if (location.pathname === '/products') {
      const storedFilters = sessionStorage.getItem('productFilters');
      if (storedFilters) {
        setCurrentFilters(JSON.parse(storedFilters));
        setPendingFilters(JSON.parse(storedFilters));
      }
    }
  }, [location]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(
      "",
      currentFilters.currentPage,
      currentFilters.price,
      currentFilters.category,
      currentFilters.ratings,
      currentFilters.sortBy
    ));
  }, [dispatch, error, currentFilters]);

  // Update filters in storage whenever they change
  useEffect(() => {
    sessionStorage.setItem('productFilters', JSON.stringify(currentFilters));
  }, [currentFilters]);

  const handlePriceChange = (priceRange) => {
    setPendingFilters(prev => ({ ...prev, price: priceRange }));
  };

  const handleCategoryChange = (cat) => {
    setPendingFilters(prev => ({
      ...prev,
      category: cat === prev.category ? "" : cat
    }));
  };

  const handleRatingChange = (rating) => {
    setPendingFilters(prev => ({
      ...prev,
      ratings: rating === prev.ratings ? 0 : rating
    }));
  };

  const handleSort = (sortType) => {
    const newFilters = { ...pendingFilters, sortBy: sortType, currentPage: 1 };
    setPendingFilters(newFilters);
    setCurrentFilters(newFilters);
    setSortOpen(false);
  };

  const applyFilters = () => {
    const newFilters = { ...pendingFilters, currentPage: 1 };
    setCurrentFilters(newFilters);
  };

  const resetFilters = () => {
    setPendingFilters(DEFAULT_FILTERS);
    setCurrentFilters(DEFAULT_FILTERS);
    sessionStorage.removeItem('productFilters');
  };

  const toggleFilters = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const handlePageChange = (page) => {
    const newFilters = { ...currentFilters, currentPage: page };
    setPendingFilters(newFilters);
    setCurrentFilters(newFilters);
  };

  const getPaginationArray = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filterdProductCount / PRODUCTS_PER_PAGE) && i <= 10; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Products" />
          <div className="bg-white min-h-screen">
            <div className="text-center py-2 bg-red-500 text-white">
              free delivery on first order above 499rs
            </div>
            
            <main className="mx-auto max-w-screen px-4 sm:px-6 lg:px-8">
              {/* Rest of the JSX remains unchanged... */}
              {/* Header Section */}
              <div className="flex items-center justify-between border-b border-black-200 pb-6 pt-24">
                <div className="flex items-center gap-4">
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900">Products</h1>
                  
                  <button 
                    onClick={toggleFilters}
                    className="lg:hidden flex items-center gap-2 px-3 py-2 border rounded-md"
                  >
                    <Filter size={20} />
                    <span>Filters</span>
                  </button>
                </div>
                
                <div className="relative">
                  <button 
                    onClick={() => setSortOpen(!sortOpen)}
                    className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
                  >
                    Sort
                    <svg className="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </button>
                  
                  {sortOpen && (
                    <div className="absolute right-0 z-20 mt-2 w-40 bg-white shadow-lg rounded-md">
                      {["Newest", "Price: Low to High", "Price: High to Low", "Rating"].map((option) => (
                        <button
                          key={option}
                          onClick={() => handleSort(option.toLowerCase())}
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <section className="pb-24 pt-6">
                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                  {/* Filters Sidebar */}
                  <div className={`
                    lg:block
                    ${isFilterVisible ? 'block' : 'hidden'}
                    fixed lg:relative top-0 left-0 w-full lg:w-auto h-full lg:h-auto
                    bg-white lg:bg-transparent z-10 overflow-y-auto
                    p-4 lg:p-0
                  `}>
                    {/* Mobile Close Button */}
                    <div className="lg:hidden flex justify-between items-center mb-4">
                      <h2 className="text-lg font-semibold">Filters</h2>
                      <button 
                        onClick={toggleFilters}
                        className="p-2 hover:bg-gray-100 rounded-full"
                      >
                        <X size={24} />
                      </button>
                    </div>

                    {/* Filter Content */}
                    <div className="space-y-6">
                      <div className="border-b border-gray-200 py-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Price Range</h3>
                        <PriceRangeSlider
                          value={pendingFilters.price}
                          onChange={handlePriceChange}
                        />
                      </div>

                      <div className="border-b border-gray-200 py-6">
                        <h3 className="text-lg font-medium text-gray-900">Categories</h3>
                        <div className="mt-4 space-y-4">
                          {categories.map((cat) => (
                            <div key={cat} className="flex items-center">
                              <input
                                type="checkbox"
                                checked={pendingFilters.category === cat}
                                onChange={() => handleCategoryChange(cat)}
                                className="h-4 w-4 rounded border-gray-300"
                              />
                              <label className="ml-3 text-sm text-gray-600">{cat}</label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="border-b border-gray-200 py-6">
                        <h3 className="text-lg font-medium text-gray-900">Rating</h3>
                        <div className="mt-4 space-y-4">
                          {[4, 3, 2, 1, 0].map((rating) => (
                            <div key={rating} className="flex items-center">
                              <input
                                type="radio"
                                checked={pendingFilters.ratings === rating}
                                onChange={() => handleRatingChange(rating)}
                                className="h-4 w-4"
                              />
                              <label className="ml-3 text-sm text-gray-600">
                                {rating}★ & above
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <button
                          onClick={() => {
                            applyFilters();
                            setIsFilterVisible(false);
                          }}
                          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                          Apply
                        </button>
                        <button
                          onClick={() => {
                            resetFilters();
                            setIsFilterVisible(false);
                          }}
                          className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                        >
                          Reset
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Product Grid */}
                  <div className="lg:col-span-3">
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                      {products?.map((product) => (
                        <div key={product._id} className="group relative border rounded-lg overflow-hidden">
                          <div className="aspect-square w-full overflow-hidden bg-gray-200 group-hover:opacity-75">
                            <img
                              src={product.images[0].url}
                              alt={product.name}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                          <div className="flex flex-col p-3 bg-[#3A68B8]">
                            <Link 
                              to={`/product/${product._id}`} 
                              className="text-sm text-white line-clamp-2"
                            >
                              {product.name}
                            </Link>
                            <p className="text-sm font-medium text-white mt-1">₹{product.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center mt-8 gap-1">
                      {getPaginationArray().map((page) => (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`min-w-[2.5rem] h-10 border ${
                            currentFilters.currentPage === page 
                              ? "bg-blue-500 text-white" 
                              : "bg-white text-gray-700 hover:bg-gray-50"
                          } rounded`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </main>

            {/* Overlay for mobile filter */}
            {isFilterVisible && (
              <div 
                className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-[5]"
                onClick={toggleFilters}
              />
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Products;