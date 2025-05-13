import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { load_UserProfile } from "./actions/userAction";
import Home from "./component/Home/Home";
import Login from "./component/User/Login";
import SignUp from "./component/User/SignUp";
import Header from "./component/Layouts/Header1.jsx/Header";
import Footer from "./component/Layouts/Footer/Footer";
import AboutUs from "./Terms&Condtions/Aboutus";
import ContactUs from "./Terms&Condtions/Contact";
import ShippingPolicy from "./Terms&Condtions/ShippingPolicy";
import Career from "./Terms&Condtions/Career";
import FAQ from "./Terms&Condtions/FAQ";

import Services from "./Terms&Condtions/Service";
import TermsAndConditions from "./Terms&Condtions/TermsandConditions";
import PrivacyPolicy from "./Terms&Condtions/Privacy";
import ReturnPolicyPage from "./Terms&Condtions/Return";
import ProfilePage from "./component/User/Profile";
import Cart from "./component/Cart/Cart";
import Wishlist from "./component/Wishlist/Wishlist";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import Tshirt from "./component/Product/Tshirt";
import Hoodies from "./component/Product/Hoodies";
import NewArrival from "./component/Product/NewArrival";
import Sweatshirts from "./component/Product/Sweatshirts";
import PrivateRoute from "./component/Route/PrivateRoute";
import PageTransition from "./component/Route/PageTransition";
import Dashboard from "./component/Admin/Dashboard";
import ProductList from "./component/Admin/ProductList";
import OrderList from "./component/Admin/OrderList";
import UserList from "./component/Admin/UserList";
import UpdateProduct from "./component/Admin/UpdateProduct";
import ProcessOrder from "./component/Admin/ProcessOrder";
import NewProduct from "./component/Admin/NewProduct";
import ProductReviews from "./component/Admin/ProductReviews";
import OrderDetails from "./component/order/OrderDetails";
import MyOrder from "./component/order/MyOrder";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import Shipping from "./component/Cart/Shipping";
import OrderSuccess from "./component/Cart/OrderSuccess";
import Activator from "./component/Route/Activator";
import PaymentComponent from "./component/Cart/Payment";
import UpdateUser from "./component/Admin/UpdateUser";
import CustomOrderPage from "./component/Home/CustomOrder";
import ForgetPassword from "./component/User/ForgetPassword";
import ResetPassword from "./component/User/ResetPassword";
import Scroll from "./scroll";
import { AnimatePresence } from "framer-motion";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(load_UserProfile());
  }, [dispatch]);
  const { isAuthenticated, user, loading } = useSelector((state) => state.userData);
  if (loading) {
    return <div>Loading...</div>; // Or your loader component
  }

  // Helper function to wrap protected routes if needed
  const wrapPrivateRoute = (element, redirect = "", isAdmin = false) => (
    <PrivateRoute redirect={redirect} isAdmin={isAdmin}>
      {element}
    </PrivateRoute>
  );

  return (
    <>
      {/* Wrap routes in AnimatePresence so they animate on exit/enter */}
      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.pathname}>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              <PageTransition>
                <Header />
                <Home />
                <Footer />
              </PageTransition>
            }
          />
          <Route
            path="/login"
            element={
              <PageTransition>
                <Header />
                <Login />
                <Footer />
              </PageTransition>
            }
          />
          <Route
            path="/signup"
            element={
              <PageTransition>
                <Header />
                <SignUp />
                <Footer />
              </PageTransition>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <PageTransition>
                <Header />
                <ForgetPassword />
                <Footer />
              </PageTransition>
            }
          />
          <Route
            path="/password/reset/:token"
            element={
              <PageTransition>
                <Header />
                <ResetPassword />
                <Footer />
              </PageTransition>
            }
          />

          <Route
            path="/about"
            element={
              <PageTransition>
                <Header />
                <AboutUs />
                <Footer />
              </PageTransition>
            }
          />
          <Route
            path="/contact"
            element={
              <PageTransition>
                <Header />
                <ContactUs />
                <Footer />
              </PageTransition>
            }
          />
          <Route
            path="/careers"
            element={
              <PageTransition>
                <Header />
                <Career />
                <Footer />
              </PageTransition>
            }
          />
          <Route
            path="/faq"
            element={
              <PageTransition>
                <Header />
                <FAQ />
                <Footer />
              </PageTransition>
            }
          />

          <Route
            path="/privacy"
            element={
              <PageTransition>
                <Header />
                <PrivacyPolicy />
                <Footer />
              </PageTransition>
            }
          />
          <Route
            path="/return"
            element={
              <PageTransition>
                <Header />
                <ReturnPolicyPage />
                <Footer />
              </PageTransition>
            }
          />
          <Route
            path="/shipping-policy"
            element={
              <PageTransition>
                <Header />
                <ShippingPolicy />
                <Footer />
              </PageTransition>
            }
          />
          <Route
            path="/terms"
            element={
              <PageTransition>
                <Header />
                <TermsAndConditions />
                <Footer />
              </PageTransition>
            }
          />
          <Route
            path="/product/:id"
            element={
              <PageTransition>
                <Header />
                <ProductDetails />
                <Footer />
              </PageTransition>
            }
          />
          <Route
            path="/customise"
            element={
              <PageTransition>
                <Header />
                <CustomOrderPage />
                <Footer />
              </PageTransition>
            }
          />
          <Route
            path="/products"
            element={
              <PageTransition>
                <Header />
                <Products />
                <Footer />
              </PageTransition>
            }
          />
          <Route
            path="/Tshirt"
            element={
              <PageTransition>
                <Header />
                <Tshirt />
                <Footer />
              </PageTransition>
            }
          />
          <Route
            path="/NewArrival"
            element={
              <PageTransition>
                <Header />
                <NewArrival />
                <Footer />
              </PageTransition>
            }
          />
          <Route
            path="/Sweatshirts"
            element={
              <PageTransition>
                <Header />
                <Sweatshirts />
                <Footer />
              </PageTransition>
            }
          />
          <Route
            path="/Hoodies"
            element={
              <PageTransition>
                <Header />
                <Hoodies />
                <Footer />
              </PageTransition>
            }
          />
          <Route
            path="/products/:keyword"
            element={
              <PageTransition>
                <Header />
                <Products />
                <Footer />
              </PageTransition>
            }
          />

          {/* Protected User Routes */}
          <Route
            path="/cart"
            element={wrapPrivateRoute(
              <PageTransition>
                <Header />
                <Cart />
                <Footer />
              </PageTransition>,
              "/cart"
            )}
          />
          <Route
            path="/Wishlist"
            element={wrapPrivateRoute(
              <PageTransition>
                <Header />
                <Wishlist />
                <Footer />
              </PageTransition>,
              "/Wishlist"
            )}
          />
          <Route
            path="/orders"
            element={wrapPrivateRoute(
              <PageTransition>
                <Header />
                <MyOrder />
                <Footer />
              </PageTransition>,
              "/orders"
            )}
          />
          <Route
            path="/orders/:id"
            element={wrapPrivateRoute(
              <PageTransition>
                <Header />
                <OrderDetails />
                <Footer />
              </PageTransition>,
              "/orders"
            )}
          />
          <Route
            path="/shipping"
            element={wrapPrivateRoute(
              <PageTransition>
                <Header />
                <Shipping />
                <Footer />
              </PageTransition>,
              "/shipping"
            )}
          />
          <Route
            path="/order/confirm"
            element={wrapPrivateRoute(
              <PageTransition>
                <Header />
                <ConfirmOrder />
                <Footer />
              </PageTransition>,
              "/order/confirm"
            )}
          />
          <Route
            path="/success"
            element={wrapPrivateRoute(
              <PageTransition>
                <Header />
                <OrderSuccess />
                <Footer />
              </PageTransition>,
              "/success"
            )}
          />
          <Route
            path="/account"
            element={wrapPrivateRoute(
              <PageTransition>
                <Header />
                <ProfilePage />
                <Footer />
              </PageTransition>,
              "/account"
            )}
          />
          <Route
            path="/process/payment"
            element={wrapPrivateRoute(
              <PageTransition>
                <Header />
                <PaymentComponent />
              </PageTransition>,
              "/process/payment"
            )}
          />

          {/* Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={wrapPrivateRoute(
              <PageTransition>
                <Activator />
                <Dashboard />
              </PageTransition>,
              "/admin/dashboard",
              true
            )}
          />
          <Route
            path="/admin/products"
            element={wrapPrivateRoute(
              <PageTransition>
                <Activator />
                <ProductList />
              </PageTransition>,
              "/admin/products",
              true
            )}
          />
          <Route
            path="/admin/product/:id"
            element={wrapPrivateRoute(
              <PageTransition>
                <UpdateProduct />
              </PageTransition>,
              "/admin/product",
              true
            )}
          />
          <Route
            path="/admin/reviews"
            element={wrapPrivateRoute(
              <PageTransition>
                <ProductReviews />
              </PageTransition>,
              "/admin/reviews",
              true
            )}
          />
          <Route
            path="/admin/orders"
            element={wrapPrivateRoute(
              <PageTransition>
                <OrderList />
              </PageTransition>,
              "/admin/orders",
              true
            )}
          />
          <Route
            path="/admin/order/:id"
            element={wrapPrivateRoute(
              <PageTransition>
                <ProcessOrder />
              </PageTransition>,
              "/admin/order",
              true
            )}
          />
          <Route
            path="/admin/new/product"
            element={wrapPrivateRoute(
              <PageTransition>
                <Activator />
                <NewProduct />
              </PageTransition>,
              "/admin/new/product",
              true
            )}
          />
          <Route
            path="/admin/users"
            element={wrapPrivateRoute(
              <PageTransition>
                <UserList />
              </PageTransition>,
              "/admin/users",
              true
            )}
          />
          <Route
            path="/admin/user/:id"
            element={wrapPrivateRoute(
              <PageTransition>
                <UpdateUser />
              </PageTransition>,
              "/admin/user",
              true
            )}
          />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
