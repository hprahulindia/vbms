// ** MUI Imports
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'

// ** Demo Components Imports
import BookingTable from 'src/components/bookingTable'

const Bookings = () => {
  return (
    <Grid container spacing={6}>
      {/* <Grid item xs={12}>
        <Typography variant='h5'>
          Booking List
        </Typography>
      </Grid> */}
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Booking List' titleTypographyProps={{ variant: 'h6' }} />
          <BookingTable />
        </Card>
      </Grid>
    </Grid>
  )
}

export default Bookings
