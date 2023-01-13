// ** MUI Imports
import Grid from '@mui/material/Grid'

import AddDoctorForm from 'src/views/add-doctor-form'

const AddDoctor = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <AddDoctorForm />
      </Grid>
    </Grid>
  )
}

export default AddDoctor