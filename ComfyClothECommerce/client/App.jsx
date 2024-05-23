import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import NavBar from "./components/NavBar/NavBar.jsx";
import Home from "./components/NavLinks/HomePage/Home.jsx";
import About from "./components/NavLinks/AboutPage/About.jsx";
import Products from "./components/NavLinks/ProductsPage/Products.jsx";
import Wishlist from "./components/NavLinks/WishlistPage/Wishlist.jsx";
import Orders from "./components/NavLinks/OrdersPage/Orders.jsx";
import Bag from "./components/NavLinks/CartPage/Bag.jsx";

import { ThemeProvider } from "./components/NavLinks/Theme/ThemeContext.jsx";
import { ProductsProvider } from "./components/NavLinks/ProductsPage/ProductsContext.jsx";
import SignIn from "./components/NavLinks/SignInPage/SignIn.jsx";
import SignUp from "./components/NavLinks/SignUpPage/SignUp.jsx";
import { checkAuth } from "./actions/AuthActions.jsx";
import BlogPost from "./components/NavLinks/HomePage/BlogPost.jsx";
import LookbookContent from "./components/NavLinks/HomePage/LookbookContent.jsx";
import StyleGuide from "./components/NavLinks/HomePage/StyleGuide.jsx";
import Footer from "./components/NavBar/Footer.jsx";
import ShippingReturnsSection from "./components/NavBar/ShippingReturnsSection.jsx";
import FAQs from "./components/NavBar/FAQs.jsx";
import TermsOfService from "./components/NavBar/TermsOfService.jsx";
import CareersPage from "./components/NavBar/CareersPage.jsx";
import PrivacyPolicy from "./components/NavBar/PrivacyPolicy.jsx";
import ContactUs from "./components/NavBar/Contact Us.jsx";
import AddNewAddress from "./components/NavLinks/CartPage/AddNewAddress.jsx";
import AddressPage from "./components/NavLinks/CartPage/AddressPage.jsx";
import PostDetails from "./components/NavLinks/ProductsPage/PostDetails.jsx";
import Reviews from "./components/NavLinks/ProductsPage/Reviews.jsx";
import PaymentsPage from "./components/NavLinks/CartPage/PaymentsPage.jsx";
import OrderDetails from "./components/NavLinks/OrdersPage/OrderDetails.jsx";
import ReviewForm from "./components/NavLinks/OrdersPage/ReviewForm.jsx";
import ManageAccount from "./components/NavBar/ManageAccount.jsx";
import PaymentSuccess from "./components/NavLinks/CartPage/PaymentSuccess.jsx";
import PaymentFailure from "./components/NavLinks/CartPage/PaymentFailure.jsx";
import BlogPage from "./components/NavBar/BlogPage.jsx";
import DenimJacketStylingPage from "./components/NavBar/DenimJacketStylingPage.jsx";
import SustainableFashionPage from "./components/NavBar/SustainableFashionPage.jsx";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <ThemeProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/products"
            element={
              <ProductsProvider>
                <Products />
              </ProductsProvider>
            }
          />
          <Route path="/manageAccount" element={<ManageAccount />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:orderId/:itemId" element={<OrderDetails />} />
          <Route path="/products/:productId" element={<PostDetails />} />
          <Route path="/productId/reviews" element={<Reviews />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/bag" element={<Bag />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/blogPost" element={<BlogPost />} />
          <Route path="/denimJacketStylingPage" element={<DenimJacketStylingPage />} />
          <Route path="/sustainableFashionPage" element={<SustainableFashionPage />} />
          <Route path="/lookbookContent" element={<LookbookContent />} />
          <Route path="/styleGuide" element={<StyleGuide />} />
          <Route path="/shippingReturns" element={<ShippingReturnsSection />} />
          <Route path="/FAQs" element={<FAQs />} />
          <Route path="/termsOfService" element={<TermsOfService />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/addAddress" element={<AddNewAddress />} />
          <Route path="/addressPage" element={<AddressPage />} />
          <Route path="/payments" element={<PaymentsPage />}/>
          <Route path="/reviewForm" element={<ReviewForm />} />
          <Route path="/payments/success" element={<PaymentSuccess />} />
          <Route path="/payments/failure" element={<PaymentFailure />} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
};

export default App;
