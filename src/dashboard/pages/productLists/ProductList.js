import React , {useState , useEffect } from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { FormControl , Box , Typography }  from '@mui/material';
import Select from '@mui/material/Select';
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { format} from 'timeago.js';
import {useSelector , useDispatch } from 'react-redux'
import { getUserCurntOrder , UpdateUserOrder } from '../../../actions/orderActions'



const Head = styled.h5`
    font-size: 17px;
`;

const StatusHead = styled.h5 `
    font-size: 17px;
    min-width: 100px;
`;

const Text = styled.h6`
    font-size: 18px;
    margin-top: 2px;
    margin-left: 30px;
    color: #e74c3c
`;


const ProductList = () => {
    const {id} = useParams();
    const { userOrder  } = useSelector(state => state.orderReducer)
    const dispatch = useDispatch();
    const [ orderData , setOrderData ] = useState([])

    const [status, setStatus] = React.useState('');
    const handleStatusChange = async (event) => {
        setStatus(event.target.value);
        dispatch(UpdateUserOrder(id , {...userOrder , isDelivered : event.target.value } , dispatch));
    };

    // for showing order in Table Grid
    useEffect(() => {
        dispatch(getUserCurntOrder(id , dispatch))
        setOrderData(userOrder[0])
    }, [id])

    useEffect(() => {
        setOrderData(userOrder)
    },[dispatch , userOrder])

    return (
        <>
            {

            }
            <div style={{ height: 400, width: '600px' }}>
                <Typography variant="h6" style={{marginBottom: '30px', marginLeft: '50px', fontSize: '27px'}} >Order Details:</Typography>
                <Box style={{display: 'flex' , marginTop: '20px'}} >
                    <Head>Order ID : </Head>
                    <Text>{orderData[0]?._id || orderData?._id  }</Text>
                </Box>
                <Box style={{display: 'flex' , marginTop: '20px'}} >
                    <Head>User ID : </Head>
                    <Text>{orderData[0]?.userId || orderData?.userId}</Text>
                </Box>
                <Box style={{display: 'flex' , marginTop: '20px'}} >
                    <Head>Order Placed At : </Head>
                    <Text>{format(orderData[0]?.createdAt)}</Text>
                </Box>
                <Box style={{display: 'flex' , marginTop: '20px'}} >
                    <Head>Payment Method : </Head>
                    <Text>{orderData[0]?.paymentMethod || orderData?.paymentMethod}</Text>
                </Box>
                <Box style={{display: 'flex' , marginTop: '20px'}} >
                    <Head>Shipping Address : </Head>
                    <Text>{orderData[0]?.shippingAddrress?.city || orderData?.shippingAddrress?.city}</Text>
                </Box>
                <Box style={{display: 'flex' , marginTop: '20px'}} >
                    <Head>Total Price($) : </Head>
                    <Text>{orderData[0]?.totalPrice || orderData?.totalPrice}</Text>
                </Box>
                <Box style={{display: 'flex' , marginTop: '20px'}} >
                    <Head>Order Status : </Head>
                    <Text>{orderData[0]?.isDelivered || orderData?.isDelivered}</Text>
                </Box>
                <Box sx={{ maxWidth: 250 }} style={{display:'flex', marginTop: '20px' }} >
                    <StatusHead>Change Order Status :</StatusHead>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Order Status</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={status}
                            label="status"
                            onChange={handleStatusChange}
                        >
                            <MenuItem value="Packing">Packing</MenuItem>
                            <MenuItem value="Dispatched">Dispatched</MenuItem>
                            <MenuItem value="Cancelled">Cancelled</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </div>
        </>
    )
}

export default ProductList
