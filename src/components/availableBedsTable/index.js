// ** React Imports
import { useEffect, useState } from 'react'
import axios from 'axios'
// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import { Box } from '@mui/system'
import { InputAdornment, TextField } from '@mui/material'
import { Magnify } from 'mdi-material-ui'
import { useSettings } from "src/@core/hooks/useSettings";

const bedsTable = () => {
  const columns = [
    { id: 'bedId', label: 'Bed', minWidth: 100 },
    {
      id: 'hospitalId',
      label: 'Hospital',
      getName:true
    },
    {
      id: 'hospitalId',
      label: 'City',
      getName:true
    },
    {
      id: 'bedType',
      label: 'Bed Type',
    },
    {
      id: 'bedCharges',
      label: 'Charges',
    },
    {
      id: 'bedAvailability',
      label: 'Bed Availability',
      minWidth: 170,
      align: 'right',
    }
  ]
  // ** States
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [availableBeds, setAvailableBeds] = useState([]);
  const [beds, setBeds] = useState([]);
  const { updateSessionsData, sessionData } = useSettings();

  useEffect(()=>{
    axios.get(`http://3.236.24.43:8090/bed/beds`)  
    .then(res => {
      const bedData = res?.data.filter((item)=>item.bedAvailability==='AVAILABLE');
      setBeds(bedData);
      setAvailableBeds(bedData)
    });
  }, [])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  console.log('beds', beds);
  const handleSearch = (e) =>{
    const keyword = e.target.value.toLowerCase();
    const beds = availableBeds.filter((item)=>{
      const hospital = sessionData?.hospitals[item.hospitalId]?.hospital?.name.toLowerCase();

      if(hospital?.includes(keyword)){
        return true;
      }else{
        return false;
      }
    });
    setBeds(beds)
  }
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Box sx={{ display:'flex', justifyContent:'flex-end', margin:'0 16px 0 16px'}}>
      <TextField
          onChange={handleSearch}
          placeholder='Search'
          size='small'
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Magnify fontSize='small' />
              </InputAdornment>
            )
          }}
        />
      </Box>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {beds.length && beds.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              return (
                <TableRow hover role='checkbox' tabIndex={-1} key={row.id}>
                  {columns.map(column => {
                    const value = row[column.id]
                    if(column.getName && column.id === 'hospitalId' && column.label !== 'City'){
                      value = sessionData?.hospitals[value]?.hospital?.name
                      value = value?value:'No Name Found'
                    }else if(column.getName && column.id === 'hospitalId'){
                      value = sessionData?.hospitals[value]?.hospital?.city
                      value = value?value:'No Name Found'
                    }
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={beds.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default bedsTable
