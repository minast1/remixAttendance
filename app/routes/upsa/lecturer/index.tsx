import React from "react";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import theme from "~/src/theme";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import { Link } from "remix";
import { FormInputText } from "~/src/components/FormInputText";
import SubmitButton from "~/src/components/SubmitButton";
import { ValidatedForm } from "remix-validated-form";
import { lecturerSignInValidator } from "~/lib/constants";

const LecturerSignIn = () => {
  return (
    <Container component="main" maxWidth="xs" sx={{ pt: 10 }}>
      <CssBaseline />
      <Paper
        sx={{
          //marginTop: theme.spacing(8),
          p: theme.spacing(3),
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        elevation={5}
        square
      >
        <Avatar
          sx={{ margin: theme.spacing(1), width: 80, height: 80 }}
          alt="ItsaLogo"
          src="/itsa.jpg"
        />
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          sx={{ width: "90%", mt: theme.spacing(1) }}
          method="post"
          // action='/api/auth/callback/credentials'
          id="lecturer_signin"
          validator={lecturerSignInValidator}
          component={ValidatedForm}
        >
          <FormInputText name="email" label="Email" />
          <FormInputText
            name="password"
            label="Password"
            type="password"
            styles={{ mt: 4 }}
          />
          <SubmitButton title="SignIn" formId="lecturer_signin" />
          <Grid container>
            <Grid item xs>
              <Link to="." style={{ color: "blue", fontSize: 13 }}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link
                to="/upsa/lecturer/register"
                style={{ color: "blue", fontSize: 13 }}
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default LecturerSignIn;
