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
import CardActions from "@mui/material/CardActions";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import { StyledTableCell, StyledTableRow } from "../DashboardTable";

function createData(name: string, index: number, status: string) {
  return { name, index, status };
}
let current = new Date();
const rows = [
  createData("Giannis Antethokoumpo", 10094966, current.toLocaleTimeString()),
  createData(
    "Asampana Busia Chief Kofi",
    10094967,
    current.toLocaleTimeString()
  ),
  createData("Zlatan Ibrahimovic", 10094968, current.toLocaleTimeString()),
  createData("Bogdan Bogdanovich", 10094953, current.toLocaleTimeString()),
  createData("Marcus Rashford", 1004453323, current.toLocaleTimeString()),
  createData(
    "Asampana Busia Chief Kofi",
    10094967,
    current.toLocaleTimeString()
  ),
  createData("Sadio Mane", 10094968, current.toLocaleTimeString()),
  createData("Mohammed Salah", 10094953, current.toLocaleTimeString()),
  createData("Marcus Rashford", 1004453323, current.toLocaleTimeString()),
  createData(
    "Asampana Busia Chief Kofi",
    10094967,
    current.toLocaleTimeString()
  ),
  createData("Sadio Mane", 10094968, current.toLocaleTimeString()),
  createData("Mohammed Salah", 10094953, current.toLocaleTimeString()),
  createData("Marcus Rashford", 1004453323, current.toLocaleTimeString()),
];

export default function RealtimeTable() {
  return (
    <Card>
      <CardContent sx={{ borderTop: "1px solid lightgray" }}>
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
              {rows.map((row, index) => (
                <StyledTableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{row.name}</TableCell>
                  <TableCell align="left">{row.index}</TableCell>
                  <TableCell align="left">{row.status}</TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
