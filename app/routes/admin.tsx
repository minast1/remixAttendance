import React from "react";
import { Outlet } from "remix";
import AdminLayout from "~/src/components/lecturers/AdminLayout";

const AdminRoute = () => {
  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  );
};

export default AdminRoute;
