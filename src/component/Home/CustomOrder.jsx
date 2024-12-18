import React from 'react';
import { Phone, ShoppingCart, Star, Users } from 'lucide-react';

const CustomOrderPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-100 to-orange-50 text-gray-800 font-sans">

            <main className="container mx-auto px-4 py-12 mt-28 pb-32">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-blue-800">Unleash Your Anime Style!</h2>
                    <p className="text-xl text-gray-600">Custom and bulk orders for the ultimate anime fan experience</p>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Custom Order Section */}
                    <section className="bg-white rounded-lg shadow-lg p-8 transform transition duration-500 hover:scale-105 border-t-4 border-orange-500">
                        <div className="flex items-center mb-6">
                            <ShoppingCart className="text-orange-500 mr-4" size={32} />
                            <h2 className="text-3xl font-semibold">Custom Anime Tees</h2>
                        </div>
                        <p className="mb-6 text-gray-600">Design your unique anime-inspired T-shirt! Let your creativity shine.</p>
                        <ul className="list-none mb-8 space-y-2">
                            <li className="flex items-center"><Star className="text-yellow-500 mr-2" size={20} /> Choose your favorite anime character</li>
                            <li className="flex items-center"><Star className="text-yellow-500 mr-2" size={20} /> Select T-shirt color and style</li>
                            <li className="flex items-center"><Star className="text-yellow-500 mr-2" size={20} /> Add custom text or quotes</li>
                        </ul>
                        <a
                            href="https://wa.me/8271076348"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center bg-gradient-to-r from-orange-400 to-yellow-400 text-white px-6 py-3 rounded-full hover:from-orange-500 hover:to-yellow-500 transition duration-300 transform hover:scale-105"
                        >
                            <Phone className="mr-2" size={20} />
                            Contact for Custom Order
                        </a>
                    </section>

                    {/* Bulk Order Section */}
                    <section className="bg-white rounded-lg shadow-lg p-8 transform transition duration-500 hover:scale-105 border-t-4 border-blue-500">
                        <div className="flex items-center mb-6">
                            <Users className="text-blue-500 mr-4" size={32} />
                            <h2 className="text-3xl font-semibold">Bulk Anime Tees</h2>
                        </div>
                        <p className="mb-6 text-gray-600">Perfect for events, clubs, or reselling. Get the best deals on bulk orders!</p>
                        <ul className="list-none mb-8 space-y-2">
                            <li className="flex items-center"><Star className="text-yellow-500 mr-2" size={20} /> Minimum order: 10 pieces</li>
                            <li className="flex items-center"><Star className="text-yellow-500 mr-2" size={20} /> Customization options available</li>
                            <li className="flex items-center"><Star className="text-yellow-500 mr-2" size={20} /> Discounts on large quantities</li>
                        </ul>
                        <a
                            href="https://wa.me/8271076348"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center bg-gradient-to-r from-blue-400 to-blue-600 text-white px-6 py-3 rounded-full hover:from-blue-500 hover:to-blue-700 transition duration-300 transform hover:scale-105"
                        >
                            <Phone className="mr-2" size={20} />
                            Contact for Bulk Order
                        </a>
                    </section>
                </div>

                {/* Featured Designs Section */}
                <section className="mt-16">
                    <h2 className="text-3xl font-bold text-center mb-8 text-blue-800">Featured Designs</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

                        <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105">
                            <img src={`https://res.cloudinary.com/dafv5daza/image/upload/v1716724876/sukuna_backkkk_rswfet.png`} alt={`Featured Design`} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h3 className="font-semibold text-lg mb-2">Anime Design 1</h3>
                                <p className="text-gray-600">Limited Edition</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105">
                            <img src={`https://res.cloudinary.com/dafv5daza/image/upload/v1716724891/white_back_tut1y7.png`} alt={`Featured Design`} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h3 className="font-semibold text-lg mb-2">Anime Design 2</h3>
                                <p className="text-gray-600">Limited Edition</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105">
                            <img src={`https://res.cloudinary.com/dafv5daza/image/upload/v1716724938/i_back_fwxduz.png`} alt={`Featured Design`} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h3 className="font-semibold text-lg mb-2">Anime Design 3</h3>
                                <p className="text-gray-600">Limited Edition</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105">
                            <img src={`https://res.cloudinary.com/dafv5daza/image/upload/v1716724291/back_mockup_hccwlm.png`} alt={`Featured Design`} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h3 className="font-semibold text-lg mb-2">Anime Design 4</h3>
                                <p className="text-gray-600">Limited Edition</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>


        </div>
    );
};

export default CustomOrderPage;