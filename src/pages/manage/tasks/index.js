// ** MUI Imports
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'

// ** Demo Components Imports
import TasksTable from 'src/components/tasksTable'

const BedList = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Bed Booking Request List' titleTypographyProps={{ variant: 'h6' }} />
          <TasksTable />
        </Card>
      </Grid>
    </Grid>
  )
}

export default BedList
