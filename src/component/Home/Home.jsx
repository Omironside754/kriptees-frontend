import MetaData from "../Layouts/MetaData/MetaData";
import ProductCard from "./ProductCard";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import FeaturedSlider from "./FeatureSlider";
import "./Home.css";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import img1 from '../../ecommerce images/1L.png';
import img2 from '../../ecommerce images/2L.png';
import img3 from '../../ecommerce images/3L.png';
import img4 from '../../ecommerce images/4L.png';
import img1P from '../../ecommerce images/1.png';
import img2P from '../../ecommerce images/2.png';
import img3P from '../../ecommerce images/3.png';
import img4P from '../../ecommerce images/4.png';
import image from '../../ecommerce images/img.png';

function Home() {
    const arr = [img1, img2, img3, img4];
    const arrP = [img1P, img2P, img3P, img4P];

    const [i, setI] = useState(0);
    const [img, setImg] = useState(arr[i]);
    const [imgP, setImgP] = useState(arrP[i]);

    useEffect(() => {
        const interval = setInterval(() => {
            setI((prevIndex) => (prevIndex === 3 ? 0 : prevIndex + 1));
        }, 3000); // Change slide every 3 seconds

        return () => clearInterval(interval); // Clean up the interval on unmount
    }, []);

    useEffect(() => {
        setImg(arr[i]);
        setImgP(arrP[i]);
    }, [i]);

    const dispatch = useDispatch();
    const { loading, error, products } = useSelector((state) => state.products);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct());
    }, [dispatch, error]);

    return (
        <>
            <MetaData title="Kriptees" />
            <div className="Home_Page">
                <div id="default-carousel" className="relative w-full py-2 mt-20 lg:mt-24" data-carousel="slide">
                    <div className="relative h-80 md:h-96 lg:h-[500px] overflow-hidden rounded-lg">
                        <div className="w-full h-full duration-700 ease-in-out transition-opacity transform lg:block hidden">
                            <img src={img} className="absolute block w-full h-full object-cover" alt="Slide" />
                        </div>
                        <div className="w-full h-full duration-700 ease-in-out transition-opacity transform lg:hidden block">
                            <img src={imgP} className="absolute block w-full h-full object-cover" alt="Slide" />
                        </div>
                    </div>
                    <button onClick={() => setI(i === 0 ? 3 : i - 1)} type="button" className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                            <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                            </svg>
                            <span className="sr-only">Previous</span>
                        </span>
                    </button>
                    <button onClick={() => setI(i === 3 ? 0 : i + 1)} type="button" className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                            <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                            </svg>
                            <span className="sr-only">Next</span>
                        </span>
                    </button>
                </div>
                <div className="bg-[#11A3CA] py-6 text-center">
                    <h2 className="text-white font-semibold text-xl sm:text-2xl mb-4">Find Your Vibe With Kriptees</h2>
                    <div className="flex flex-col sm:flex-row justify-center p-5 space-y-2 sm:space-y-0 sm:space-x-4">
                        <button className="bg-[#F5F5DC] px-4 py-2 rounded-md">Basics from 399Rs</button>
                        <button className="bg-[#F5F5DC] px-4 py-2 rounded-md">Classic from 499Rs</button>
                        <button className="bg-[#F5F5DC] px-4 py-2 rounded-md">Combos from 599Rs</button>
                    </div>
                </div>
                <div className="hidden lg:block">
                    <h2 className="text-center font-semibold text-2xl m-4">
                        Trending Category
                    </h2>
                    {products && <FeaturedSlider products={products} />}
                </div>
                <h2 className="text-center font-semibold text-2xl m-8">Special Collection</h2>
                <div className="mt-6 grid grid-cols-2 lg:gap-x-6 lg:gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {products && products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
                <div className="bg-white py-2 flex flex-col items-center">
                    <img src={image} alt="Promotional Banner" className="max-w-full h-auto" />
                </div>
            </div>
        </>
    );
}

export default Home;
