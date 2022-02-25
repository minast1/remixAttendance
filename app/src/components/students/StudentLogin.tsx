import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { Controller,SubmitHandler,useForm } from "react-hook-form";
import CircularProgress from '@mui/material/CircularProgress';
import { studentAuthStore } from '../../src/Store';
import { IFormInput } from '../../src/constants';
import { yupResolver } from '@hookform/resolvers/yup';
import { signIn } from 'next-auth/react';
import { useRouter } from "next/router";
import Alert from '@mui/material/Alert';
import theme from '../../src/theme';



export default function StudentLogin() {
  /*  const { error } = useRouter().query; */
  const { control, handleSubmit, register, formState: { errors } } = useForm<IFormInput>({/*
    resolver: yupResolver(loginSchema)
  */}); 
  const error = studentAuthStore(state => state.error);
  const setAuthView = studentAuthStore(state => state.setAuthView)
  const loading = studentAuthStore(state => state.loading)
  /*
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
     
    data.callbackUrl =  `/home`
   // data.redirect = false;
    authStore.setState({ loading: true });
    signIn('credentials' , data  );
    //reset();
   authStore.setState({loading: false });

    // console.log(data)

  }*/
 
  return (
    <Container component="main" maxWidth="xs" sx={{pt:5}}>
      <CssBaseline />
      <Paper sx={{
        display: 'flex',
        flexDirection: 'column',
       
      }}
        elevation={0}
        square>
        <Typography component="h1" variant="h5" sx={{fontWeight: 'bold'}}>
          Log In
              </Typography>
              <Typography variant="caption" color="gray">
                 Welome back! Please login to continue
              </Typography>
        <form
           style={{   width: '100%'}}
         // onSubmit={handleSubmit(onSubmit)}
          method='post'
          action='/api/auth/callback/credentials'
          noValidate
           autoComplete="off">
          
          <Controller
            name="indexnumber"
            control={control}
            render={({ field: {value} }) =>
              
              <TextField
                variant="outlined"
                    color="primary"
                    size="small"
                margin="normal"
               // {...register("email")}
                //value={value}
            required
            //error={!!errors.email}
            // onChange={onChange}
                fullWidth
               // helperText={errors.email?.message}
                defaultValue={value}
                id="email"
                label="Index Number"
            //autoComplete="email"
            autoFocus
          />
          }
          />
          
          
         
          {/*error && <Alert severity="error">{error}</Alert> */}

          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
             sx={{ margin: theme.spacing(3, 0, 2),}}
          >
         {
            //  loading ? <CircularProgress color="inherit" size={20} /> :
                "SignIn"
          }
            
          </Button>
          <Grid container>
            
            <Grid item sx={{px:6}}>
                          <Link variant="caption" component="button"  onClick={(e) => {
                              e.preventDefault()
                              setAuthView('sign_up')
              }}>
                {"Don't have an account ? Enroll"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </Paper>
     
    </Container>
  );
}

