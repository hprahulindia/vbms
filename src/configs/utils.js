const getAppData = () => {
  axios.get(`http://3.236.24.43:8090/patient/patients`).then((res) => {
    let data = {};
    if (res.status === 200 && res?.data.length) {
      res?.data.map((item) => {
        data[item.id] = item;
      });
      updateSessionsData({patients:res?.data})
    }
  });
  axios.get(`http://3.236.24.43:8090/bed/beds`).then((res) => {
    let data = {};
    if (res.status === 200 && res?.data.length) {
      res?.data.map((item) => {
        data[item.bedId] = item;
      });
      updateSessionsData({beds:res?.data})
    }
  });
  axios.get(`http://3.236.24.43:8090/bed/hospital/beds`).then((res) => {
    let data = {};
    if (res.status === 200 && Object.keys(res?.data).length) {
      Object.keys(res?.data).map((key) => {
        if (res?.data[key].beds.length) {
          data[key] = res?.data[key];
        }
      });
      updateSessionsData({hospitals:res?.data})
    }
  });
  axios.get(`http://3.236.24.43:8090/manager/tasks`).then((res) => {
    updateSessionsData({tasks:res?.data})
  });
  axios.get(`http://3.236.24.43:8090/booking/bookings`).then((res) => {
    updateSessionsData({ bookings: res?.data });
  });
};

export default getAppData;