import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { load_UserProfile } from "./actions/userAction";
import Login from "./component/User/Login";
import SignUp from "./component/User/SignUp";
import Home from "./component/Home/Home";
import Header from "./component/Layouts/Header1.jsx/Header";
import AboutUs from "./Terms&Condtions/Aboutus";
import ContactUs from "./Terms&Condtions/Contact";
import Footer from "./component/Layouts/Footer/Footer";
import ShippingPolicy from "./Terms&Condtions/ShippingPolicy";
import Services from "./Terms&Condtions/Service";
import TermsAndConditions from "./Terms&Condtions/TermsandConditions";
import PrivacyPolicy from "./Terms&Condtions/Privacy";
import ReturnPolicyPage from "./Terms&Condtions/Return";
import ProfilePage from "./component/User/Profile";
import Cart from "./component/Cart/Cart";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import PrivateRoute from "./component/Route/PrivateRoute";
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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Scroll from "./scroll";
import CustomOrderPage from "./component/Home/CustomOrder";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(load_UserProfile());
  }, [dispatch]);
  const { isAuthenticated, user ,loading } = useSelector((state) => state.userData);
  if (loading) {
    return <div>Loading...</div>; // Or your loader component
  }

  // Helper function to wrap routes that need authentication
  const wrapPrivateRoute = (element, redirect = "", isAdmin = false) => {
    return (
      <PrivateRoute redirect={redirect} isAdmin={isAdmin}>
        {element}
      </PrivateRoute>
    );
  };

  return (
    <div className="App">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <BrowserRouter>
        <Scroll />
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              <>
                <Header />
                <Home />
                <Footer />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <Header />
                <Login />
                <Footer />
              </>
            }
          />
          <Route
            path="/signup"
            element={
              <>
                <Header />
                <SignUp />
                <Footer />
              </>
            }
          />
          <Route
            path="/AboutUs"
            element={
              <>
                <Header />
                <AboutUs />
                <Footer />
              </>
            }
          />
          <Route
            path="/ContactUs"
            element={
              <>
                <Header />
                <ContactUs />
                <Footer />
              </>
            }
          />
          <Route
            path="/PrivacyPolicy"
            element={
              <>
                <Header />
                <PrivacyPolicy />
                <Footer />
              </>
            }
          />
          <Route
            path="/RefundandCancellation"
            element={
              <>
                <Header />
                <ReturnPolicyPage />
                <Footer />
              </>
            }
          />
          <Route
            path="/ShipandDelivery"
            element={
              <>
                <Header />
                <ShippingPolicy />
                <Footer />
              </>
            }
          />
          <Route
            path="/TermsandConditions"
            element={
              <>
                <Header />
                <TermsAndConditions />
                <Footer />
              </>
            }
          />
          <Route
            path="/product/:id"
            element={
              <>
                <Header />
                <ProductDetails />
                <Footer />
              </>
            }
          />
          <Route
            path="/customise"
            element={
              <>
                <Header />
                <CustomOrderPage />
                <Footer />
              </>
            }
          />
          <Route
            path="/products"
            element={
              <>
                <Header />
                <Products />
                <Footer />
              </>
            }
          />
          <Route
            path="/products/:keyword"
            element={
              <>
                <Header />
                <Products />
                <Footer />
              </>
            }
          />

          {/* Protected User Routes */}
          <Route
            path="/cart"
            element={wrapPrivateRoute(
              <>
                <Header />
                <Cart />
                <Footer />
              </>,
              "/cart"
            )}
          />
          <Route
            path="/orders"
            element={wrapPrivateRoute(
              <>
                <Header />
                <MyOrder />
                <Footer />
              </>,
              "/orders"
            )}
          />
          <Route
            path="/orders/:id"
            element={wrapPrivateRoute(
              <>
                <Header />
                <OrderDetails />
                <Footer />
              </>,
              "/orders"
            )}
          />
          <Route
            path="/shipping"
            element={wrapPrivateRoute(
              <>
                <Header />
                <Shipping />
                <Footer />
              </>,
              "/shipping"
            )}
          />
          <Route
            path="/order/confirm"
            element={wrapPrivateRoute(
              <>
                <Header />
                <ConfirmOrder />
                <Footer />
              </>,
              "/order/confirm"
            )}
          />
          <Route
            path="/success"
            element={wrapPrivateRoute(
              <>
                <Header />
                <OrderSuccess />
                <Footer />
              </>,
              "/success"
            )}
          />
          <Route
            path="/account"
            element={wrapPrivateRoute(
              <>
                <Header />
                <ProfilePage />
                <Footer />
              </>,
              "/account"
            )}
          />
          <Route
            path="/process/payment"
            element={wrapPrivateRoute(
              <>
                <Header />
                <PaymentComponent />
              </>,
              "/process/payment"
            )}
          />

          {/* Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={wrapPrivateRoute(
              <>
                <Activator />
                <Dashboard />
              </>,
              "/admin/dashboard",
              true
            )}
          />
          <Route
            path="/admin/products"
            element={wrapPrivateRoute(
              <>
                <Activator />
                <ProductList />
              </>,
              "/admin/products",
              true
            )}
          />
          <Route
            path="/admin/product/:id"
            element={wrapPrivateRoute(
              <UpdateProduct />,
              "/admin/product",
              true
            )}
          />
          <Route
            path="/admin/reviews"
            element={wrapPrivateRoute(
              <ProductReviews />,
              "/admin/reviews",
              true
            )}
          />
          <Route
            path="/admin/orders"
            element={wrapPrivateRoute(
              <OrderList />,
              "/admin/orders",
              true
            )}
          />
          <Route
            path="/admin/order/:id"
            element={wrapPrivateRoute(
              <ProcessOrder />,
              "/admin/order",
              true
            )}
          />
          <Route
            path="/admin/new/product"
            element={wrapPrivateRoute(
              <>
                <Activator />
                <NewProduct />
              </>,
              "/admin/new/product",
              true
            )}
          />
          <Route
            path="/admin/users"
            element={wrapPrivateRoute(
              <UserList />,
              "/admin/users",
              true
            )}
          />
          <Route
            path="/admin/user/:id"
            element={wrapPrivateRoute(
              <UpdateUser />,
              "/admin/user",
              true
            )}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;