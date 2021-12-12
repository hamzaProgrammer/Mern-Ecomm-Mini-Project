import React from 'react'
import { Box , Grid , Typography }  from '@mui/material'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    mainRoot : {
        marginLeft: '-10px'
    },
    root: {
        display: 'flex',
        flexDirection: 'column',
        padding: '30px',
        borderRadius: '10px',
        cursor: 'pointer',
        boxShadow: '2px 6px 39px -15px #000000',
        maxWidth: '300px',
        marginRight: '20px'
    },
    typo1 : {
        fontSize: '20px',
        marginBottom: '10px'
    },
    price : {
        fontSize: '20px',
        fontWeight: 600,
        marginRight: '20px'
    },
    featuredIcon : {
        fontSize : '24px',
        marginRight: '5px',
        color: 'green'
    },
    negative : {
        color: 'red'
    },
    compare: {
        fontSize: '15px',
        color: 'gray',
        marginTop: '15px'
     }
}))
const FeaturedInfo = () => {
    const classes = useStyles()
    return (
        <>
            <Grid container className={classes.mainRoot}>

                <Grid item xs={4} className={classes.root}>
                    <Typography className={classes.typo1}>Reveneu</Typography>
                    <Box style={{display: 'flex', alignItems: 'center' }}>
                        <Typography className={classes.price}>$2,415.115</Typography>
                        <Typography variant="body1" style={{marginLeft: '10px', marginRight: '10px'}}>-1.4</Typography>
                        <ArrowDownwardIcon className={ `${classes.featuredIcon} , ${classes.negative} `} />
                    </Box>
                        <Typography className={classes.compare} >Compared to last Month</Typography>
                </Grid>

                <Grid item xs={4} className={classes.root}>
                    <Typography className={classes.typo1}>Sales</Typography>
                    <Box style={{display: 'flex' }}>
                        <Typography className={classes.price}>$2,415.115</Typography>
                        <Typography variant="body1" style={{marginLeft: '10px', marginRight: '10px'}}>-1.4</Typography>
                        <ArrowDownwardIcon className={ `${classes.featuredIcon} , ${classes.negative} `} />
                    </Box>
                        <Typography className={classes.compare} >Compared to last Month</Typography>
                </Grid>

                <Grid item xs={4} className={classes.root}>
                <Typography className={classes.typo1}>Cost</Typography>
                <Box style={{display: 'flex' }}>
                    <Typography className={classes.price}>$2,415.115</Typography>
                    <Typography variant="body1" style={{marginLeft: '10px', marginRight: '10px'}}>+3.4</Typography>
                    <ArrowUpwardIcon className={ `${classes.featuredIcon} , ${classes.positive} `}   />
                </Box>
                    <Typography className={classes.compare} >Compared to last Month</Typography>
            </Grid>
            </Grid>
        </>
    )
}

export default FeaturedInfo
