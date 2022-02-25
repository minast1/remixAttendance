import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import  Button  from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Alert from '@mui/material/Alert';
import FormHelperText from '@mui/material/FormHelperText';
import  Grid  from '@mui/material/Grid';




export default function AttendanceForm() {

    const defaultValue = 'RECIEVED';

    return (
    
    <Box
      component="form"
      sx={{
          '& .MuiTextField-root': { m: 1 },
          p: 3,
      }}
      noValidate
          autoComplete="off"
          method="POST"
          //onSubmit={handleSubmit(onSubmit)}
        >
             <div style={{paddingBottom: 6}}>
                <Alert severity="info">Submit the secret Pin to confirm</Alert>   
            </div>
            <Grid container spacing={3}>
                <Grid item xs={8}>
               
              
                      <TextField
                          required
                
                          //error={!!errors.name}
                          //helperText={errors.name?.message}
                          //defaultValue={value}
                          fullWidth
                          id="outlined-required"
                          type="number"
                          size="small"
                          label="Attendance Pin"
                          placeholder="Attendance Pin"
                      />
                
                </Grid>
                <Grid item xs={4}>
                     <Button size="medium" sx={{width: '70%', mt:1}} type="submit" color="warning" variant="contained">Submit</Button>
                </Grid>
              
              <Divider sx={{ my:1}} />
            </Grid>
     
            </Box>
        
  );
}