import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Typography from "@mui/material/Typography";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import { StyledTableCell, StyledTableRow } from "../DashboardTable";
import Stack from "@mui/material/Stack";
import { useLoaderData } from "remix";
import { lecturerWithInfo } from "~/controllers/lecturerController";
import { Attendance } from "@prisma/client";
import { format } from "date-fns";

export default function RealtimeTable({
  attendance,
}: {
  attendance: Attendance & {
    students: {
      signedAt: Date;
      student: {
        id: string;
        name: string;
        indexnumber: string;
      };
    }[];
  };
}) {
  const lecturer: lecturerWithInfo = useLoaderData();

  const total = lecturer?.course?.students.filter(
    (student) => student.group === attendance.group
  );
  return (
    <Card>
      <CardContent sx={{ borderTop: "1px solid lightgray" }}>
        <Stack spacing={1} sx={{ mb: 1 }}>
          <Typography sx={{ fontSize: 15, color: "black" }}>
            Total Students In Group: {total?.length}
          </Typography>
          <Typography sx={{ fontSize: 15, color: "black" }}>
            Total Students Present: {attendance.students.length}
          </Typography>
          <Typography sx={{ fontSize: 15, color: "black" }}>
            Total Students Absent:{" "}
            {typeof total !== "undefined" &&
              total?.length - attendance.students.length}
          </Typography>
        </Stack>
        <TableContainer
          component={Paper}
          sx={{ maxHeight: 360, overflow: "auto" }}
        >
          <Table
            sx={{ minWidth: 450 }}
            aria-label="simple table"
            stickyHeader
            size="small"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell>Student Name</StyledTableCell>
                <StyledTableCell align="left">StudentId</StyledTableCell>
                <StyledTableCell align="left">SignIn Time</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {attendance.students?.map((item) => (
                <StyledTableRow
                  key={item.student.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{item.student.name}</TableCell>
                  <TableCell align="left">{item.student.indexnumber}</TableCell>
                  <TableCell align="left">
                    {format(new Date(item.signedAt), " p")}
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
