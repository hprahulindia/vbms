// ** MUI Imports
import Grid from '@mui/material/Grid'

import AddBedForm from 'src/views/add-bed-form'

const AddBed = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <AddBedForm />
      </Grid>
    </Grid>
  )
}

export default AddBed