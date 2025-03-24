import React, { useEffect, useState } from "react";
import AdminSidebar from "../../Components/AdminSidebar/AdminSidebar";
import { Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const AdminLayout = () => {
  const [user, setUser] = useState();
  const navigator = useNavigate();
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const decoded = jwtDecode(token);
      if (!decoded?.role?.includes("ADMIN")) navigator("/");
    } else navigator("/");
  }, []);
  return (
    <div className="flex h-screen">
      <div className="w-auto">
        <AdminSidebar />
      </div>
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
