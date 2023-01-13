// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'
import AccountClockOutline from 'mdi-material-ui/AccountClockOutline'
// ** Hook Import
import { useSettings } from 'src/@core/hooks/useSettings'

const navigation = (props) => {
  const { sessionData } = useSettings()
  let navItem;
  switch(sessionData?.role){
    case 'admin': 
    navItem = [{
      title: 'Admin Dashboard',
      icon: HomeOutline,
      path: '/admin/dashboard'
    }, {
      title: 'Booking Requests',
      icon: HomeOutline,
      path: '/manage/tasks'
    }];
    break;
    case 'doctor': 
    navItem = [{
      title: 'Doctor Dashboard',
      icon: HomeOutline,
      path: '/doctor/dashboard'
    }]
    break;
    case 'hospital': 
    navItem = [{
      title: 'Hospital Dashboard',
      icon: HomeOutline,
      path: '/hospital/dashboard'
    }]
    break;
    default:
      navItem = [{
        title: 'Hospital Dashboard',
        icon: HomeOutline,
        path: '/hospital/dashboard'
      }]
  }  
  return [
    ...navItem,
    // {
    //   title: 'Account Settings',
    //   icon: AccountCogOutline,
    //   path: '/account-settings'
    // },
    {
      sectionTitle: 'Hospital'
    },
    {
      title: 'Available Beds',
      icon: Login,
      path: '/bed/list',
      openInNewTab: false
    },
    {
      title: 'Add Bed',
      icon: Login,
      path: '/bed/add',
      openInNewTab: false
    },
    // {
    //   title: 'Available Doctors',
    //   icon: Login,
    //   path: '/pages/doctor/list',
    //   openInNewTab: false
    // },
    {
      title: 'Add Doctor',
      icon: AccountPlusOutline,
      path: '/pages/doctor/add',
      openInNewTab: false
    },
    {
      title: 'Add Patient',
      icon: AccountPlusOutline,
      path: '/pages/patient/add',
      openInNewTab: false
    },
    {
      sectionTitle: 'Beds'
    },
    {
      title: 'Book Bed',
      icon: AccountClockOutline,
      path: '/bed/booking'
    }
  ]
}

export default navigation
