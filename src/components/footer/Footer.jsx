import React from 'react'
import { Box  , Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    root: {
        paddingLeft: '550px',
        backgroundColor: '#ecf0f1',
        height: '30px',
        paddingTop: '5px',
        color: '#34495e',
        marginTop: '50%'
    }
})
const Footer = () => {
    const classes = useStyles();
    return (
        <>
            <Box className={classes.root} >
                <Typography variant="body3" >copyrights @ Hamza'a store 2021</Typography>
            </Box>
        </>
    )
}

export default Footer
