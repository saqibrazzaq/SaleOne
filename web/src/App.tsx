import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Categories from "./admin/category/Categories";
import CategoryDelete from "./admin/category/CategoryDelete";
import CategoryEdit from "./admin/category/CategoryEdit";
import Home from "./admin/Home";
import RequireAuth from "./api/require-auth";
import Login from "./auth/Login";
import Logout from "./auth/Logout";
import UnAuthorized from "./auth/UnAuthorized";
import { Roles } from "./dtos/Auth";
import AdminLayout from "./layout/AdminLayout";
import Layout from "./layout/Layout";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="auth">
            <Route path="login" element={<Login />} />
            <Route path="logout" element={<Logout />} />
            <Route path="unauthorized" element={<UnAuthorized />} />
          </Route>
          <Route
            element={
              <RequireAuth
                allowedRoles={[Roles.Owner, Roles.Admin, Roles.Manager]}
              />
            }
          >
            <Route path="admin" element={<AdminLayout />}>
              <Route index element={<Home />} />
              <Route path="categories" element={<Categories />} />
              <Route path="categories/edit" element={<CategoryEdit />} />
              <Route path="categories/edit/:categoryId" element={<CategoryEdit />} />
              <Route path="categories/delete/:categoryId" element={<CategoryDelete />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
