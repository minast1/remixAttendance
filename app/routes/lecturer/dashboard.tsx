import React from "react";

import { LoaderFunction, Outlet } from "remix";
import AdminLayout from "~/src/components/lecturers/AdminLayout";

import { authenticator } from "~/lib/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  return await authenticator.isAuthenticated(request, {
    failureRedirect: "/lecturer",
  });
};

const LecturerDashboardLayout = () => {
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
};

export default LecturerDashboardLayout;
