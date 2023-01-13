// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import TrendingUp from 'mdi-material-ui/TrendingUp'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import CellphoneLink from 'mdi-material-ui/CellphoneLink'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import { useEffect, useState } from 'react'
import { useSettings } from 'src/@core/hooks/useSettings'
const initData = {
  bookings :{
    stats: 0,
    color: 'info',
    title: 'Bookings',
    icon: <CurrencyUsd sx={{ fontSize: '1.75rem' }} />
  },
  totalBeds : {
    stats: 0,
    title: 'Total Beds',
    color: 'primary',
    icon: <TrendingUp sx={{ fontSize: '1.75rem' }} />
  },
  availableBeds: {
    stats: 0,
    title: 'Available Beds',
    color: 'success',
    icon: <AccountOutline sx={{ fontSize: '1.75rem' }} />
  },
  allocatedBeds:{
    stats: 0,
    color: 'warning',
    title: 'Allocated Beds',
    icon: <CellphoneLink sx={{ fontSize: '1.75rem' }} />
  }
}
const renderStats = () => {
  const [bedsData, setBedsData] = useState(initData);
  const { sessionData } = useSettings(); 
  useEffect(()=>{
    let temp = bedsData;
    const beds = sessionData.beds;
    temp['bookings']['stats'] = sessionData?.bookings?.length;
    temp['totalBeds']['stats'] = Object.keys(beds).length;
    temp['availableBeds']['stats'] = Object.keys(beds).filter((key)=>{
      return beds[key].bedAvailability ==='AVAILABLE'
    }).length;
    temp['allocatedBeds']['stats'] = Object.keys(beds).filter((key)=>{
      return beds[key].bedAvailability ==='ALLOCATED'
    }).length;
    setBedsData({...temp});
  }, [sessionData?.beds])
  return Object.keys(bedsData).length && Object.keys(bedsData).map((item, index) => (
    <Grid item xs={12} sm={3} key={index}>
      <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          variant='rounded'
          sx={{
            mr: 3,
            width: 44,
            height: 44,
            boxShadow: 3,
            color: 'common.white',
            backgroundColor: `${bedsData[item].color}.main`
          }}
        >
          {bedsData[item].icon}
        </Avatar>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='caption'>{bedsData[item].title}</Typography>
          <Typography variant='h6'>{bedsData[item].stats}</Typography>
        </Box>
      </Box>
    </Grid>
  ))
}

const BedStatisticsCard = () => {

  return (
    <Card>
      <CardHeader
        title='Bed Statistics'
        titleTypographyProps={{
          sx: {
            mb: 2.5,
            lineHeight: '2rem !important',
            letterSpacing: '0.15px !important'
          }
        }}
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
        <Grid container spacing={[5, 0]}>
          {renderStats()}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default BedStatisticsCard
