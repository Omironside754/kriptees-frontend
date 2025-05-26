import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearErrors, getProduct } from "../../actions/productAction";
import { toast } from "react-toastify";
import MetaData from "../Layouts/MetaData/MetaData";
import ProductCard from "./ProductCard";
import "./Home.css";


const bannerImg = "https://res.cloudinary.com/dafv5daza/image/upload/q_auto,f_auto,w_1600/ecommerce%20images/banner_zqp2qu.png";
const downImg = "https://res.cloudinary.com/dafv5daza/image/upload/q_auto,f_auto,w_1600/ecommerce%20images/downimg_lv43ag.png";
const midImg = "https://res.cloudinary.com/dafv5daza/image/upload/q_auto,f_auto,w_1600/ecommerce%20images/midimg_wqrjeu.png";
const mobBannerImg = "https://res.cloudinary.com/dafv5daza/image/upload/q_auto,f_auto,w_800/ecommerce%20images/mobBanner_fmqsla.png";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, products } = useSelector((state) => state.products);
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const features = [
    {
      title: "SHIPPING PAN INDIA",
      lines: ["MADE IN INDIA", "DELIVERING PAN INDIA"]
    },
    {
      title: "FREE RETURN AND EXCHANGE",
      lines: ["7 DAYS EASY RETURNS", "NO QUESTIONS ASKED"]
    },
    {
      title: "100% HOME GROWN BRAND",
      lines: ["PRODUCTS ARE 100%", "MADE IN INDIA"]
    }
  ];

 useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error]);


  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    let interval;
    if (isMobile) {
      interval = setInterval(() => {
        setActiveFeatureIndex(prev => (prev + 1) % features.length);
      }, 3000);
    }
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearInterval(interval);
    };
  }, [isMobile]);

  const topPicks = products.filter(p =>
    p.tags?.some(tag =>
      tag.toLowerCase().includes("new") || tag.toLowerCase().includes("arriv")
    )
  );

  const Tshirt = products.filter(p => p.category === "T-shirt");
  const hoodies = products.filter(p => p.category === "Hoodie");

  return (
    <>
      <MetaData title="Kriptees" />
      <div className="Home_Page">
        <div className="w-full">
          <img
            src={bannerImg}
            alt="Desktop Banner"
            loading="lazy"
            className="w-full h-auto hidden md:block"
          />
          <img
            src={mobBannerImg}
            alt="Mobile Banner"
            loading="lazy"
            className="w-full pt-14 h-auto block md:hidden"
          />
        </div>

        <div className="bg-black text-white py-2 overflow-hidden"
          style={{ fontFamily: "Montserrat", letterSpacing: "0.2rem" }}>
          <div className="marquee flex whitespace-nowrap">
            <span className="text-sm md:text-[1.2rem] uppercase tracking-widest px-4 inline-block">
              NEW ARRIVALS EVERY MONTH! &nbsp; NEW ARRIVALS EVERY MONTH! &nbsp;
              NEW ARRIVALS EVERY MONTH! &nbsp; NEW ARRIVALS EVERY MONTH! &nbsp;
            </span>
          </div>
        </div>

        {topPicks.length > 0 && (
          <>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-widest py-4 mx-4 md:m-8 md:px-10 md:py-4">
              TOP PICKS
            </h2>
            <div className="mt-4 md:mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-8 px-3 md:px-8">
              {topPicks.slice(0, 8).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
            <div className="flex justify-center mt-6 md:mt-8">
              <button
                onClick={() => navigate("/NewArrival")}
                className="bg-white text-gray-800 font-Ponnala px-4 py-2 md:px-6 md:py-3 uppercase tracking-widest border border-gray-950 rounded-lg hover:bg-gray-400 transition-colors"
              >
                View All
              </button>
            </div>
          </>
        )}

        <div className="w-full mt-6 md:mt-8">
          <img src={midImg} alt="Banner" loading="lazy" className="w-full h-auto" />
        </div>

        {Tshirt.length > 0 && (
          <>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-widest py-4 mx-4 md:m-8 md:px-10 md:py-4">
              T-SHIRT
            </h2>
            <div className="mt-4 md:mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-8 px-3 md:px-8">
              {Tshirt.slice(0, 4).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
            <div className="flex justify-center mt-6 md:mt-8">
              <button
                onClick={() => navigate("/Tshirt")}
                className="p-2 rounded-full border border-black hover:bg-gray-300 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 md:w-8 md:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 8l8 8 8-8" />
                </svg>
              </button>
            </div>
          </>
        )}

        {hoodies.length > 0 && (
          <>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-widest py-4 mx-4 md:m-8 md:px-10 md:py-4">
              HOODIES
            </h2>
            <div className="mt-4 md:mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-8 px-3 md:px-8">
              {hoodies.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
            <div className="flex justify-center mt-6 md:mt-8">
              <button
                onClick={() => navigate("/Hoodies")}
                className="p-2 rounded-full border border-black hover:bg-gray-300 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 md:w-8 md:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 8l8 8 8-8" />
                </svg>
              </button>
            </div>
          </>
        )}

        <div className="mt-8 border-y-2 border-slate-200 py-6"
          style={{ fontFamily: "Montserrat", letterSpacing: "0.2rem" }}>
          <div className="hidden md:flex md:flex-row justify-center items-center gap-[20rem] tracking-widest text-center px-4">
            {features.map((feature, index) => (
              <div key={index} className="max-w-xs">
                <h3 className="font-bold text-sm uppercase mb-1 underline underline-offset-4 py-2">
                  {feature.title}
                </h3>
                <p className="text-xs text-gray-700">
                  {feature.lines[0]}<br />{feature.lines[1]}
                </p>
              </div>
            ))}
          </div>

          <div className="block md:hidden flex flex-col justify-center items-center tracking-widest text-center px-4"
            style={{ fontFamily: "Montserrat", letterSpacing: "0.2rem" }}>
            <div className="relative h-[5rem] w-full overflow-hidden">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 transform
                    ${index === activeFeatureIndex ? 'translate-x-0 opacity-100' :
                      index === (activeFeatureIndex + 1) % features.length ? 'translate-x-full opacity-0' :
                        '-translate-x-full opacity-0'}`}
                >
                  <div className="max-w-xs mx-auto">
                    <h3 className="font-bold text-sm uppercase mb-1 underline underline-offset-4 py-2">
                      {feature.title}
                    </h3>
                    <p className="text-xs text-gray-700">
                      {feature.lines[0]}<br />{feature.lines[1]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full">
          <img src={downImg} alt="Promotional Banner" loading="lazy" className="w-full h-auto" />
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee {
          animation: marquee 10s linear infinite;
        }
      `}</style>
    </>
  );
}

export default Home;
