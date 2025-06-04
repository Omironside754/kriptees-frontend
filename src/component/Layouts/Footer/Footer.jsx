import React from "react";
import { Link } from "react-router-dom";
import {
  FaRupeeSign,
  FaGooglePay,
  FaCcAmazonPay,
  FaCcMastercard,
  FaCcApplePay,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTwitter,
} from "react-icons/fa";
import { SiPhonepe, SiPaytm, SiPaypal } from "react-icons/si";
import { MdCached } from "react-icons/md";

function Footer() {
  return (
    <footer className="bg-black text-white w-full"
      style={{ fontFamily: "Montserrat", letterSpacing: "0.1rem" }}>
      {/* =========== DESKTOP FOOTER (unchanged) =========== */}
      <div className="hidden md:block">
        {/* Upper Footer Section */}
        <div className="container mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ">

          {/* Column 1: Company */}
          <div>
            <h4 className="text-lg font-bold mb-3">Company</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-gray-400">About Us</Link></li>
              <li><Link to="/careers" className="hover:text-gray-400">Careers</Link></li>
              <li><Link to="/blog" className="hover:text-gray-400">blogs</Link></li>
            </ul>
          </div>

          {/* Column 2: Support */}
          <div>
            <h4 className="text-lg font-bold mb-3">Support</h4>
            <ul className="space-y-2">
              <li><Link to="/contact" className="hover:text-gray-400">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:text-gray-400">FAQ</Link></li>
              <li><Link to="/return" className="hover:text-gray-400">Returns policy</Link></li>
            </ul>
          </div>

          {/* Column 3: Socials */}
          <div>
            <h4 className="text-lg font-bold mb-3">Socials</h4>
            <div className="flex space-x-3">
              <a href="https://www.facebook.com" className="hover:text-blue-500">
                <FaFacebook size={24} />
              </a>
              <a href="https://www.instagram.com" className="hover:text-pink-500">
                <FaInstagram size={24} />
              </a>
              <a href="https://www.youtube.com" className="hover:text-red-500">
                <FaYoutube size={24} />
              </a>
              <a href="https://www.twitter.com" className="hover:text-blue-400">
                <FaTwitter size={24} />
              </a>
            </div>
          </div>

          {/* Column 4: Newsletter */}
          {/* <div className="flex flex-col space-y-3">
            <h4 className="text-lg font-bold">Stay Connected</h4>
            <p className="text-sm text-gray-400">
              Join our newsletter for the latest updates and exclusive offers!
            </p>
            <div className="mt-2 flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
              <input
                type="email"
                placeholder="Email address"
                className="p-2 w-full sm:w-auto rounded-md bg-neutral-800 text-white outline-none placeholder-gray-400"
              />
              <button className="px-5 py-2 bg-neutral-800 text-white rounded-full hover:bg-gray-700 transition">
                Subscribe
              </button>
            </div>
          </div> */}
        </div>

        {/* Lower Footer Section */}
        <div className="border-t border-gray-700 py-6 text-center text-gray-400 text-sm">
          <div className="flex flex-wrap justify-center items-center space-y-3 sm:space-y-0 sm:space-x-8">
            {/* Payment & Features */}
            <div className="flex items-center space-x-3">
              <FaRupeeSign />
              <span>COD Available</span>
            </div>
            <div className="flex items-center space-x-3">
              <MdCached />
              <span>7 Days Easy Return</span>
            </div>
            <div className="flex flex-wrap justify-center sm:flex-nowrap items-center space-x-2">
              <span>100% Secure Payments:</span>
              <FaGooglePay size={24} />
              <FaCcAmazonPay size={24} />
              <FaCcMastercard size={24} />
              <FaCcApplePay size={24} />
              <SiPhonepe size={24} />
              <SiPaytm size={24} />
              <SiPaypal size={24} />
            </div>
          </div>

          {/* Bottom Links */}
          <div className="mt-4">
            <ul className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-5">
              <li><Link to="/privacy" className="text-gray-400 hover:text-gray-200">
                Privacy Policy
              </Link></li>
              <li><Link to="/terms" className="hover:text-white">Terms & Conditions</Link></li>
        
              <li><Link to="/shipping" className="hover:text-white"> Shipping Policy </Link></li>
            </ul>
          </div>

          <p className="mt-2">© 2024 Kriptees, All Rights Reserved.</p>
        </div>
      </div>

      {/* =========== MOBILE FOOTER (new) =========== */}
      <div className="block md:hidden text-center px-4 py-6 space-y-6">
        {/* Heading */}
        {/* <h2 className="text-xl font-bold">Stay Connected</h2> */}

        {/* Email address box (non-functional placeholder) */}
        {/* <div className="mt-4 flex flex-col items-center gap-3 max-w-sm mx-auto">
          <input
            type="email"
            placeholder="Email address"
            className="flex-1 bg-neutral-800 text-gray-300 py-2 px-4 
                      rounded-md focus:outline-none focus:ring-2 
                      focus:ring-neutral-600"
          />
          <button
            className="px-5 py-2 bg-neutral-900 text-white rounded-md 
                      hover:bg-gray-700 transition"
          >
            Subscribe
          </button>
        </div> */}


        {/* Social Icons (Facebook, Instagram, X) */}
        <div className="flex justify-center gap-6 text-2xl text-gray-300">
          <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
            <FaFacebook />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
            <FaInstagram />
          </a>
          {/* Using FaTwitter to represent "X" */}
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <FaTwitter />
          </a>
        </div>

        {/* Bottom links */}
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
          <Link to="/about" className="text-gray-400 hover:text-gray-200">
            About Us
          </Link>
          <Link to="/careers" className="hover:text-gray-200">
            Careers
          </Link>
          <Link to="/blog" className="hover:text-gray-200">
            Blog
          </Link>
          <Link to="/contact" className="hover:text-gray-200">
            Contact Us
          </Link>
          <Link to="/shipping" className="hover:text-gray-200">
            Shipping & Returns
          </Link>
          <Link to="/faq" className="hover:text-gray-200">
            FAQ
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
