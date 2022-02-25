import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import  Button  from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
//import { Status } from '.prisma/client';
import FormHelperText from '@mui/material/FormHelperText';



type AFormInput = {
    name: string
    phone: string
    prefix: string
    address:string
    track_number: string
    //status: Status
}

const AttendanceForm = () => {
    return (
       <Card>
              <CardHeader
                subheader="Create New Attendance Sheet"
            />
            
            <CardContent sx={{borderTop: '1px solid lightgray'}}>
 <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1 },
      }}
      noValidate
          autoComplete="off"
          method="POST"
         // onSubmit={handleSubmit(onSubmit)}
    >
          <div>
             
                      <TextField
                         // error={!!errors.name}
                         // helperText={errors.name?.message}
                         // defaultValue={value}
                          sx={{width:'55%'}}
                          id="outlined-required"
                          size="small"
                          label="Client Name"
                          placeholder="John Doe"
                      />
                  
              
                      <TextField
                          required
                          //error={!!errors.phone}
                         // helperText={errors.phone?.message}
                           sx={{width:'25%'}}
                           // defaultValue={value}
                          id="outlined-required"
                          size="small"
                          placeholder="222-2222-222"
                          label="Client Telephone"
                      />

                      <TextField
                          required
                          //error={!!errors.address}
                          //helperText={errors.address?.message}
                           sx={{width:'90%'}}
                            //defaultValue={value}
                          id="outlined-required"
                          size="small"
                          placeholder=" xxx example street"
                          label="Client Address"
                      />
            
              
                      <TextField
                          required
                          //error={!!errors.prefix}
                          // helperText={errors.prefix?.message}
                           sx={{width:'18%', ml: '80px'}}
                          id="outlined-required"
                          size="small"
                          label="Awb Prefix"
                       // defaultValue={value}
                          placeholder="001"
                      />
            
              <Divider sx={{ mt: 2, mb: 2 }} />
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ flexDirection: 'row', alignItems: 'center' }}>
                     
                              <TextField
                                  fullWidth
                                  InputProps={{
                                      readOnly: true,
                                  }}
                                  id="outlined-required"
                                  //defaultValue={'xxxxxxxx'}
                                 // defaultValue={value}
                                 // error={!!errors.track_number}
                                  placeholder='Generate code'
                                  //helperText={errors.track_number?.message}
                                   sx={{width:'50%'}}
                                  size="small"
                                  label="Tracking Number"
                                  InputLabelProps={{ shrink: true }}
                              />
                       
                     
                              <FormControl sx={{ mt: 1, ml: 4 }}>
                                  <InputLabel>Status</InputLabel>
                                  <Select
                                      label="Status"
                                      size="small"
                                     // value={value}
                                     
                                     // onChange={onChange}
                                     // onBlur={onBlur}
                                  >
                                      {
                                          [{ labe: 'first', value: 1 }, { label: 'second', value: 2}].map((item, index) =>
                          
                                              <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                                          )
                                      }
                                  </Select>
                              </FormControl>
                                   
                             </Box>
                  
                            <Button size="small"
                               // onClick={handleTrackinChange}
                                sx={{ mt: 1, width: '40%' }} variant="contained">Generate Tracking Number</Button>
                 
              </Box>
              <Divider sx={{ my: 3 }} />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                   <Button size="small" type="submit" color="warning" variant="contained">Create Attendance Sheet</Button>
              </Box>
             
             
      </div>
     
    </Box> 
            </CardContent>
               </Card>
  )
};

export default AttendanceForm;
