import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Avatar from "@mui/material/Avatar";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import RealtimeTable from "./RealtimeTable";

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
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
                Attendance Sheet for BGEC102 Morning Session
              </Typography>
            }
            subheader="September 14, 2016"
          />
          <CardContent sx={{ borderTop: "1px solid lightgray" }}>
            <Stack spacing={1}>
              <Typography sx={{ fontWeight: "bold" }}>
                Total Students: 50
              </Typography>
              <Typography sx={{ fontWeight: "bold" }}>
                Total Present: 30
              </Typography>
              <Typography sx={{ fontWeight: "bold" }}>
                Total Absent: 20
              </Typography>
            </Stack>
            <RealtimeTable />
          </CardContent>
          <CardActions>
            <Button size="small" variant="contained">
              Clear Entries
            </Button>
            <Button size="small" variant="contained" color="error">
              Delete Attendance
            </Button>
          </CardActions>
        </Box>
      </Modal>
    </div>
  );
}
