import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AttendanceForm from "~/src/components/lecturers/AttendanceForm";
import RealtimeTable from "~/src/components/lecturers/RealtimeTable";
import StudentsTable from "~/src/components/lecturers/StudentsTable";
import { ActionFunction, LoaderFunction, useLoaderData } from "remix";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import {
  getSessionLecturerWithInfo,
  lecturerSessionData,
  lecturerWithInfo,
} from "~/controllers/lecturerController";
import { lecturerAttendanceValidator } from "~/lib/constants";
import { validationError } from "remix-validated-form";
import { getSession } from "~/lib/session.server";
import { createAttendanceSheet } from "~/controllers/attendanceController";
import AttendanceSheetModal from "~/src/components/lecturers/AttendanceSheetModal";
import { db } from "~/lib/db.server";
import startOfDay from "date-fns/startOfDay";
import { endOfDay } from "date-fns";

export let loader: LoaderFunction = async ({ request }) => {
  const auth_session = await getSession(request.headers.get("cookie"));
  const start = startOfDay(new Date());
  const end = endOfDay(new Date());

  const user = auth_session.get("user");
  const { id, session } = user;
  // console.log(id);

  const lecturer = await db.lecturer.findFirst({
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
              students: true,
            },
          },
        },
      },
    },
  });
  return lecturer;
};

const LecturerDashboard = () => {
  const lecturer: lecturerWithInfo = useLoaderData();
  console.log(lecturer);
  const [toggle, setToggle] = React.useState<boolean>(false);
  return (
    <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>
      <AttendanceSheetModal />
      <Alert severity="info">
        <AlertTitle>{`Welcome ${lecturer?.name} to the Lecturer Dashboard`}</AlertTitle>
        <Stack>
          <Box>
            Click on the <strong>Create New Attendance Button</strong> to create
            a new attendance. This will toggle a form to create the attendance
            for the course— Once the form is submitted, an auto generated code
            will be provided for students to authenticate with.
          </Box>

          <Button
            size="small"
            variant="contained"
            onClick={() => setToggle(!toggle)}
            sx={{ mt: 1, width: "20%" }}
          >
            Create New Attendance
          </Button>
        </Stack>
      </Alert>
      {toggle && (
        <Card sx={{ mb: 5, mt: 3 }} elevation={10}>
          <AttendanceForm />
        </Card>
      )}

      <Card sx={{ mb: 10, mt: 3 }} elevation={10}>
        <CardHeader
          title={
            <Box display="flex" alignItems="center">
              <Typography variant="h5" sx={{ mt: 2, mr: 1 }}>
                Student Attendance Statistics
              </Typography>
              <img
                style={{ height: 40, width: 40 }}
                alt="attendance"
                src="/attendance.png"
              />
            </Box>
          }
          subheader="Lectures Conducted 67"
        />

        <CardContent sx={{ borderTop: "1px solid lightgray" }}>
          <StudentsTable />
        </CardContent>
        <CardActions disableSpacing></CardActions>
      </Card>
    </Container>
  );
};

export default LecturerDashboard;

export const action: ActionFunction = async ({ request }) => {
  let session = await getSession(request.headers.get("cookie"));
  const result = await lecturerAttendanceValidator.validate(
    await request.formData()
  );
  if (result.error) return validationError(result.error);

  const { group, date } = result.data;
  const { user } = session.data;

  return await createAttendanceSheet({ user, group, date });
};
