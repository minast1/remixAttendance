import React from 'react';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { Controller,SubmitHandler,useForm } from "react-hook-form";
import CircularProgress from '@mui/material/CircularProgress';
import { studentAuthStore } from '../../src/Store';
import { IFormInput, studentEnrollmentSchema } from '../../src/constants';
import { yupResolver } from '@hookform/resolvers/yup';
import { signIn } from 'next-auth/react';
import { useRouter } from "next/router";
import Alert from '@mui/material/Alert';
import theme from '../../src/theme';
import MenuItem from '@mui/material/MenuItem';
import {  Group, Level, Session } from '@prisma/client';


type EFormInput = {
    name: string
    indexnumber: number 
    session: Session 
    level: Level
    group : Group 
}
export default function Enroll() {
    /*  const { error } = useRouter().query; */
    const defaultValue = "MORNING";
    const levelDefaultValue = "100";
    const groupDefaultValue = "ONE";
  const { control, handleSubmit, register, formState: { errors } } = useForm<EFormInput>({
    resolver: yupResolver(studentEnrollmentSchema)}); 
 // const error = studentAuthStore(state => state.error);
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
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper sx={{
        display: 'flex',
        flexDirection: 'column'
      }}
        elevation={0}
        square>
        <Typography component="h1" variant="h5" sx={{fontWeight: 'bold'}}>
          ENROLL
              </Typography>
              <Typography variant="caption" color="gray">
                 Welome! Please fill in the required details to enroll
              </Typography>
        <form
           style={{   width: '100%'}}
         // onSubmit={handleSubmit(onSubmit)}
          method='post'
          action='/api/auth/callback/credentials'
          noValidate
           autoComplete="off">
          
            <Controller
            name="name"
            control={control}
            render={({ field: {  value } }) =>
              
             <TextField
                    variant="outlined"
                    size="small"
                margin="normal"
              {...register("name")}
            required
                error={!!errors.name}
                helperText={errors.name?.message}
            fullWidth
             defaultValue={value}
            //onChange={onChange}
            id="name"
            label="Student Name"
           // autoComplete="email"
            autoFocus
          />
          }
          />
                 
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
          
        
             <Controller
                          name="session"
                          control={control}
                          defaultValue={defaultValue.trim() as Session} 
                              
                          render={({ field: { onChange, value, onBlur } }) => (
                              <FormControl sx={{ mt:2, flexGrow: 1}}>
                                  <InputLabel>Session</InputLabel>
                                  <Select
                                      label="Status"
                                      size="small"
                                      fullWidth
                                      value={value}
                                     
                                      onChange={onChange}
                                      onBlur={onBlur}
                                  >
                                      {
                                          ['MORNING','EVENING','WEEKEND'].map((item, index) =>
                          
                                              <MenuItem key={index} value={item}>{item}</MenuItem>
                                          )
                                      }
                                  </Select>
                              </FormControl>
                          )}/>        
           <Controller
                          name="level"
                          control={control}
                          defaultValue={levelDefaultValue.trim() as Level} 
                              
                          render={({ field: { onChange, value, onBlur } }) => (
                              <FormControl sx={{ mt: 3, display:'flex'}}>
                                  <InputLabel>Level</InputLabel>
                                  <Select
                                      label="Level"
                                      size="small"
                                      value={value}
                                      onChange={onChange}
                                      onBlur={onBlur}
                                  >
                                      {
                                          ['100', '200','300', '400'].map((item, index) =>
                          
                                              <MenuItem key={index} value={item}>{item}</MenuItem>
                                          )
                                      }
                                  </Select>
                              </FormControl>
                          )}/>    
         
                   <Controller
                          name="group"
                          control={control}
                          defaultValue={groupDefaultValue.trim() as Group} 
                              
                          render={({ field: { onChange, value, onBlur } }) => (
                              <FormControl sx={{ display:'flex', mt: 3, }}>
                                  <InputLabel>Group</InputLabel>
                                  <Select
                                      label="Group"
                                      size="small"
                                      value={value}
                                      onChange={onChange}
                                      onBlur={onBlur}
                                  >
                                      {
                                          ['ONE','TWO','THREE','FOUR'].map((item, index) =>
                          
                                              <MenuItem key={index} value={item}>{item}</MenuItem>
                                          )
                                      }
                                  </Select>
                              </FormControl>
                          )}/>    
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
                "Enroll"
          }
            
          </Button>
          <Grid container>
            
            <Grid item sx={{px:6}}>
                          <Link variant="caption" component="button"  onClick={(e) => {
                              e.preventDefault()
                              setAuthView('sign_in')
              }}>
                {"Already have an account? Sign In"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </Paper>
     
    </Container>
  );
}

