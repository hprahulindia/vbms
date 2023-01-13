// ** MUI Imports
import Grid from '@mui/material/Grid'

import AddPatientForm from 'src/views/add-patient-form'

const AddPatient = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <AddPatientForm />
      </Grid>
    </Grid>
  )
}

export default AddPatient