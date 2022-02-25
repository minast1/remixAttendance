import * as React from "react";
import Logout from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import { useStudentStore } from "~/lib/store";
import { useFetcher } from "remix";

export default function ProfileCard() {
  const fetcher = useFetcher();
  const student = useStudentStore.getState().user;

  return (
    <>
      <Paper
        component="div"
        elevation={7}
        sx={{
          p: 2,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          height: 400,
          background: "white",
          borderRadius: "6px",
          fontSize: ".875rem",
          wordWrap: "break-word",
          border: 0,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            backgroundImage: 'url("/itsa.jpg")',
            backgroundPosition: "center",
            backgroundSize: "contain",
            borderRadius: 25,
            boxShadow: 10,
            fontSize: "0.875rem",
            p: "1.25rem",
            alignSelf: "center",
            bottom: 300,
            height: 150,
            width: 150,
            zIndex: "tooltip",
          }}
        />
        <Box
          sx={{
            zIndex: "modal",
            display: "flex",
            justifyContent: "flex-end",
            height: 90,
          }}
        ></Box>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            marginTop: 10,
          }}
        >
          <Box
            sx={{
              pl: 2,
              fontSize: 23,
              fontWeight: "bold",
              color: "#212121",
              textTransform: "capitalize",
            }}
          >
            {student?.name}
          </Box>
          <Divider sx={{ width: "100%" }} variant="middle" />
          <Stack
            spacing={0}
            justifyContent="flex-start"
            direction="column"
            alignItems="flex-start"
          >
            <Box display="flex" sx={{ mt: 2 }} alignItems="center">
              <Typography
                sx={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "#757575",
                  pr: 2,
                }}
              >
                {" "}
                Student Id:{" "}
              </Typography>
              <Typography sx={{ fontSize: 16, fontWeight: "bold" }}>
                {student?.indexnumber}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <Typography
                sx={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "#757575",
                  pr: 2,
                }}
              >
                {" "}
                Session:{" "}
              </Typography>
              <Typography
                sx={{
                  fontSize: 16,
                  fontWeight: "bold",
                  textTransform: "capitalize",
                }}
              >
                {`${student?.session} Session`}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <Typography
                sx={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "#757575",
                  pr: 2,
                }}
              >
                {" "}
                Level:{" "}
              </Typography>
              <Typography sx={{ fontSize: 16, fontWeight: "bold" }}>
                {student?.level}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <Typography
                sx={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "#757575",
                  pr: 2,
                }}
              >
                {" "}
                Group:{" "}
              </Typography>
              <Typography sx={{ fontSize: 16, fontWeight: "bold" }}>
                Group{" "}
                <span style={{ textTransform: "capitalize" }}>
                  {student?.group}
                </span>
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <Typography
                sx={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "#757575",
                  pr: 2,
                }}
              >
                {" "}
                Attendance Status:{" "}
              </Typography>
              <Chip label="Very Weak" color="error" size="small" />
            </Box>
          </Stack>
          <Divider sx={{ mt: 6, width: "100%" }} />
          <Box display="flex" pt={1} alignSelf="flex-end">
            <Button
              variant="contained"
              size="small"
              sx={{ textTransform: "capitalize" }}
              endIcon={<Logout />}
              onClick={() =>
                fetcher.submit(
                  { button: "student_signout" },
                  { method: "post", action: `/auth/signOut` }
                )
              }
            >
              Logout
            </Button>
          </Box>
        </div>
      </Paper>
    </>
  );
}
