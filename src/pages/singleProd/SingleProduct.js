import React , { useState , useEffect } from 'react'
import { Button, Grid , Typography }from '@mui/material'
import Footer from '../../components/footer/Footer';
import Navbar from '../../components/navbar/Navbar'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import styled from 'styled-components';
import StarsIcon from '@mui/icons-material/Stars';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useLocation } from 'react-router-dom';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { getSingleProd } from '../../server_api/Api'
import { addProduct } from '../../redux/cartReducer'
import { useDispatch  } from 'react-redux'
import CircularProgress from '@mui/material/CircularProgress';

const ErrorImage = styled.img`
    width: 500px;
    height: 450px;
    margin-left: 250px;
    margin-top: 50px;
`;

const Details = styled.div`
    display: 'flex';
    flex-direction: 'column';
    justify-content: 'center';
    align-items: 'center';
`;

const ProdName = styled.h1`
    color: '#353b48';
`;


const StarsRating  = styled.div`
    display: 'flex';
    border-bottom: 1.5px solid grey;
    border-top: 1.5px solid grey;
    margin-top: 30px;
`;

const Price = styled.div `
    display: 'flex';
    border-bottom: 1.5px solid grey;
    border-top: 1.5px solid grey;
    margin-top: 30px;
    padding-top: 5px;
    padding-bottom: 5px;
`;

const PriceText = styled.h5`
    font-size: 18px;
    font-weight: 500;
    padding-left: 20px;
`;

const ProdDesc = styled.p`
    justify-content: center;
    align-items: center;
    padding-top: 20px;
    color: #535c68;
    font-weight: 600;
    word-spacing: 2px;

`;


const Status = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
    margin-top: 20px
`;


const DetailsFurther = styled.div `
    display: 'flex';
    flex-direction: 'column';
    justify-content: 'center';
    align-items: 'center';
    padding: 10px;
    border: 1px solid #95afc0;
    margin-left: 20px;

`;

const ColorsArr = styled.div`
    display: flex;
    margin-left: 10px
`;

const Color = styled.span`
    border-radius: 50%;
    background-color: ${props => props.color};
    width: 25px;
    height: 25px;
    margin-left: 5px;
    cursor: pointer;
`;


const ShowSelectedColor = styled.span `
    border-radius: 50%;
    background-color: ${props => props.mycolor};
    width: 25px;
    height: 25px;
    margin-left: 5px;
    cursor: pointer;
    padding: 20px;
`;

const SelectedColors = styled.div `
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
    margin-top: 20px;
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


const CartButton = styled.button `
    padding: 15px;
    border: 2px solid  white;
    color: white;
    font-weight: 600;
    cursor: pointer;
    margin-top: 20px;
    background-color: #341f97
`;


