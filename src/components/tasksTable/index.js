// ** React Imports
import { useEffect, useState } from "react";
import axios from "axios";
// ** MUI Imports
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
// ** Hook Import
import { useSettings } from "src/@core/hooks/useSettings";
import { Button, Grid } from "@mui/material";

const TasksTable = () => {
  const columns = [
    { id: "taskId", label: "ID", minWidth: 170 },
    {
      id: "taskName",
      label: "Task",
    },
    {
      id: "hospitalId",
      label: "Hospital",
      parentKey: "taskData",
      getName:true,
    },
    {
      id: "bedId",
      label: "Bed",
      parentKey: "taskData",
      getName:true,
    },
    {
      id: "bedId",
      label: "Charges",
      parentKey: "taskData",
      getName:true,
    },
    {
      id: "patientId",
      label: "Patient",
      parentKey: "taskData",
      getName:true,
    },
    {
      id: "doctorId",
      label: "Doctor",
      parentKey: "taskData",
      getName:true,
    }
  ];
  // ** States
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [tasks, setTasks] = useState([]);
  const { updateSessionsData, sessionData } = useSettings();

  useEffect(() => {
    fetchData();
  }, []);
 
  const fetchData = () =>{
    axios.get(`http://3.236.24.43:8090/manager/tasks`).then((res) => {
      setTasks(res.data);
    });
  }
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleTask = (taskID, action) =>{
    if(action === 'approve'){
      axios.post(`http://3.236.24.43:8090/manager/approve/tasks/${taskID}`).then((res) => {
        console.log(res.data);
        fetchData();
      });
    }else if(action === 'reject'){
      axios.post(`http://3.236.24.43:8090/manager/reject/tasks/${taskID}`).then((res) => {
        console.log(res.data);
        fetchData();
      });
    }
  }
  console.log('sessionData', sessionData);
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  sx={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell sx={{ minWidth: 200 }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.length &&
              tasks
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column, index) => {
                        const value = column.parentKey
                          ? row[column.parentKey][column.id]
                          : row[column.id];
                          if(column.getName && column.id === 'hospitalId'){
                            value = sessionData?.hospitals[value]?.hospital?.name
                          } else if(column.getName && column.id === 'patientId'){
                            value = sessionData?.patients[value]?.name
                          } else if(column.getName && column.id === 'bedId' && column.label !== 'Charges'){
                            value = sessionData?.beds[value]?.bedType
                          } else if(column.getName && column.id === 'bedId'){
                            value = sessionData?.beds[value]?.bedCharges
                          }  
                        return (
                          <>
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                          {columns.length === index+1 && <TableCell>
                          <Grid container>
                            <Grid item xs={6}>
                              <Button variant="contained" color="success" size="small" onClick={()=>handleTask(row.taskId, 'approve')}>
                              Approve
                              </Button>
                            </Grid>
                            <Grid item xs={6}>
                              <Button variant="contained" color="error" size="small" onClick={()=>handleTask(row.taskId, 'reject')}>
                                Reject
                              </Button>
                            </Grid>
                          </Grid>
                        </TableCell>}
                        </>);
                      })}
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={tasks.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default TasksTable;
