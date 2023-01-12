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
    navItem = {
      title: 'Admin Dashboard',
      icon: HomeOutline,
      path: '/admin/dashboard'
    };
    break;
    case 'doctor': 
    navItem = {
      title: 'Doctor Dashboard',
      icon: HomeOutline,
      path: '/doctor/dashboard'
    }
    break;
    case 'staff': 
    navItem = {
      title: 'Staff Dashboard',
      icon: HomeOutline,
      path: '/staff/dashboard'
    }
    break;
    case 'user': 
    navItem = {
      title: 'User Dashboard',
      icon: HomeOutline,
      path: '/user/dashboard'
    }
    break;
    default:
      navItem = {
        title: 'User Dashboard',
        icon: HomeOutline,
        path: '/user/dashboard'
      }
  }  
  return [
    navItem,
    {
      title: 'Account Settings',
      icon: AccountCogOutline,
      path: '/account-settings'
    },
    {
      title: 'Bookings',
      icon: AccountClockOutline,
      path: '/bed/booking'
    },
    // {
    //   sectionTitle: 'Pages'
    // },
    // {
    //   title: 'Login',
    //   icon: Login,
    //   path: '/pages/login',
    //   openInNewTab: false
    // },
    // {
    //   title: 'Register',
    //   icon: AccountPlusOutline,
    //   path: '/pages/register',
    //   openInNewTab: false
    // },
    // {
    //   title: 'Error',
    //   icon: AlertCircleOutline,
    //   path: '/pages/error',
    //   openInNewTab: true
    // },
    // {
    //   sectionTitle: 'User Interface'
    // },
    // {
    //   title: 'Typography',
    //   icon: FormatLetterCase,
    //   path: '/typography'
    // },
    // {
    //   title: 'Icons',
    //   path: '/icons',
    //   icon: GoogleCirclesExtended
    // },
    // {
    //   title: 'Cards',
    //   icon: CreditCardOutline,
    //   path: '/cards'
    // },
    // {
    //   title: 'Tables',
    //   icon: Table,
    //   path: '/tables'
    // },
    // {
    //   icon: CubeOutline,
    //   title: 'Form Layouts',
    //   path: '/form-layouts'
    // }
  ]
}

export default navigation
