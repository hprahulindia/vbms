import axios from 'axios'
// ** Hook Import
import { useSettings, SettingsContext } from 'src/@core/hooks/useSettings'

const setSessionData = () =>{
    const { updateSessionsData, sessionData } = useSettings()  

    axios.get(`http://3.236.24.43:8090/patient/patients`)  
    .then(res => {
      let data = {};
      if(res.status === 200 && res?.data.length){
        res?.data.map(item=>{
          data[item.id] = item;
        });  
        // setPatients(data);
        updateSessionsData({...sessionData, patients:data})
      }
    });
    axios.get(`http://3.236.24.43:8090/bed/beds`)  
    .then(res => {
      let data = {};
      if(res.status === 200 && res?.data.length){
        res?.data.map(item=>{
          data[item.bedId] = item;
        });  
        // setBeds(data);
        updateSessionsData({...sessionData, beds:data})
      }
    });
    axios.get(`http://3.236.24.43:8090/bed/hospital/beds`)  
    .then(res => {
      let data = {};
      if(res.status === 200 && Object.keys(res?.data).length){
        Object.keys(res?.data).map(key=>{
          if(res?.data[key].beds.length){
            data[key] = res?.data[key];
          }
        });  
        //setHospitals(data);
        updateSessionsData({...sessionData, hospitals:data})
      }
    });
    axios.get(`http://3.236.24.43:8090/manager/tasks`)  
    .then(res => {  
      updateSessionsData({tasks:res?.data});
    });
    axios.get(`http://3.236.24.43:8090/booking/bookings`)  
    .then(res => {  
      updateSessionsData({...sessionData, bookings:res?.data});
    });
}

export default setSessionData; 