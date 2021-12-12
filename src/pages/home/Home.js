import { makeStyles } from '@mui/styles';
import { useEffect  } from 'react'
import { Grid, Typography } from '@mui/material';
import React from 'react';
import Footer from '../../components/footer/Footer';
import Navbar from '../../components/navbar/Navbar'
import ProdCard from '../../components/prodCard/ProdCard'
import { listProducts } from '../../actions/productsActions'
import { useDispatch , useSelector } from 'react-redux'
import CircularProgress from '@mui/material/CircularProgress';
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const ErrorImage = styled.img`
    width: 500px;
    height: 450px;
    margin-left: 450px;
`;


const useStyles = makeStyles({
    root: {
        display: 'flex',
        padding: '50px',
        paddingTop: '-50px',
        justifyContent: 'center',
        alignItems: 'center',
    }
})
const Home = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { isFetching , products , error  } = useSelector((state) => state.prodReducer);
    useEffect(() => {
        dispatch(listProducts(dispatch));
    },[dispatch])
  return (
    <>
        <Navbar/>
            <Typography variant="h4" style={{marginLeft: '80px' , marginTop: '20px' , color: '#7f8fa6'}} >All Products</Typography>
                <Grid container fullWidth={true} direction="row" className={classes.root}>
            {
                !isFetching ? (
                        error ? (
                            <ErrorImage
                                src = "https://i.pinimg.com/originals/2a/21/1f/2a211fde05b083a179158e2d3daaa7d3.jpg"
                                alt="Errpor Image"
                            />
                        ) : (
                                products?.map((myprod) => (
                                    <Grid item xs={3}>
                                        <Link to={`/product/${myprod.name}/${myprod._id}`} style={{textDecoration: 'none' , color: 'inherit'}} >
                                            <ProdCard item={myprod} />
                                        </Link>
                                    </Grid>
                                ))
                        )
                ) : (
                    <CircularProgress/>
                )
            }
            </Grid>
        <Footer/>
    </>
  );
}

export default Home;
