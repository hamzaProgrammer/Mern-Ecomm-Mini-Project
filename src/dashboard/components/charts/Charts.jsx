import React from 'react'
import { Box , Typography } from '@mui/material'
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root:{
        marginRight: '30px',
        marginLeft: '-10px',
        marginTop: '20px',
        marginBottom: '20px',
        padding: '20px',
        boxShadow: '2px 6px 39px -15px #000000',
    }
}))
const Charts = (props) => {
    const classes = useStyles();
    const {title , data , dataKey , grid} = props;

    return (
        <>
            <Box className={classes.root}>
                <Typography variant="h6" >{title}</Typography>
                <ResponsiveContainer width="100%" aspect={4/1}>
                    <LineChart  data ={data} >
                        <XAxis dataKey="name" stroke="#5550bd"  />
                        <Line type="monotone" dataKey={dataKey} stroke="#5550bd" />
                        <Tooltip/>
                        {
                            grid && (
                                <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />
                            )
                        }
                    </LineChart>
                </ResponsiveContainer>
            </Box>
        </>
    )
}

export default Charts
