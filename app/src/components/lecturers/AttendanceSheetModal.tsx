import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Avatar from "@mui/material/Avatar";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import RealtimeTable from "./RealtimeTable";
import { useActionData, useLoaderData } from "remix";
import { Attendance, Prisma } from "@prisma/client";
import {
  lecturerSessionData,
  lecturerWithInfo,
} from "~/controllers/lecturerController";
import { toLowerCase } from "~/lib/constants";
import { AtttendanceType } from "~/controllers/attendanceController";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  //p: 1,
};

export default function AttendanceSheetModal() {
  const lecturer: lecturerWithInfo = useLoaderData();
  const isNewAttendanceCreated = useActionData();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  React.useEffect(() => {
    setOpen(!!isNewAttendanceCreated);
    /*isNewAttendanceCreated && setToken(isNewAttendanceCreated.code)*/
  }, [isNewAttendanceCreated]);

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CardHeader
            avatar={
              <Avatar
                src="/itsa.jpg"
                aria-label="logo"
                alt="ItsaLogo"
                sx={{ width: 90, height: 90 }}
              >
                R
              </Avatar>
            }
            title={
              <Typography variant="h6" sx={{ fontSize: 14 }}>
                Attendance Sheet for {lecturer?.course?.code}{" "}
                {toLowerCase(lecturer?.session as string)} Session
              </Typography>
            }
            /*  subheader={
              attendance && new Date(attendance.createdAt).toLocaleDateString()
            }*/
          />
          <CardContent sx={{ borderTop: "1px solid lightgray" }}>
            <RealtimeTable />
          </CardContent>
          <CardActions>
            <Button size="small" variant="contained">
              Clear Entries
            </Button>
            <Button
              size="small"
              variant="contained"
              color="success"
              onClick={() => setOpen(false)}
            >
              Close
            </Button>
          </CardActions>
        </Box>
      </Modal>
    </div>
  );
}
