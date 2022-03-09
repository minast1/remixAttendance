import React from "react";
import { getSession } from "~/lib/session.server";
import { db } from "~/lib/db.server";
import { Lecturer, Prisma } from "@prisma/client";
import { LoaderFunction, Outlet, json, ActionFunction } from "remix";
import AdminLayout from "~/src/components/lecturers/AdminLayout";
import { getYear } from "date-fns";
import { authenticator } from "~/lib/auth.server";
import { studentAttendanceStats } from "~/controllers/studentController";
import { deleteAllStudentsFromAttendance } from "~/controllers/attendanceController";

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

export const action: ActionFunction = async ({ request }) => {
  const data = await request.formData();
  const Id = data.get("aId") as string;

  await deleteAllStudentsFromAttendance(Id);
  return null;
};
