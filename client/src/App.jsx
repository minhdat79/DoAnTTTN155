import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import AdminLayout from "./Layout/AdminLayout/AdminLayout";
import DefautLayout from "./Layout/DefautLayout/DefautLayout";
import Dashboard from "./Pages/admin/Dashboard/Dashboard";
import ManagerBrand from "./Pages/admin/ManagerBrand/ManagerBrand";
import ManagerOrder from "./Pages/admin/ManagerOrder/ManagerOrder";
import ManagerProduct from "./Pages/admin/ManagerProduct/ManagerProduct";
import ManagerQuantityProduct from "./Pages/admin/ManagerQuantityProduct/ManagerQuantityProduct";
import ManagerUser from "./Pages/admin/ManagerUser/ManagerUser";
import Login from "./Pages/Auth/Login/Login";
import Register from "./Pages/Auth/Register/Register";
import Cart from "./Pages/Cart/Cart";
import Contact from "./Pages/Contact/Contact";
import Home from "./Pages/Home/Home";
import OrderHitory from "./Pages/OrderHistory/OrderHitory";
import ProductDetail from "./Pages/ProductDetail/ProductDetail";
import Profile from "./Pages/Profile/Profile";
import Shop from "./Pages/Shop/Shop";
import ForgotPassword from "./Pages/Auth/ForgotPassword/ForgotPassword";
import ResetPassword from "./Pages/Auth/ResetPassword/ResetPassword";
import ConfirmAccoount from "./Pages/Auth/ConfirmAccount/ConfirmAccoount";
import ManagerContact from "./Pages/admin/ManagerContact/ManagerContact";
import ManagerCategory from "./Pages/admin/ManagerCategory/ManagerCategory";
import ManagerChatbot from "./Pages/admin/ManagerChatbot/ManagerChatbot";
import VnpayReturn from "./Pages/VnpayReturn/VnpayReturn";
const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route path="/vnpay_return" element={<VnpayReturn />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/confirm-account/:token" element={<ConfirmAccoount />} />
        <Route element={<DefautLayout />}>
          <Route index element={<Home />} />
          <Route
            path="/product-detail/:productId"
            element={<ProductDetail />}
          />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/history-order" element={<OrderHitory />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/manager-user" element={<ManagerUser />} />
          <Route path="/manager-product" element={<ManagerProduct />} />
          <Route path="/manager-order" element={<ManagerOrder />} />
          <Route path="/manager-brand" element={<ManagerBrand />} />
          <Route path="/manager-contact" element={<ManagerContact />} />
          <Route path="/manager-category" element={<ManagerCategory />} />
          <Route path="/manager-chatbot" element={<ManagerChatbot />} />
          <Route
            path="/manager-quantity/:productId"
            element={<ManagerQuantityProduct />}
          />
        </Route>
      </Route>
    )
  );

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
