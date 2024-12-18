import React from "react";
import { Link } from "react-router-dom";
import MetaData from "../component/Layouts/MetaData/MetaData";

const PrivacyPolicy = () => {
  return (
    <div className="mt-20">
      <MetaData title={"Privacy Policy"} />

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Privacy Policy</h3>
            {/* <p className="mt-1 max-w-2xl text-sm text-gray-500">Last updated on 19-05-2024 15:00:19</p> */}
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">What data is being collected</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Name</li>
                    <li>Contact information including address and email address</li>
                    <li>Demographic information or, preferences or interests</li>
                    <li>Personal Data or Other information relevant/ required for providing the goods or services to you</li>
                  </ul>
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">What we do with the data we gather</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Internal record keeping.</li>
                    <li>For improving our products or services.</li>
                    <li>For providing updates to you regarding our products or services including any special offers.</li>
                    <li>To communicate information to you</li>
                    <li>For internal training and quality assurance purposes</li>
                  </ul>
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Who do we share your data with</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Third parties including our service providers in order to facilitate the provisions of goods or services to you, carry out your requests, respond to your queries, fulfil your orders or for other operational and business reasons.</li>
                    <li>With our group companies (to the extent relevant)</li>
                    <li>Our auditors or advisors to the extent required by them for performing their services</li>
                    <li>Governmental bodies, regulatory authorities, law enforcement authorities pursuant to our legal obligations or compliance requirements.</li>
                  </ul>
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">How we use cookies</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  <p>We use "cookies" to collect information and to better understand customer behaviour. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to avail our goods or services to the full extent. We do not control the use of cookies by third parties. The third party service providers have their own privacy policies addressing how they use such information.</p>
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Your rights relating to your data</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      <strong>Right to Review:</strong> You can review the data provided by you and can request us to correct or amend such data (to the extent feasible, as determined by us). That said, we will not be responsible for the authenticity of the data or information provided by you.
                    </li>
                    <li>
                      <strong>Withdrawal of your Consent:</strong> You can choose not to provide your data, at any time while availing our goods or services or otherwise withdraw your consent provided to us earlier, in writing to our email ID: kripteesofficial@gmail.com In the event you choose to not provide or later withdraw your consent, we may not be able to provide you our services or goods. Please note that these rights are subject to our compliance with applicable laws.
                    </li>
                  </ul>
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">How long will we retain your information or data?</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  <p>We may retain your information or data (i) for as long as we are providing goods and services to you; and (ii) as permitted under applicable law, we may also retain your data or information even after you terminate the business relationship with us. However, we will process such information or data in accordance with applicable laws and this Policy.</p>
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Data Security</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  <p>We will use commercially reasonable and legally required precautions to preserve the integrity and security of your information and data.</p>
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Queries/ Grievance Officer</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  <p>For any queries, questions or grievances about this Policy, please contact us using the contact information provided on this website.</p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>



    </div>
  );
};

export default PrivacyPolicy;
