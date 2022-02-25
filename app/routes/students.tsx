import * as React from "react";
import { Outlet, useLoaderData, json, useActionData } from "remix";
import StudentDashboardLayout from "~/src/components/StudentDashboardLayout";
import { ActionFunction, LoaderFunction } from "remix";
import { authenticator } from "~/lib/auth.server";
import { getCoursesByLevel } from "~/controllers/courseController";
import { addStudentCourses } from "~/controllers/studentController";

export let loader: LoaderFunction = async ({ request }) => {
  // If the user is already authenticated redirect to /dashboard directl
  const sessionId: any = await authenticator.isAuthenticated(request, {
    failureRedirect: "/",
  });

  return await getCoursesByLevel(sessionId.id as string);
};

export default function StudentRoute() {
  return (
    <StudentDashboardLayout>
      <Outlet />
    </StudentDashboardLayout>
  );
}
export const action: ActionFunction = async ({ request }) => {
  let formData = await request.formData();

  let data = formData.getAll("courses") as string[];

  return await addStudentCourses(data, request);
};
