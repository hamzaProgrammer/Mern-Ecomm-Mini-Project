import React , { useState , useEffect } from 'react'
import { Box } from '@mui/material'
import styled from 'styled-components'
import Navbar from '../../components/navbar/Navbar';
import Footer from './../../components/footer/Footer';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useSelector , useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { deleteProduct , updateCart } from '../../redux/cartReducer'
import { useHistory } from 'react-router-dom'


const Container = styled.div`

`;


const Wrapper = styled.div `
    padding: 20px;
`;

const Title = styled.h1 `
    font-weight: 300;
    text-align: center;
`;

const Top = styled.div `
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Bottom = styled.div `
    display:flex;
    justify-content: space-between;
    margin-bottom: 20px;
    border-bottom: 2px solid #eee;
    padding-bottom: 5px;
`;

const TopButton = styled.div `
    padding: 10px;
    font-weight: 600;
    cursor: pointer;
    border: ${props => props.type === "filled"  && "none"};
    background-color: ${props => props.type === "filled" ? "black" : "transparent"};
    color: ${props => props.type === "filled"  && "none"};
`;


const TopTexts = styled.div`

`;

const TopText = styled.span `
    text-decoration: underline;
    cursor:pointer;
    margin: 0px 10px;
`;


const Info = styled.div`
    flex: 3;
    margin-top: 20px;
`;



const Product = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom:5px;
    border-bottom: 2px solid #eee;
`;

const ProductDetail = styled.div `
    display: flex;
    flex: 2;
`;

const Image = styled.img `
    width: 200px;
    height: 150px;
    object-fit: cover;
`;

const Details = styled.div `
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span ``;

const ProductColor = styled.div `
    width: 20px;
    height:20px;
    border-radius:50%;
    margin-left: 5px;
    background-color:${props => props.color}
`;

const ProductSize = styled.span ``;

const PriceDetails = styled.div `
    flex:1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

`;


const ProductAmountContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom:center;
    margin-bottom: 20px;
`;

const ProductAmount = styled.div `
    font-size: 24px;
    margin: 5px;
`;

const ProductPrice = styled.div `
    font-size: 30px;
`;

const Summery = styled.div `
    flex: 1;
    border:0.5px solid lightgrey;
    border-radius: 10px;
    padding :20px;
    height: 50vh;
`;

const SummeryTitle = styled.h1`
    font-weight: 200;
`;

const SummeryItem = styled.div `
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
    font-weight: ${props => props.type === "total" && "500"};
    font-size: ${props => props.type === "total" && "24px"};
`;

const SummeryItemText = styled.span ``;

const SummeryItemPrice = styled.span ``;

const Button = styled.button `
    width: 100%;
    padding:10px;
    background-color: black;
    color:white;
    font-weight: 600;
    cursor: pointer
`;


const ErrorImage = styled.img`
    width: 500px;
    height: 450px;
    margin-left: 150px;
    margin-top: 50px;
`;


const AddContainer = styled.div `
    display: flex;
    flex-Direction: column;
    align-items: center;
    justify-content: space-between;
`;


const AmountContainer = styled.div `
    display: flex;
    align-items: center;
    font-weight: 700;
`;


const Amount = styled.span `
    width: 30px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid teal;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0px 5px;
`;





