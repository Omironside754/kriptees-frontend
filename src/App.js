import Login from "./component/User/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import "./App.css";
import Cart from "./component/Cart/Cart";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
// import Route from "./component/Route/Route";
import { useEffect, useState } from "react";
// const LazyPayment = lazy(() => import("./component/Cart/Payment"));
import Dashboard from "./component/Admin/Dashboard";
import ProductList from "./component/Admin/ProductList";
import OrderList from "./component/Admin/OrderList";
import UserList from "./component/Admin/UserList";
import UpdateProduct from "./component/Admin/UpdateProduct";
import ProcessOrder from "./component/Admin/ProcessOrder";
// import UpdateProduct from "./component/Admin/UpdateProduct";
import NewProduct from "./component/Admin/NewProduct";
import ProductReviews from "./component/Admin/ProductReviews";
import MyOrder from "./component/order/MyOrder";
import { useDispatch } from "react-redux";
import { load_UserProfile } from "./actions/userAction";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import Shipping from "./component/Cart/Shipping";
import OrderSuccess from "./component/Cart/OrderSuccess";
import Activator from "./component/Route/Activator";
import PaymentComponent from "./component/Cart/Payment";
import UpdateUser from "./component/Admin/UpdateUser";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Scroll from "./scroll"
import CustomOrderPage from "./component/Home/CustomOrder";
// const LazyProductReviews = lazy(() =>
//   import("./component/Admin/ProductReviews")
// );

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(load_UserProfile());
  }, []);


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
      // transition:Slide
      />
      <BrowserRouter>
        <Scroll />
        <Routes>
          <Route
            exact path="/"
            element={
              <>
                <Header />
                <Home />
                <Footer />
              </>
            } />

          <Route
            exact
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
            exact
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
            exact
            path="/cart"
            element={
              <>
                {<Header />}
                <Cart />
                {/* <Services /> */}
                {<Footer />}
              </>
            }
          />


          <Route
            exact
            path="/product/:id"
            element={
              <>
                {<Header />}
                <ProductDetails />
                {/* <Services /> */}
                {<Footer />}
              </>
            }
          />
          <Route
            exact
            path="/customise"
            element={
              <>
                {<Header />}
                {<CustomOrderPage/>}
                {/* <Services /> */}
                {<Footer />}
              </>
            }
          />

          <Route
            exact
            path="/products"
            element={
              <>
                {<Header />}
                <Products />
                {/* <Services /> */}
                {<Footer />}
              </>
            }
          />

          <Route
            path="/products/:keyword"
            element={
              <>
                <Header />
                <Products />
                {/* <Services /> */}
                <Footer />
              </>
            }
          />

          <Route
            exact
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
            exact
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
            exact
            path="/PrivacyPolicy"
            element={
              <>
                {<Header />}
                <PrivacyPolicy />
                {<Footer />}
              </>
            }
          />

          <Route
            exact
            path="/RefundandCancellation"
            element={
              <>
                <Header />
                <ReturnPolicyPage />
                {/* <Services /> */}
                <Footer />
              </>
            }
          />
          <Route
            exact
            path="/ShipandDelivery"
            element={
              <>
                {<Header />}
                <ShippingPolicy />
                {<Footer />}
              </>
            }
          />


          <Route
            exact
            path="/TermsandConditions"
            element={
              <>
                {<Header />}
                <TermsAndConditions />
                {<Footer />}
              </>
            }
          />



          <Route
            exact
            path="/orders"
            element={
              <>
                {<Header />}
                <MyOrder />
                {/* <PrivateRoute exact path="/orders" component={MyOrder} /> */}
                {/* <Services /> */}
                {<Footer />}
              </>
            }
          />

          <Route
            exact
            path="/shipping"
            element={
              <>
                {<Header />}
                <Shipping />
                {/* <PrivateRoute exact path="/shipping" component={Shipping} /> */}
                {/* <Services /> */}
                {<Footer />}
              </>
            }
          />

          <Route
            exact
            path="/order/confirm"
            element={
              <>
                {<Header />}
                <ConfirmOrder />
                {/* <PrivateRoute
                  exact
                  path="/order/confirm"
                  component={ConfirmOrder}
                /> */}
                {/* <Services /> */}
                {<Footer />}
              </>
            }
          />
          <Route
            exact
            path="/success"
            element={
              <>
                {<Header />}
                <OrderSuccess />
                {/* <PrivateRoute exact path="/success" component={OrderSuccess} /> */}
                {/* <Services /> */}
                {<Footer />}
              </>
            }
          />




          {/* private Routes */}

          <Route

            exact
            path="/admin/dashboard"
            element={<>


              <Activator />

              <Dashboard />

            </>

            }
          />

          <Route

            exact
            path="/admin/products"
            element={
              <>
                <Activator />
                <ProductList />

              </>
            }
          />
          <Route

            exact
            path="/admin/product/:id"
            element={<UpdateProduct />}
          />
          <Route

            exact
            path="/admin/reviews"
            element={<ProductReviews />}
          />
          <Route

            exact
            path="/admin/orders"
            element={<OrderList />}
          />
          <Route

            exact
            path="/admin/order/:id"
            element={<ProcessOrder />}
          />
          <Route
            exact
            path="/orders"
            element={
              <>
                <Header />
                <Activator />
                <MyOrder />
                <Services />
                <Footer />
              </>
            }
          />

          <Route

            exact
            path="/admin/new/product"
            element={
              <>
                <Activator />
                <NewProduct />
              </>
            }
          />

          <Route

            exact
            path="/admin/users"
            element={<UserList />}
          />

          <Route
            exact
            path="/admin/user/:id"
            element={
              <>
                <UpdateUser />
              </>
            }
          />

          <Route
            exact
            path="/account"
            element={
              <>
                {<Header />}
                {/* <Route exact path="/account" element={Profile} /> */}
                <ProfilePage />
                {/* <Services /> */}
                {<Footer />}
              </>
            }
          />

          <Route exact path="/process/payment"
            element={
              <>

                {<Header />}
                <PaymentComponent />

              </>
            }
          />
          {/* <PrivateRoute exact path="/process/payment" component={Payment} /> */}


        </Routes>

      </BrowserRouter>

    </div>
  );
}

export default App;