const SingleProduct = () => {
    const [ color , setColor ] = useState("")
    const [ size , setSize ] = useState("")

    const location = useLocation();
    const id = location.pathname.split("/")[3];

    const [ gotProduct , setGotProduct ] = useState([])
    const [ quantity , setQuantity ] = useState(1)
    const dispatch = useDispatch();

    useEffect(() => {
        const getProduct = async () =>{
            const { data } = await getSingleProd(id);
            setGotProduct(data?.gotProduct);
        }
        getProduct();
    },[id])

    const handleChange = (event) => {
        setSize(event.target.value);
    };

    const handleQty = (type) => {
        if(type === "inc"){
            setQuantity(quantity + 1)
        }else{
            quantity > 1 && setQuantity(quantity - 1)
        }
    }

    // adding to cart
    const handleCart = (id, name, image, price, qtyInHand ) => {
        if(!size || !color){
            alert("Please Select Color and Size first")
        }else{
            dispatch(addProduct({ product: {
                id,
                name,
                image,
                price,
                qtyInHand,
                color,
                size,
                sentQty : quantity,
            } , quantity , color , size }))
        }
    }


    return (
        <>{console.log("Size : ", size)}
            <Navbar/>
                <Button variant="text" style={{marginLeft:'100px' , marginTop: '20px' , color: '#353b48' , fontWeight: 600}} > <KeyboardBackspaceIcon/> GO BACK</Button>
                {
                    gotProduct ? (
                            <Grid container style={{  padding: '50px' }}>
                                <Grid item xs={6}>
                                    <img
                                        src = { gotProduct[0]?.image || "https://shop.fairphone.com/media/catalog/product/cache/f951d578fe9eab859de9806fdcf92465/f/a/fairphone_true_wireless_earbuds_1_.jpg" }
                                        alt = "Product Cover"
                                        width = '100%'
                                        height = "100%"
                                        style={{padding: '10px' , paddingRight: '20px'}}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <Details>
                                        <ProdName>{ gotProduct[0]?.name || "BOAT AIRDRODE 121V2 EARBUDS" }</ProdName>

                                        <StarsRating>
                                            <Typography variant="body2" color="text.secondary" style={{marginleft: '-15px' }} >
                                                <Button variant="fab" color="primary" aria-label="Add" style={{color: 'orange'}}>
                                                    <StarsIcon  />
                                                    <StarsIcon  />
                                                    <StarsIcon  />
                                                </Button>
                                                    <b>{ gotProduct[0]?.rating ||  "5.0" } </b>( { gotProduct[0]?.numReviews || "0 Reviews" })
                                            </Typography>
                                        </StarsRating>

                                        <Price>
                                            <Typography variant="body2" color="text.secondary" style={{marginleft: '-15px' }} >
                                                <PriceText variant="body1" >Price($) : <b>{ gotProduct[0]?.price ||  "$40.88" } </b> </PriceText>
                                            </Typography>
                                        </Price>

                                        <Status>
                                            <Typography variant="body1" style={{fontWeight: 600}} >In Stock: </Typography>
                                            <Typography variant="body1" style={{marginLeft: '50px'}} > { gotProduct[0]?.inStock || "In Stock" } </Typography>
                                        </Status>

                                        <Status>
                                            <Typography variant="body1" style={{fontWeight: 600}} >Category: </Typography>
                                            <Typography variant="body1" style={{marginLeft: '50px'}} > {gotProduct[0]?.category || "WoMen" }</Typography>
                                        </Status>

                                        <ProdDesc>
                                            { gotProduct[0]?.desc || "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available." }
                                        </ProdDesc>
                                    </Details>
                                </Grid>
                                <Grid item xs={3}>
                                    <DetailsFurther>
                                        <Status>
                                            <Typography variant="body1" style={{fontWeight: 600}} >Colors: </Typography>
                                            <ColorsArr>
                                            {
                                                gotProduct[0]?.colors?.map((c) => (
                                                    <Color color={c} value={c}  onClick={(e) =>  setColor(c)}  />
                                                ))
                                            }
                                            </ColorsArr>
                                        </Status>

                                        <SelectedColors>
                                            <Typography variant="body1" style={{fontWeight: 600 , paddingTop: '10px' , marginRight: '10px'}} >Selected Color: </Typography>
                                            <ShowSelectedColor mycolor={color} ></ShowSelectedColor>
                                        </SelectedColors>

                                        <Status>
                                            <Typography variant="body1" style={{fontWeight: 600 , paddingTop: '20px'}} >Sizes: </Typography>
                                            <ColorsArr>
                                                <FormControl sx={{ m: 1, minWidth: 55 }}>
                                                    <InputLabel id="demo-simple-select-autowidth-label">Size</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-autowidth-label"
                                                        id="demo-simple-select-autowidth"
                                                        value={size}
                                                        onChange={handleChange}
                                                        autoWidth
                                                        label="Size"
                                                    >
                                                    {
                                                        gotProduct[0]?.sizes?.map((c) => (
                                                             <MenuItem value={c} onChange={(e) =>  setSize(c)}  >{c}</MenuItem>
                                                        ))
                                                    }
                                                    </Select>
                                                </FormControl>
                                            </ColorsArr>
                                        </Status>

                                        <AddContainer>
                                            <AmountContainer  >
                                                <RemoveIcon onClick={() => handleQty("dec")} style={{cursor: "pointer"}} />
                                                    <Amount>{quantity}</Amount>
                                                <AddIcon  onClick={() => handleQty("inc")} style={{cursor: "pointer"}} />
                                            </AmountContainer>
                                            <CartButton onClick={() => handleCart(gotProduct[0]._id , gotProduct[0].name , gotProduct[0].image , gotProduct[0].price , gotProduct[0].inStock )} >ADD TO CART</CartButton>
                                        </AddContainer>
                                    </DetailsFurther>
                                </Grid>
                            </Grid>
                    ) : (
                        <CircularProgress/>
                    )
                }
            <Footer/>
        </>
    )
}

export default SingleProduct
