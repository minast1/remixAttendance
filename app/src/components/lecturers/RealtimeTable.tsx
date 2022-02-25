import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { CardHeader } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Card from '@mui/material/Card';
import  Button  from '@mui/material/Button';
import Chip from '@mui/material/Chip';



function createData(
  name: string,
  index: number,
  status: string,
) {
  return { name, index, status};
}

const rows = [
  createData('Giannis Antethokoumpo', 10094966, 'Present'),
  createData('Lebron James', 10094967, 'Present'),
  createData('Sadio Mane', 10094968, 'Absent'),
  createData('Mohammed Salah', 10094953, 'Present'),
    createData('Marcus Rashford', 1004453323, 'Presnet'),
];

export default function RealtimeTable() {
    return (
        <Card>
            <CardHeader
            subheader="Attendance Sheet for BITM401  29-03-2022"
            />
          <CardContent sx={{borderTop: '1px solid lightgray'}}>  
    <TableContainer component={Paper} sx={{maxHeight: 360}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Student Name</TableCell>
            <TableCell align="left">Student Id</TableCell>
            <TableCell align="left">Attendance Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">{row.index}</TableCell>
              <TableCell align="left"><Chip label={row.status} size="small" color={row.status === 'Present' ? 'success' : 'error'}/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
                </TableContainer>
            </CardContent>
            <CardActions >
                <Button size="small" color="warning" variant="contained">Clear</Button>
             <Button size="small"  variant="contained">Submit Attendance Sheet</Button>


            </CardActions>
            </Card>
  );
}