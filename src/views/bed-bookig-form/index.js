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
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import Select from '@mui/material/Select'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

const CustomInput = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Birth Date' autoComplete='off' />
})

const BedBookingForm = () => {
  // ** States
  const [language, setLanguage] = useState([])
  const [date, setDate] = useState(null)

  const [values, setValues] = useState({
    password: '',
    password2: '',
    showPassword: false,
    showPassword2: false
  })

  useEffect(()=>{
    axios.get(`http://3.236.24.43:8090/hospital`)  
      .then(res => {  
        console.log('hospitals', res); 
      });
      axios.get(`http://3.236.24.43:8090/bed/beds`)  
      .then(res => {  
        console.log('beds', res); 
      }); 
  }, [])
  // Handle Password
  const handlePasswordChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  // Handle Confirm Password
  const handleConfirmChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowConfirmPassword = () => {
    setValues({ ...values, showPassword2: !values.showPassword2 })
  }

  const handleMouseDownConfirmPassword = event => {
    event.preventDefault()
  }

  // Handle Select
  const handleSelectChange = event => {
    setLanguage(event.target.value)
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
                <InputLabel id='hospital-select-label'>Hospital</InputLabel>
                <Select
                  label='Hospital'
                  defaultValue=''
                  id='hospital-select-label'
                  labelId='hospital-select-label'
                >
                  <MenuItem value='UK'>UK</MenuItem>
                  <MenuItem value='USA'>USA</MenuItem>
                  <MenuItem value='Australia'>Australia</MenuItem>
                  <MenuItem value='Germany'>Germany</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='bed-select-label'>Bed</InputLabel>
                <Select
                  label='Bed'
                  defaultValue=''
                  id='bed-select-label'
                  labelId='bed-select-label'
                >
                  <MenuItem value='UK'>UK</MenuItem>
                  <MenuItem value='USA'>USA</MenuItem>
                  <MenuItem value='Australia'>Australia</MenuItem>
                  <MenuItem value='Germany'>Germany</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='bed-select-label'>Patient Name</InputLabel>
                <Select
                  label='Patient Name'
                  defaultValue=''
                  id='patient-select-label'
                  labelId='patient-select-label'
                >
                  <MenuItem value='UK'>UK</MenuItem>
                  <MenuItem value='USA'>USA</MenuItem>
                  <MenuItem value='Australia'>Australia</MenuItem>
                  <MenuItem value='Germany'>Germany</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='bed-select-label'>Doctor</InputLabel>
                <Select
                  label='Doctor'
                  defaultValue=''
                  id='doctor-select-label'
                  labelId='doctor-select-label'
                >
                  <MenuItem value='UK'>UK</MenuItem>
                  <MenuItem value='USA'>USA</MenuItem>
                  <MenuItem value='Australia'>Australia</MenuItem>
                  <MenuItem value='Germany'>Germany</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        <Divider sx={{ margin: 0 }} />
        <CardActions>
          <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
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
