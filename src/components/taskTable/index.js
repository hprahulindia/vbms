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
// ** Hook Import
import { useSettings } from 'src/@core/hooks/useSettings'

const columns = [
  { id: 'bookingId', label: 'ID', minWidth: 170 },
  { id: 'bedId', label: 'Bed', minWidth: 100 },
  {
    id: 'hospitalId',
    label: 'Hospital',
  },
  {
    id: 'doctorId',
    label: 'Doctor',
  },
  {
    id: 'patientId',
    label: 'Patient',
  },
  {
    id: 'fromTime',
    label: 'From Date',
    minWidth: 170,
    align: 'right',
  }
]

const BookingTable = () => {
  // ** States
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [bookings, setBookings] = useState([]);
  const { updateSessionsData, sessionData } = useSettings()  

  useEffect(()=>{
    axios.get(`http://3.236.24.43:8090/booking/bookings`)  
    .then(res => {
      setBookings(res.data);
    });
  }, [])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  console.log('bookings', bookings);
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
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
            {bookings.length && bookings.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              return (
                <TableRow hover role='checkbox' tabIndex={-1} key={row.id}>
                  {columns.map(column => {
                    const value = row[column.id]

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
        count={bookings.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default BookingTable
