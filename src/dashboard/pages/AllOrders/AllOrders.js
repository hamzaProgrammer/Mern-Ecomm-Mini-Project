import React , {useState , useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Box  , Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import {makeStyles} from '@mui/styles'
import { useSelector , useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {getAllRedOrders} from '../../../actions/orderActions'


import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(id, orderItems, shippingAddrress, total, userId) {
  return { id, orderItems, shippingAddrress, total, userId };
}

const ProductList = () => {
    const {allOrders} = useSelector(state => state.orderReducer)
    const dispatch = useDispatch();
    const rows = [
        allOrders?.map((row) => (
            createData(row?._id, "View Order Items", row?.shippingAddrress?.city  , row?.totalPrice , row?.userId)
        ))
    ];

    // for showing Movies in Table Grid
    useEffect(() => {
        const getMovies = async () => {
            try {
                dispatch(getAllRedOrders())
            } catch (error) {
                console.log("Error is : ",error)
            }
        }
        getMovies();
    }, [dispatch , allOrders])

    return (
        < >
            <Box>
                <Typography variant="h6">All Orders</Typography>
                <div style={{ height: 400, width: '100%' , marginLeft: '-30px' }}>

                    <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Order ID:</StyledTableCell>
                            <StyledTableCell align="center">Order Items:</StyledTableCell>
                            <StyledTableCell align="center">Address:</StyledTableCell>
                            <StyledTableCell align="center">Total: </StyledTableCell>
                            <StyledTableCell align="center">UserID:</StyledTableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                                {console.log("Rows Item : ", rows)}
                        {rows[0]?.map((row) => (
                            <StyledTableRow key={row?.id}>
                            <StyledTableCell align="center">{row?.id}</StyledTableCell>
                            <StyledTableCell component="th" scope="row">
                            <Link to={`/admin/order/${row?.id}`}>
                                {row?.orderItems}
                            </Link>
                            </StyledTableCell>
                            <StyledTableCell align="center">{row?.shippingAddrress}</StyledTableCell>
                            <StyledTableCell align="center">${row?.total}</StyledTableCell>
                            <StyledTableCell align="center">{row?.userId}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </TableContainer>
                </div>
            </Box>
        </>
    )
}

export default ProductList
