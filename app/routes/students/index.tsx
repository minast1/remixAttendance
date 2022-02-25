import Box from "@mui/material/Box";
import React from "react";
import AttendanceForm from "~/src/components/students/AttendaceForm";
import { ActionFunction } from "remix";
import { authenticator } from "~/lib/auth.server";

export default function Attendance() {
  return <AttendanceForm />;
}
