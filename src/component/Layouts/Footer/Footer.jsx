import { Link } from "react-router-dom";
import {
  FaRupeeSign,
  FaGooglePay,
  FaCcAmazonPay,
  FaCcMastercard,
  FaCcApplePay,
} from "react-icons/fa";
import { SiPhonepe, SiPaytm, SiPaypal } from "react-icons/si";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { MdCached } from "react-icons/md";
import logo from "../../../ecommerce images/logo.png"; // Make sure to update this path

const Footer = () => {
  return (
    <footer className="bg-[rgb(57,104,184)] text-white flex flex-col align-middle justify-center items-center w-full mt-32">
      <div className="  gap-5  mb-8 lg:flex justify-center ">
        <div className=" m-3 mt-6 flex flex-col justify-center">
          <Link
            to="/"
            aria-label="Go home"
            title="Company"
            className="inline-flex items-center">
            <img src={logo} alt="Kriptees Logo" className="h-10" />{" "}
            {/* Adjust height as needed */}
          </Link>
          <div className="mt-3 lg:max-w-sm flex items-center">
            <FaRupeeSign className="mr-2" />
            <span>COD available</span>
          </div>
          <div className=" lg:max-w-sm flex items-center">
            <MdCached className="mr-2" />
            <span>7 days easy return</span>
          </div>
          <div className=" lg:max-w-sm flex items-center">
            <span>100% secure payment with </span>
            <FaGooglePay className="mx-2" style={{ fontSize: "1.5em" }} />
            <FaCcAmazonPay className="mr-2" />
            <FaCcMastercard className="mr-2" />
            <FaCcApplePay className="mr-2" />
            <SiPhonepe className="mr-2" />
            <SiPaytm className="mr-2" />
            <SiPaypal className="mr-2" />
          </div>
        </div>

        <div className="m-3 space-y-2 text-sm flex flex-col justify-center">
          <p className="text-base font-bold tracking-wide text-white">
            Contacts
          </p>
          <div className="flex">
            <p className="mr-1 text-white">Phone:</p>
            <a
              href="tel:850-123-5021"
              aria-label="Our phone"
              title="Our phone"
              className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800">
              7079604172
            </a>
          </div>
          <div className="flex">
            <p className="mr-1 text-white">Email:</p>
            <a
              href="mailto:info@lorem.mail"
              aria-label="Our email"
              title="Our email"
              className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800">
              kriptees@gmail.com
            </a>
          </div>
          <div className="flex">
            <p className="mr-1 text-white">Address:</p>
            <a
              href="https://www.google.com/maps"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Our address"
              title="Our address"
              className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800">
              D 12 sector 27 Noida, Near Anjali Market, Noida, Uttar Pradesh
            </a>
          </div>
        </div>

        <div className="m-3 flex flex-col justify-center">
          <span className="text-base font-bold tracking-wide text-white">
            Social
          </span>
          <div className="flex items-center mt-1 space-x-3 ">
            <div className="flex justify-center items-center space-x-4">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-800">
                <FaFacebook className="w-8 h-8" />
              </a>
              <a
                href="https://www.instagram.com/kriptees_official/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-pink-800">
                <FaInstagram className="w-8 h-8" />
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-red-800">
                <FaYoutube className="w-8 h-8" />
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-600">
                <FaYoutube className="w-8 h-8" />
              </a>
            </div>
          </div>
          <p className="mt-4 text-sm text-white">Reach out to us for more...</p>
        </div>
      </div>

      <div className="bg-[#443D83] w-full justify-between pt-5 pb-10 lg:flex-row">
        <ul class="flex flex-col items-center space-y-2 lg:flex-row lg:justify-center lg:space-x-5 lg:space-y-0 mb-3">
          <li>
            <Link
              to="/PrivacyPolicy"
              class="text-sm text-white transition-colors duration-300 hover:text-deep-purple-accent-400">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link
              to="/TermsandConditions"
              class="text-sm text-white transition-colors duration-300 hover:text-deep-purple-accent-400">
              Terms & Conditions
            </Link>
          </li>
          <li>
            <Link
              to="/ShipandDelivery"
              class="text-sm text-white transition-colors duration-300 hover:text-deep-purple-accent-400">
              Terms of Use
            </Link>
          </li>
          <li>
            <Link
              to="/RefundandCancellation"
              className="text-sm text-white  transition-colors duration-300 hover:text-deep-purple-accent-400">
              Refund Policy
            </Link>
          </li>
          <li>
            <Link
              to="/ContactUs"
              className="text-sm text-white  transition-colors duration-300 hover:text-deep-purple-accent-400">
              Contact Us
            </Link>
          </li>
        </ul>

        <p className="text-sm text-white text-center">
          © 2024 Kriptees, All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
