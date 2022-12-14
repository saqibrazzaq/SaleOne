import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AccountHome from "./account/AccountHome";
import UserAddressDelete from "./account/address/UserAddressDelete";
import UserAddressEdit from "./account/address/UserAddressEdit";
import UserAddresses from "./account/address/UserAddresses";
import MyOrders from "./account/order/MyOrders";
import OrderView from "./account/order/OrderView";
import ChangePassword from "./account/profile/ChangePassword";
import EmailPin from "./account/verification/EmailPin";
import EmailVerificationStatus from "./account/verification/EmailVerificationStatus";
import Categories from "./admin/category/Categories";
import CategoryDelete from "./admin/category/CategoryDelete";
import CategoryEdit from "./admin/category/CategoryEdit";
import Cities from "./admin/city/Cities";
import CityDelete from "./admin/city/CityDelete";
import CityEdit from "./admin/city/CityEdit";
import Countries from "./admin/country/Countries";
import CountryDelete from "./admin/country/CountryDelete";
import CountryEdit from "./admin/country/CountryEdit";
import Home from "./admin/Home";
import OrderEdit from "./admin/order/OrderEdit";
import Orders from "./admin/order/Orders";
import PaymentMethodDelete from "./admin/paymentMethod/PaymentMethodDelete";
import PaymentMethodEdit from "./admin/paymentMethod/PaymentMethodEdit";
import PaymentMethods from "./admin/paymentMethod/PaymentMethods";
import ProductDelete from "./admin/product/ProductDelete";
import ProductEdit from "./admin/product/ProductEdit";
import ProductImages from "./admin/product/ProductImages";
import Products from "./admin/product/Products";
import ProductUploadImage from "./admin/product/ProductUploadImage";
import RoleDelete from "./admin/role/RoleDelete";
import RoleEdit from "./admin/role/RoleEdit";
import RolesList from "./admin/role/Roles";
import StateDelete from "./admin/state/StateDelete";
import StateEdit from "./admin/state/StateEdit";
import States from "./admin/state/States";
import UnitDelete from "./admin/unit/UnitDelete";
import UnitEdit from "./admin/unit/UnitEdit";
import Units from "./admin/unit/Units";
import UserDelete from "./admin/user/UserDelete";
import UserEdit from "./admin/user/UserEdit";
import Users from "./admin/user/Users";
import RequireAuth from "./api/require-auth";
import ForgotPassword from "./auth/ForgotPassword";
import Login from "./auth/Login";
import Logout from "./auth/Logout";
import Register from "./auth/Register";
import ResetPassword from "./auth/ResetPassword";
import UnAuthorized from "./auth/UnAuthorized";
import Cart from "./cart/Cart";
import Checkout from "./cart/Checkout";
import PaymentMethod from "./admin/order/PaymentMethod";
import { Roles } from "./dtos/Auth";
import AccountLayout from "./layout/AccountLayout";
import AdminLayout from "./layout/AdminLayout";
import Layout from "./layout/Layout";
import ProductList from "./product/ProductList";
import Couriers from "./admin/courier/Couriers";
import CourierEdit from "./admin/courier/CourierEdit";
import CourierDelete from "./admin/courier/CourierDelete";
import DeliveryPlans from "./admin/courier/DeliveryPlans";
import DeliveryPlanEdit from "./admin/courier/DeliveryPlanEdit";
import DeliveryPlanDelete from "./admin/courier/DeliveryPlanDelete";
import Shipments from "./admin/shipment/Shipments";
import ShipmentEdit from "./admin/shipment/ShipmentEdit";
import ShipmentDelete from "./admin/shipment/ShipmentDelete";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public routes */}
          {/* Authentication routes */}
          <Route path="auth">
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="logout" element={<Logout />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route path="unauthorized" element={<UnAuthorized />} />
          </Route>
          <Route index element={<ProductList />} />
          <Route path=":categoryCode" element={<ProductList />} />

          {/* Private routes for User */}
          <Route
            element={
              <RequireAuth
                allowedRoles={[
                  Roles.Owner,
                  Roles.Admin,
                  Roles.Manager,
                  Roles.User,
                ]}
              />
            }
          >
            <Route path="account" element={<AccountLayout />}>
              <Route index element={<AccountHome />} />
              <Route path="addresses">
                <Route index element={<UserAddresses />} />
                <Route path="edit" element={<UserAddressEdit />} />
                <Route
                  path="edit/:userAddressId"
                  element={<UserAddressEdit />}
                />
                <Route
                  path="delete/:userAddressId"
                  element={<UserAddressDelete />}
                />
              </Route>
              <Route path="status">
                <Route path="email" element={<EmailVerificationStatus />} />
                <Route path="emailpin" element={<EmailPin />} />
              </Route>
              <Route path="profile">
                <Route path="change-password" element={<ChangePassword />} />
              </Route>
              <Route path="orders">
                <Route index element={<MyOrders />} />
                <Route path=":orderId" element={<OrderView />} />
                <Route path="payment-method/:orderId" element={<PaymentMethod />} />
              </Route>
            </Route>
            <Route path="cart">
              <Route index element={<Cart />} />
            </Route>
            <Route path="checkout">
              <Route index element={<Checkout />} />
            </Route>
          </Route>

          {/* Private routes for Admin */}
          <Route
            element={
              <RequireAuth
                allowedRoles={[Roles.Owner, Roles.Admin, Roles.Manager]}
              />
            }
          >
            <Route path="admin" element={<AdminLayout />}>
              <Route index element={<Home />} />
              {/* Shipments */}
              <Route path="shipments">
                <Route index element={<Shipments />} />
                <Route path="edit" element={<ShipmentEdit />} />
                <Route path="edit/:shipmentId" element={<ShipmentEdit />} />
                <Route path="delete/:shipmentId" element={<ShipmentDelete />} />
              </Route>
              {/* Couriers */}
              <Route path="couriers">
                <Route index element={<Couriers />} />
                <Route path="edit" element={<CourierEdit />} />
                <Route path="edit/:courierId" element={<CourierEdit />} />
                <Route path="delete/:courierId" element={<CourierDelete />} />
                <Route path="deliveryplans">
                  <Route path=":courierId" element={<DeliveryPlans />} />
                  <Route path="edit/:courierId" element={<DeliveryPlanEdit />} />
                  <Route path="edit/:courierId/:deliveryPlanId" element={<DeliveryPlanEdit />} />
                  <Route path="delete/:courierId/:deliveryPlanId" element={<DeliveryPlanDelete />} />
                </Route>
              </Route>
              {/* Orders */}
              <Route path="orders">
                <Route index element={<Orders />} />
                <Route path=":orderId" element={<OrderEdit />} />
              </Route>
              {/* Payment methods */}
              <Route path="payment-methods">
                <Route index element={<PaymentMethods />} />
                <Route path="edit" element={<PaymentMethodEdit />} />
                <Route path="edit/:paymentMethodId" element={<PaymentMethodEdit />} />
                <Route path="delete/:paymentMethodId" element={<PaymentMethodDelete />} />
              </Route>
              {/* Categories */}
              <Route path="categories">
                <Route index element={<Categories />} />
                <Route path="edit" element={<CategoryEdit />} />
                <Route path="edit/:categoryId" element={<CategoryEdit />} />
                <Route path="delete/:categoryId" element={<CategoryDelete />} />
              </Route>
              {/* Products */}
              <Route path="products">
                <Route index element={<Products />} />
                <Route path=":categoryId" element={<Products />} />
                <Route path="edit" element={<ProductEdit />} />
                <Route path="edit/:categoryId" element={<ProductEdit />} />
                <Route
                  path="edit/:categoryId/:productId"
                  element={<ProductEdit />}
                />
                <Route
                  path="edit/images/:productId"
                  element={<ProductImages />}
                />
                <Route
                  path="edit/images/upload/:productId"
                  element={<ProductUploadImage />}
                />
                <Route
                  path="delete/:categoryId/:productId"
                  element={<ProductDelete />}
                />
              </Route>
              {/* Units */}
              <Route path="units">
                <Route index element={<Units />} />
                <Route path="edit" element={<UnitEdit />} />
                <Route path="edit/:unitId" element={<UnitEdit />} />
                <Route path="delete" element={<UnitDelete />} />
                <Route path="delete/:unitId" element={<UnitDelete />} />
              </Route>
              {/* Countries */}
              <Route path="countries">
                <Route index element={<Countries />} />
                <Route path="edit" element={<CountryEdit />} />
                <Route path="edit/:countryId" element={<CountryEdit />} />
                <Route path="delete/:countryId" element={<CountryDelete />} />
              </Route>
              <Route path="states">
                <Route index element={<States />} />
                <Route path=":countryId" element={<States />} />
                <Route path="edit" element={<StateEdit />} />
                <Route path="edit/:countryId" element={<StateEdit />} />
                <Route
                  path="edit/:countryId/:stateId"
                  element={<StateEdit />}
                />
                <Route
                  path="delete/:countryId/:stateId"
                  element={<StateDelete />}
                />
              </Route>
              <Route path="cities">
                <Route index element={<Cities />} />
                <Route path=":stateId" element={<Cities />} />
                <Route path="edit" element={<CityEdit />} />
                <Route path="edit/:stateId" element={<CityEdit />} />
                <Route path="edit/:stateId/:cityId" element={<CityEdit />} />
                <Route
                  path="delete/:stateId/:cityId"
                  element={<CityDelete />}
                />
              </Route>
              <Route path="users">
                <Route index element={<Users />} />
                <Route path="delete/:email" element={<UserDelete />} />
                <Route path="edit/:email" element={<UserEdit />} />
              </Route>
              <Route path="roles">
                <Route index element={<RolesList />} />
                <Route path="edit" element={<RoleEdit />} />
                <Route path="edit/:roleId" element={<RoleEdit />} />
                <Route path="delete" element={<RoleDelete />} />
                <Route path="delete/:roleId" element={<RoleDelete />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
