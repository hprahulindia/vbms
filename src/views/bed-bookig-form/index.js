// ** React Imports
import { forwardRef, useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
// ** MUI Imports
import Alert from '@mui/material/Alert' 
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
// ** Hook Import
import { useSettings } from 'src/@core/hooks/useSettings'

const BedBookingForm = () => {
  // ** States
  const [data, setData] = useState({});
  const [beds, setBeds] = useState({});
  const [doctors, setDoctors] = useState([]);
  const { sessionData, updateSessionsData } = useSettings();  
  const router = useRouter()
  // Handle Select
  const handleSelectChange = prop => event => {
    if(event?.target?.value){
      const hospitalID = event.target.value;
      if(prop === 'hospitalId'){
        let bedsData={};
        if(sessionData?.hospitals[hospitalID].beds.length){
          sessionData?.hospitals[hospitalID].beds.map((item)=>{
            if(item.bedAvailability==='AVAILABLE'){
              bedsData[item.bedId] = item
            }
          });
          setDoctors(sessionData?.hospitals[hospitalID].doctors);
        }
        setBeds(bedsData);      
      }
      setData({ ...data, [prop]: hospitalID });
    }
  }
  
  const handleSubmit = () => {
    axios.post('http://3.236.24.43:8090/bed/apply', data).then(function (response) {
      console.log(response);
      const url = `/${sessionData?.role}/dashboard/`;
      alert('Booking request added successfully!');
      // router.push(url)
    }).catch(function (error) {
      console.log(error);
    });
  }
  return (
    <Card>
      <CardHeader title='Bed Booking Form' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <form onSubmit={e => e.preventDefault()}>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='hospitalId'>Hospital</InputLabel>
                <Select
                  label='Hospital'
                  defaultValue=''
                  id='hospitalId'
                  labelId='hospitalId'
                  onChange={handleSelectChange('hospitalId')}
                >
                  {sessionData?.hospitals && Object.keys(sessionData?.hospitals).length && Object.keys(sessionData?.hospitals).map(key=>{
                    return <MenuItem value={key}>{sessionData?.hospitals[key]?.hospital?.name}-{key}</MenuItem>
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='bedId'>Bed</InputLabel>
                <Select
                  label='Bed'
                  defaultValue=''
                  id='bedId'
                  labelId='bedId'
                  onChange={handleSelectChange('bedId')}
                >
                  {Object.keys(beds).length && Object.keys(beds).map(key=>{
                    return <MenuItem value={key}>{sessionData?.beds[key]?.bedType}-{sessionData?.beds[key]?.bedAvailability}</MenuItem>
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='patientId'>Patient Name</InputLabel>
                <Select
                  label='Patient Name'
                  defaultValue=''
                  id='patientId'
                  labelId='patientId'
                  onChange={handleSelectChange('patientId')}
                >
                  {sessionData?.patients && Object.keys(sessionData?.patients).length && Object.keys(sessionData?.patients).map(key=>{
                    return <MenuItem value={key}>{sessionData?.patients[key]?.name}-{key}</MenuItem>
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='doctorId'>Doctor</InputLabel>
                <Select
                  label='Doctor'
                  defaultValue=''
                  id='doctorId'
                  labelId='doctorId'
                  onChange={handleSelectChange('doctorId')}
                >{doctors.length && doctors.map((item)=>{
                  return <MenuItem value={item.doctorId}>{item.doctorName}</MenuItem>
                  })}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        <Divider sx={{ margin: 0 }} />
        <CardActions>
          <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained' onClick={handleSubmit}>
            Book
          </Button>
          <Button size='large' color='secondary' variant='outlined'>
            Cancel
          </Button>
        </CardActions>
      </form>
    </Card>
  )
}

export default BedBookingForm
