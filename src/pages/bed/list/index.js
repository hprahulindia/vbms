// ** MUI Imports
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'

// ** Demo Components Imports
import AvailableBedsTable from 'src/components/availableBedsTable'

const BedList = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Available Bed List' titleTypographyProps={{ variant: 'h6' }} />
          <AvailableBedsTable />
        </Card>
      </Grid>
    </Grid>
  )
}

export default BedList
