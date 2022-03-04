import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useLoaderData } from "remix";
import { lecturerWithInfo } from "~/controllers/lecturerController";
import { Attendance } from "@prisma/client";
import { format } from "date-fns";

function Row({ row, lect }: { row: Attendance; lect: string }) {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow
        sx={{
          "& > *": { borderBottom: "unset", border: "1px solid darkgray" },
        }}
      >
        <TableCell>
          <Button
            aria-label="expand row"
            sx={{ textTransform: "capitalize" }}
            variant="outlined"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? "Close" : "Open"}
          </Button>
        </TableCell>
        <TableCell component="th" scope="row">
          {lect}
        </TableCell>
        <TableCell align="right">{row.code}</TableCell>
        <TableCell align="right">{row.session}</TableCell>
        <TableCell align="right">{row.group}</TableCell>
        <TableCell align="right">
          {format(new Date(row.createdAt), " p")}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>The attendance conmes here</TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function AttendanceTable() {
  const data: lecturerWithInfo = useLoaderData();
  const rows: Attendance[] | undefined = data.course?.attendances;

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      //sx={{ border: "1px solid darkgray" }}
    >
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell> Attd. Lecturer</TableCell>
            <TableCell align="right">Verification Code</TableCell>
            <TableCell align="right">Session</TableCell>
            <TableCell align="right">Group</TableCell>
            <TableCell align="right">Created At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row) => (
            <Row key={row.id} row={row} lect={data.name} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
