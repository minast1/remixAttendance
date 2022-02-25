import * as React from "react";
import { Outlet, useLoaderData, json, useActionData } from "remix";
import StudentDashboardLayout from "~/src/components/StudentDashboardLayout";
import { ActionFunction, LoaderFunction } from "remix";
import { authenticator } from "~/lib/auth.server";
import { Student, Course } from "@prisma/client";
import { getCoursesByLevel } from "~/controllers/courseController";
import { useStudentStore } from "~/lib/store";
import { addStudentCourses } from "~/controllers/studentController";

export let loader: LoaderFunction = async ({ request }) => {
  // If the user is already authenticated redirect to /dashboard directl
  const sessionId: any = await authenticator.isAuthenticated(request, {
    failureRedirect: "/",
  });

  return await getCoursesByLevel(sessionId.id as string);
};

export default function StudentRoute() {
  const {
    student,
    courses,
  }: {
    student: (Student & { courses: Course[] }) | null;
    courses: Course[];
  } = useLoaderData();

  const setUser = useStudentStore((state) => state.setUser);
  const setCourses = useStudentStore((state) => state.setCourses);

  React.useEffect(() => {
    setUser(student);
    setCourses(courses);
  }, [student, courses]);

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
