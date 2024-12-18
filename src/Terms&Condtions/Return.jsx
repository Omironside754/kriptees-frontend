import React from "react";
import { Link } from "react-router-dom";
import MetaData from "../component/Layouts/MetaData/MetaData";
const ReturnPolicyPage = () => {
  return (
    <div className="">
      <MetaData title="Return Policy" />
      <div className=" mt-20">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Cancellation & Refund Policy</h3>
              {/* <p className="mt-1 max-w-2xl text-sm text-gray-500">Last updated on 19-05-2024 15:01:43</p> */}
            </div>
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500"></dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    <p>KRISHNA SINGH believes in helping its customers as far as possible, and has therefore a liberal cancellation policy. Under this policy:</p>
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500"></dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Cancellations will be considered only if the request is made immediately after placing the order. However, the cancellation request may not be entertained if the orders have been communicated to the vendors/merchants and they have initiated the process of shipping them.</li>
                      <li>KRISHNA SINGH does not accept cancellation requests for perishable items like flowers, eatables etc. However, refund/replacement can be made if the customer establishes that the quality of product delivered is not good.</li>
                      <li>In case of receipt of damaged or defective items please report the same to our Customer Service team. The request will, however, be entertained once the merchant has checked and determined the same at his own end. This should be reported within 7 Days days of receipt of the products.</li>
                      <li>In case you feel that the product received is not as shown on the site or as per your expectations, you must bring it to the notice of our customer service within 7 Days days of receiving the product. The Customer Service Team after looking into your complaint will take an appropriate decision.</li>
                      <li>In case of complaints regarding products that come with a warranty from manufacturers, please refer the issue to them.</li>
                      <li>In case of any Refunds approved by the KRISHNA SINGH, it'll take 6-8 Days days for the refund to be processed to the end customer.</li>
                    </ul>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicyPage;