const Cart = () => {
    const {products ,total } = useSelector(state => state.cart);
    const [size, setSize] = useState(products?.length)
    const [ allProducts , setAllProducts ] = useState()
    const [ qty , setQty ] = useState(1)
    const [ discount , setDiscount ] = useState(0)
    const [ finalAmount , setFinalAMount ] = useState(0)

    const user = JSON.parse(localStorage.getItem('profile'));
    const history = useHistory();


    const dispatch = useDispatch();

    // deleting Item
    const deleteItem = (id, price) => {
        dispatch(deleteProduct({
            id : id , price: price
        }))
    }


    // updating Quantity
    const updateMyQty = (product, type) => {
        dispatch(updateCart({ product, type }))
    }

    useEffect(() => {
        total > 50 && (
            setDiscount(2)
        )
        total > 100 && (
            setDiscount(5)
        )
        total > 300 && (
            setDiscount(12)
        )
        total > 800 && (
            setDiscount(15)
        )
        setFinalAMount(total + discount)
    }, [total, discount])


    const makePayment = async () => {
        if (!user){
            alert("Please Sign In");
            history.push('/signup')
        }else{
            history.push('/checkout')
        }
    }
    return (
        <>
            <Container>
                <Navbar/>
                    <Wrapper>
                        <Title>Your Bag</Title>
                        <Top>
                            <Link to="/" style={{color: 'black' , textDecoration: 'none' , border: '1px solid black'}} >
                                <TopButton>CONTINUE SHOPPING</TopButton>
                            </Link>
                            <TopTexts>
                                <TopText>Shopping bag({size})</TopText>
                                <TopText>Your Wishlist(0)</TopText>
                            </TopTexts>
                            <TopButton>CHECKOUT NOW</TopButton>
                        </Top>
                        <Bottom>
                            <Info>
                            {
                                size !== 0 ? (
                                    products.map((prod) => (
                                       <Product key={prod?._id}  >
                                                <ProductDetail>
                                                    <Image src={ prod?.image || "https://images.unsplash.com/photo-1604514628550-37477afdf4e3?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bW9kZWxzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" } />
                                                    <Details>
                                                        <ProductName><b>Product: </b>{ prod?.name ||  "JESSIE HUNDERED SHOES" }</ProductName>
                                                        <ProductId><b>ID:</b>{prod?.id || "97589755" }</ProductId>
                                                        <Box style={{display: 'flex'}}>
                                                            <b> Color:</b> <ProductColor color={ prod?.color || "black" } />
                                                        </Box>
                                                        <ProductId><b>Price($) :</b>{prod?.price || "97589755" }</ProductId>
                                                        <ProductSize><b>Size:</b> {prod?.size ||  "37.8" }</ProductSize>
                                                    </Details>
                                                </ProductDetail>
                                                <PriceDetails >
                                                    <AddContainer>
                                                        <AmountContainer  >
                                                            <RemoveIcon onClick={() => updateMyQty(prod , "dec" )} style={{cursor: "pointer"}} />
                                                                <Amount>{prod?.sentQty}</Amount>
                                                            <AddIcon  onClick={() => updateMyQty(prod, "inc" )} style={{cursor: "pointer"}} />
                                                        </AmountContainer>
                                                    </AddContainer>
                                                    <ProductPrice> ${prod?.price * prod?.sentQty || "30" }</ProductPrice>
                                                </PriceDetails>
                                                <DeleteForeverIcon style={{marginRight: '35px' , height: '45px' , color: '#eb4d4b' , cursor : 'pointer'}} onClick={() =>deleteItem(prod?._id , prod?.price * prod?.quantity)} />
                                            </Product>
                                    )
                                )
                                ) : (
                                    <ErrorImage
                                        src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDUFzJMMeNWAWG-dEEE2HmgMPwHQTsNtlzmzGykm5JLwbIbVZ67B7CjCnBBmcY-sIQj7E&usqp=CAU"
                                        alt="Errpor Image"
                                    />
                                )
                            }
                            </Info>
                            <Summery>
                                <SummeryTitle>Order Summery</SummeryTitle>
                                    <SummeryItem>
                                        <SummeryItemText>Subtotal</SummeryItemText>
                                        <SummeryItemPrice>${total?.toFixed(2)}</SummeryItemPrice>
                                    </SummeryItem>
                                    <SummeryItem>
                                        <SummeryItemText> Shippig Cost</SummeryItemText>
                                        <SummeryItemPrice>
                                            ${discount}
                                        </SummeryItemPrice>
                                    </SummeryItem>
                                    <SummeryItem  type = "total" >
                                        <SummeryItemText >Total</SummeryItemText>
                                        <SummeryItemPrice>${
                                                    finalAmount.toFixed(2)
                                                    }</SummeryItemPrice>
                                    </SummeryItem>
                                    <Button variant="contained" onClick={makePayment} style={{fontSize : '17px'}} >CHECKOUT</Button>
                            </Summery>
                        </Bottom>

                    </Wrapper>
                <Footer/>
            </Container>
        </>
    )
}

export default Cart
