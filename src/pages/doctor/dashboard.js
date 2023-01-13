// ** MUI Imports
import Grid from '@mui/material/Grid'
// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import BedStatisticsCard from 'src/views/admin/BedStatisticsCard'
import TasksTable from 'src/components/tasksTable'
import Bookings from '../bookings'
const Dashboard = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={12}>
          <BedStatisticsCard />
        </Grid>
        <Grid item xs={12} md={12}>
          <TasksTable/>
        </Grid>
        <Grid item xs={12}>
          <Bookings />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default Dashboard
