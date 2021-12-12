import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import  React , {useEffect , useState} from 'react';
import { emphasize, styled , Button} from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ReceiptIcon from '@mui/icons-material/Receipt';
import TextField from '@mui/material/TextField';
import { useSelector , useDispatch } from 'react-redux'
import { Link , useHistory } from 'react-router-dom'
import myStyled from 'styled-components'
import {addShippingAddress} from '../../redux/cartReducer'

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === 'dark'
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor: ' #e74c3c',

    color: 'white',
    width: '150px',
    fontWeight: 700,
    height: '40px',
    marginTop: '20px',
    marginLeft : '200px',
    '&:hover, &:focus': {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
}); // TypeScript only: need a type cast here because https://github.com/Microsoft/TypeScript/issues/26591


const MainBox = myStyled.div `
    display: flex;
    flex-direction: column;
`;

const TopBox = myStyled.div`
    display: flex;
    flex-direction: column;
    max-width: 400px;
    margin: auto;
    margin-top: 50px;
    border: 0.3px solid black;
    padding: 20px;
`;


const Text = myStyled.h6`
    font-size: 16px;
    margin-bottom: 20px;
    margin-top: 10px;
`;

const Heading = myStyled.h6`
    font-size: 20px;
    margin-bottom: 20px;
    color: #fa8231;
    margin: auto;
`;

const shipInit = {
    address: '',
    city: '',
    postCode : '',
    country: ''
}

export default function Checkout() {
    const { shippingAddress , payment  } = useSelector(state => state.cart)
    const { orders } = useSelector(state => state.orderReducer)
    const [ shippingData , setMyData ] = useState(shipInit)
    const dispatch = useDispatch();
    const history = useHistory();

    const handleShipAdress = () => {
        dispatch(addShippingAddress(shippingData))
        history.push('/checkout/payment')
    }
  return (
      < >
      <Navbar/>
        <div >
            <Breadcrumbs aria-label="breadcrumb">
                <StyledBreadcrumb
                    href="#"
                    label="Shipping"
                    style={{cursor: 'pointer'}}
                    onClick={() => console.log("Shipping Addres")}
                    component={Link}
                    to="/checkout"
                    icon={<LocalShippingIcon fontSize="small" style={{color: 'white' , }} />}
                />
                {
                    (Object.keys(shippingAddress).length === 0 && payment === '' && Object.keys(orders).length === 0 ) && (
                        <>
                            <StyledBreadcrumb disabled={true}  label="Payment" icon={<AccountBalanceIcon style={{color:  'white' , }}  />} />
                            <StyledBreadcrumb
                                label="Place Order"
                                style={{ backgroundColor: '#7f8c8d'}}
                                disabled={true}
                                icon={<ReceiptIcon style={{color: 'white' , }} disabled={true} />}
                            />
                        </>
                    )
                }

                {
                    (Object.keys(shippingAddress).length !== 0 && payment === '' && Object.keys(orders).length === 0 ) && (
                        <>
                            <StyledBreadcrumb  label="Payment" icon={<AccountBalanceIcon style={{color:  'white' , cursor: 'pointer' }} />} style={{cursor: 'pointer'}}  component={Link} to="/checkout/payment"  />
                            <StyledBreadcrumb
                                label="Place Order"
                                style={{ backgroundColor: '#7f8c8d'}}
                                disabled={true}
                                icon={<ReceiptIcon style={{color: 'white' , }} disabled={true} />}
                            />
                        </>
                    )
                }
                {
                    (Object.keys(shippingAddress).length !== 0 && payment  !== '' && Object.keys(orders).length === 0 ) && (
                        <>
                            <StyledBreadcrumb  label="Payment" icon={<AccountBalanceIcon style={{color:  'white' , }}  />} style={{cursor: 'pointer'}}  component={Link} to="/checkout/payment"  />
                           <StyledBreadcrumb
                                label="Place Order"
                                component={Link}
                                to="/checkout/orderDetails"
                                style={{cursor: 'pointer'}}
                                icon={<ReceiptIcon style={{color: 'white'}}
                                /> }
                            />
                        </>
                    )

                }

                {
                    (Object.keys(shippingAddress).length !== 0 && payment !== '' && Object.keys(orders).length !== 0) && (
                        <>
                            <StyledBreadcrumb  label="Payment" icon={<AccountBalanceIcon style={{color:  'white' , }}  />} style={{cursor: 'pointer'}}  component={Link} to="/checkout/payment"  />
                            <StyledBreadcrumb
                                label="Place Order"
                                component={Link}
                                to="/checkout/orderDetails"
                                style={{cursor: 'pointer'}}
                                icon={<ReceiptIcon style={{color: 'white'}}
                                /> }
                            />
                        </>
                    )

                }
            </Breadcrumbs>
        </div>


        <TopBox>
          <Heading>Shipping Details:</Heading>
          <MainBox>
              <Text>Address:</Text>
              <TextField label="Address" id="outlined-size-normal" name="address" value={shippingData?.address || shippingAddress?.address} onChange={(e) => setMyData({...shippingData , [e.target.name] : e.target.value})}  />
          </MainBox>

           <MainBox>
              <Text>City:</Text>
              <TextField label="City" id="outlined-size-normal" name="city" value={shippingData?.city || shippingAddress?.city} onChange={(e) => setMyData({...shippingData , [e.target.name] : e.target.value})}  />
          </MainBox>

           <MainBox>
              <Text>Postal Code:</Text>
              <TextField label="Postal Code" id="outlined-size-normal" name="postCode" value={shippingData?.postCode || shippingAddress?.postCode } onChange={(e) => setMyData({...shippingData , [e.target.name] : e.target.value})}  />
          </MainBox>

           <MainBox>
              <Text>Country:</Text>
              <TextField label="Country" id="outlined-size-normal" name="country" value={shippingData?.country || shippingAddress?.country} onChange={(e) => setMyData({...shippingData , [e.target.name] : e.target.value})}  />
          </MainBox>

          <Button variant="contained" style={{marginTop: '20px'}} onClick={handleShipAdress} >Add Details</Button>

        </TopBox>

        <Footer/>
    </>
  );
}

