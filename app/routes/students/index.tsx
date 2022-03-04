import Box from "@mui/material/Box";
import React from "react";
import AttendanceForm from "~/src/components/students/AttendaceForm";
import { ActionFunction, LoaderFunction, Session } from "remix";
import { authenticator } from "~/lib/auth.server";
import { validationError } from "remix-validated-form";
import { getSession } from "~/lib/session.server";
//import { useAttendanceStore } from "~/lib/store";

export default function Attendance() {
  return <AttendanceForm />;
}

export const loader: LoaderFunction = async ({ request }) => {
  let session: Session = await getSession(request.headers.get("cookie"));

  return session.data;
};

export const action: ActionFunction = async ({ request }) => {
  // console.log("HURAAAAAA U FIGURED IT OUT!");
  let session: Session = await getSession(request.headers.get("cookie"));
  /* const result = await studentAttendanceValidator.validate(
    await request.formData()
  );

  //If the auth code is valid 
  //send find attendance where auth code === code and connect the user to it
  //return the attendance 
  if (result.error) return validationError(result.error);

  const { user } = session.data;
*/
  return null;
};
