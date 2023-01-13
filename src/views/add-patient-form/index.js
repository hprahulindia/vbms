// ** React Imports
import { forwardRef, useState, useContext, useEffect } from 'react'
import axios from 'axios'
// ** MUI Imports
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

const AddPatientForm = () => {
  // ** States
  const [data, setData] = useState({});
  const [beds, setBeds] = useState({});

  const { sessionData } = useSettings();  

  // Handle Select
  const handleSelectChange = prop => event => {
    const hospitalID = event.target.value;
    if(prop === 'hospital'){
      let bedsData={};
      Object.keys(sessionData?.beds).map((key)=>{
        debugger
        if(parseInt(sessionData?.beds[key].hospitalId) === parseInt(hospitalID)){
          bedsData[key] = sessionData?.beds[key];
        }
      });
      setBeds(bedsData);      
    }
    setData({ ...data, [prop]: hospitalID });
  }
  
  const handleSubmit = () => {
    axios.post('http://3.236.24.43:8090/bed/apply', data).then(function (response) {
      console.log(response);
    }).catch(function (error) {
      console.log(error);
    });
  }

  return (
    <Card>
      <CardHeader title='Add New Bed Details' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <form onSubmit={e => e.preventDefault()}>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='hospital'>Hospital</InputLabel>
                <Select
                  label='Hospital'
                  defaultValue=''
                  id='hospital'
                  labelId='hospital'
                  onChange={handleSelectChange('hospital')}
                >
                  {sessionData?.hospitals && Object.keys(sessionData?.hospitals).length && Object.keys(sessionData?.hospitals).map(key=>{
                    return <MenuItem value={key}>{sessionData?.hospitals[key]?.name}-{key}</MenuItem>
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='bed'>Bed</InputLabel>
                <Select
                  label='Bed'
                  defaultValue=''
                  id='bed'
                  labelId='bed'
                  onChange={handleSelectChange('bed')}
                >
                  {Object.keys(beds).length && Object.keys(beds).map(key=>{
                    return <MenuItem value={key}>{sessionData?.beds[key]?.bedType}-{sessionData?.beds[key]?.bedAvailability}</MenuItem>
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='patient'>Patient Name</InputLabel>
                <Select
                  label='Patient Name'
                  defaultValue=''
                  id='patient'
                  labelId='patient'
                  onChange={handleSelectChange('patient')}
                >
                  <MenuItem value='31'>John Doe</MenuItem>
                  <MenuItem value='30'>Sam K</MenuItem>
                  <MenuItem value='29'>Amit Singh</MenuItem>
                  <MenuItem value='28'>Peter P</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='doctor'>Doctor</InputLabel>
                <Select
                  label='Doctor'
                  defaultValue=''
                  id='doctor'
                  labelId='doctor'
                  onChange={handleSelectChange('doctor')}
                >
                  <MenuItem value='6514'>Dr. Hiramath</MenuItem>
                  <MenuItem value='6515'>Dr. Ketan</MenuItem>
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

export default AddPatientForm
