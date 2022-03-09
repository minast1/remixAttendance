import React from "react";
import { getSession } from "~/lib/session.server";
import { db } from "~/lib/db.server";
import { Lecturer, Prisma } from "@prisma/client";
import { LoaderFunction, Outlet, json } from "remix";
import AdminLayout from "~/src/components/lecturers/AdminLayout";
import { getYear } from "date-fns";
import { authenticator } from "~/lib/auth.server";
import { studentAttendanceStats } from "~/controllers/studentController";

export const loader: LoaderFunction = async ({ request }) => {
  const user = (await authenticator.isAuthenticated(request, {
    failureRedirect: "/lecturer",
  })) as Lecturer;

  return await studentAttendanceStats(user.id, user.session);
};

const LecturerDashboardLayout = () => {
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
};

export default LecturerDashboardLayout;
