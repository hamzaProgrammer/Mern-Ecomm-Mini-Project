import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import  React , {useState , useEffect} from 'react';
import { emphasize, styled , Button , Box } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { useSelector , useDispatch } from 'react-redux'
import { Link , useHistory } from 'react-router-dom'
import myStyled from 'styled-components'
import { addNewOrder } from '../../actions/orderActions'


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
    margin-left: 50px;
    margin-top: 50px;
    padding: 20px;
`;

const Text = myStyled.h6`
    font-size: 27px;
    margin-bottom: 20px;
    margin-top: 30px;
    font-weight: 500;
    color: #222f3e
`;

const ErrorText = myStyled.h6 `
    font-size: 27px;
    margin-bottom: 20px;
    margin-top: 30px;
    font-weight: 500;
    color: red
`;

const MiniText = myStyled.h6 `
    font-size: 20px;
    margin-bottom: 20px;
    margin-top: 10px;
    color: #84817a
`;

const OrderItems = myStyled.div`
    display: flex;
    flex-direction: column;
    margin-top: 30px;
`;

const ProductDetail = myStyled.div `
        display: flex;
        width: 500px;
`;

const Image = myStyled.img `
        width: 100px;
        height: 100px;
        object-fit: cover;
`;

const Details = myStyled.div `
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 500px;
`;

const ProductName = myStyled.span `

`;

const ProductPrice = myStyled.div `
    font-size: 30px;
`;


export default function OrderDetails() {
     const history = useHistory();
    const {  isFetching , error  , orders} = useSelector(state => state.orderReducer)
    const { payment , shippingAddress , products , total } = useSelector(state => state.cart)
    const user = JSON.parse(localStorage.getItem('profile'));

    const dispatch = useDispatch();

    // dispatching to reducer
    const placeOrder = () => {
        dispatch(addNewOrder({
            orderItems: products,
            shippingAddrress: shippingAddress,
            paymentMethod: payment,
            totalPrice: total,
            userId : user?.myResult?._id
        }));
        history.push(`/myOrders`);
    }


  return (
      <>
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
                    (Object.keys(shippingAddress).length === 0 && payment === '' && Object.keys(orders).length === 0) && (
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
                    (Object.keys(shippingAddress).length !== 0 && payment === '' && Object.keys(orders).length === 0) && (
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
                    (Object.keys(shippingAddress).length !== 0 && payment !== '' && Object.keys(orders).length === 0) && (
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
          <MainBox>
              <Text>SHIPPING ADDRESS:</Text>
              <MiniText>{shippingAddress.address}</MiniText>
          </MainBox>

          <MainBox>
              <Text>PAYMENT METHOD:</Text>
              <MiniText>{payment}</MiniText>
          </MainBox>


        <Text>PRODUCTS IN CART: </Text>
        {
            error && (
                <ErrorText>Oops! Some Problem Occured in Placing order!!! </ErrorText>
            )
        }
        {
            products?.map((item) => (
                <>
                    <OrderItems>
                            <ProductDetail>
                                <Image src={ item?.image } />
                                <Details>
                                    <ProductName><b>{ item?.name } </b></ProductName>
                                </Details>
                                <ProductPrice> ${item?.price * item?.sentQty }</ProductPrice>
                            </ProductDetail>
                    </OrderItems>
                </>
            ))
        }

        <Box style={{display: 'flex' , justifyContent: 'space-between'}} >
            <Text>Total Amount : </Text>
            <Text><b>{total}</b></Text>
        </Box>

          <Button variant="contained" style={{ backgroundColor: 'black', color: 'white' , height: '50px', fontSize: '25px', marginTop: '120px'}} onClick={placeOrder} >Place Order</Button>

        </TopBox>

        <Footer/>
    </>
  );
}

