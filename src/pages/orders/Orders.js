import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import { Box , Typography , Button} from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import  React , {useEffect  } from 'react';
import { useSelector , useDispatch  } from 'react-redux'
import myStyled from 'styled-components'
import { getAllmyOrders , cancelOrder} from '../../actions/orderActions'


const MainBox = myStyled.div `
    display: flex;
    flex-direction: column;
    border: 1px solid black;
    padding: 10px;
    margin-bottom: 50px
`;

const TopBox = myStyled.div`
    display: flex;
    flex-direction: column;
    max-width: 400px;
    margin-left: 50px;
    margin-top: 50px;
    padding: 20px;
`;

const Text = myStyled.span`
    font-size: 22px;
    margin-bottom: 20px;
    margin-top: 10px;
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
    padding-top: 2px;
    padding-left: 20px;
    color: #84817a
`;

const OrderItems = myStyled.div`
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    width: 550px;
    padding: 10px;
    border: 1px solid black;
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
    font-size: 20px;
    margin-top: 20px
`;


export default function OrderDetails() {

    const {isFetching , error  , myOrders} = useSelector(state => state.orderReducer)
    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();


    // getting all myOrders of current User
    useEffect(() => {
        dispatch(getAllmyOrders(user?.myResult?._id , dispatch))
    }, [  dispatch , user?.myResult?._id  ])



  return (
      <>
      <Navbar/>
        <TopBox>
        {
            isFetching ? (
                <CircularProgress />
            ) : (
                Object.values(myOrders)?.map((item , i) => (
                <>
                    <Typography variant="h6" style={{marginLeft: '100px' , fontSize: '25px' , marginBottom: '20px' , color: '#d35400' , fontWeight: 600}} >Order No: {i+1}</Typography>
                    {
                        error ? (
                            <ErrorText>Oops! Some Problem Occured in Placing order!!! </ErrorText>
                        ) : (
                            <>
                                <MainBox>
                                    <Text>USER INFO :</Text>
                                    <Box style={{display: 'flex'}}>
                                        <Text>Name :</Text>
                                        <MiniText>{user?.myResult?.username}</MiniText>
                                    </Box>
                                    <Box style={{display: 'flex'}}>
                                        <Text>Email :</Text>
                                        <MiniText>{user?.myResult?.email}</MiniText>
                                    </Box>
                                    <Box style={{display: 'flex'}}>
                                        <Text>Address :</Text>
                                        <MiniText>{item?.shippingAddrress?.address}</MiniText>
                                    </Box>
                                    <Box style={{display: 'flex'}}>
                                        <Text>Delivered :</Text>
                                        <MiniText>{item?.isDelivered}</MiniText>
                                    </Box>
                                </MainBox>
                                
                                <MainBox>
                                    <Text>PAYMENT INFO :</Text>
                                    <Box style={{display: 'flex'}}>
                                        <Text>Payment Method :</Text>
                                        <MiniText>{item?.paymentMethod}</MiniText>
                                    </Box>
                                    <Box style={{display: 'flex'}}>
                                        <Text>Payment Status :</Text>
                                        <MiniText>{item?.isPaid === false ? 'UnPaid' : 'Paid'}</MiniText>
                                    </Box>
                                </MainBox>


                                <Text>PRODUCTS IN CART: </Text>
                                {
                                    item?.orderItems?.map((item) => (
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

                                <Box style={{display: 'flex' , justifyContent: 'space-between' , marginTop: '50px'}} >
                                    <Text style={{color: '#e74c3c' , fontWeight: 700}}>This Order Total : </Text>
                                    <Text><b>${item?.totalPrice}</b></Text>
                                </Box>
                            </>
                        )
                    }
                    
                </>
            ))
            )
            
        }

        </TopBox>

        <Footer/>
    </>
  );
}

