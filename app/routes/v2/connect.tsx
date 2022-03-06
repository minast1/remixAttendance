import React from "react";
import { ActionFunction, LoaderFunction, redirect } from "remix";
import { getSession } from "~/lib/session.server";
import { db } from "~/lib/db.server";
import startOfDay from "date-fns/startOfDay";
import { endOfDay } from "date-fns";

export const loader: LoaderFunction = async ({ request }) => {
  const auth_session = await getSession(request.headers.get("cookie"));
  const start = startOfDay(new Date());
  const end = endOfDay(new Date());

  const user = auth_session.get("user");
  const { id, session } = user;
  // console.log(id);
  const result = await db.lecturer.findFirst({
    where: {
      id: id,
    },
    include: {
      course: {
        include: {
          students: true,
          attendances: {
            where: {
              createdAt: {
                gte: start,
                lt: end,
              },
              session: { equals: session },
            },
            include: {
              students: {
                select: {
                  student: {
                    select: { id: true, indexnumber: true, name: true },
                  },
                  signedAt: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return result;
};

const ConnectRoute = () => {
  return null;
};

export default ConnectRoute;

export const action: ActionFunction = async ({ request }) => {
  let session = await getSession(request.headers.get("cookie"));
  const data = await request.formData();
  const code = data.get("code") as string;
  console.log(data);
  const user = session.get("user");
  const attendance = await db.attendance.findFirst({
    where: {
      code: code,
    },
  });
  if (!attendance) {
    throw new Error("dont exist");
  }
  const updateAttendanceStudents = await db.studentsInAttendances.create({
    data: {
      attendanceId: attendance.id,
      studentId: user.id,
      signedAt: new Date(),
    },
  });
  return updateAttendanceStudents;
};
