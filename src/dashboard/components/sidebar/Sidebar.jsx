import React from 'react'
import { Box  ,Button, Typography } from '@mui/material'
import LineStyleIcon from '@mui/icons-material/LineStyle';
import TimelineIcon from '@mui/icons-material/Timeline';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import { Link } from 'react-router-dom'
import {makeStyles} from '@mui/styles'


const useStyles = makeStyles((theme) => ({
    sidebarMain: {
        maxWidth: '280px',
        height: '88vh',
        position: 'sticky',
        top: '75px',
        display : 'flex',
        marginTop: '25px',
        flexDirection: 'column',
        //overflowY: "scroll"
    },
    inner : {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '30px',
        marginBottom: '20px'
    },
    button : {
        marginLeft: '-50px',
        maxWidth: '100%',
        color: '#2d3436',
        fontWeight: 600,
        fontSize: '15px',
        borderRadius: '10px',
        '&:hover' : {
            backgroundColor : 'rgba(228,228,250)'
        },
        '&:active': {
            backgroundColor: 'rgba(228,228,250)'
        }
    },
    active: {
        backgroundColor: 'rgba(228,228,250)'
    }
}))
const Sidebar = () => {
    const classes = useStyles();
    return (
        <>
            <Box className={classes.sidebarMain}>
                <Box className={classes.inner}>
                    <Typography className={classes.typo1} style={{color:'#a29bfe' , fontSize: '17px' , fontWeight : 500}}>Dashboard</Typography>
                    <Button
                        component={Link}
                        to="/"
                        className={`${classes.button} ${classes.active}`}
                        startIcon={<LineStyleIcon style={{marginLeft: '-25px'}}  />}
                        >
                        App Home
                    </Button>
                    </Box>

                <Box className={classes.inner}>
                    <Typography className={classes.typo1} style={{color:'#a29bfe' , fontSize: '17px' , fontWeight : 500}}>Movies</Typography>
                    <Button
                        className={`${classes.button}`}
                        component={Link}
                        to="/admin/movies"
                        startIcon={<PermIdentityIcon style={{marginLeft: '-30px'}} />}
                        >
                           All Movies
                    </Button>
                    <Button
                        className={classes.button}
                        component={Link}
                        to="/admin/addMovie"
                        startIcon={<PlayCircleOutlineIcon />}
                        >
                        Add Movie
                    </Button>
                </Box>

                <Box className={classes.inner}>
                    <Typography className={classes.typo1} style={{color:'#a29bfe' , fontSize: '17px' , fontWeight : 500}}>Movies Lists</Typography>
                    <Button
                        className={`${classes.button}`}
                        component={Link}
                        to="/admin/moviesLists"
                        startIcon={<MailOutlineIcon style={{marginLeft: '-0px'}} />}
                        >
                        All Movies Lists
                    </Button>
                    <Button
                        className={classes.button}
                        component={Link}
                        to="/admin/addMovieList"
                        startIcon={<DynamicFeedIcon />}
                        >
                        Add New List
                    </Button>
                </Box>

                 <Box className={classes.inner}>
                    <Typography className={classes.typo1} style={{color:'#a29bfe' , fontSize: '17px' , fontWeight : 500}}>USERS</Typography>
                    <Button
                        className={`${classes.button}`}
                        component={Link}
                        to="/admin/users"
                        startIcon={<WorkOutlineIcon />}
                        >
                        All Users
                    </Button>
                </Box>

                <Box className={classes.inner}>
                    <Typography className={classes.typo1} style={{color:'#a29bfe' , fontSize: '17px' , fontWeight : 500}}>Admins</Typography>
                    <Button
                        className={`${classes.button}`}
                        component={Link}
                        to = "/admin/allAdmins"
                        startIcon={<WorkOutlineIcon />}
                        >
                        View All
                    </Button>
                    <Button
                        className={classes.button}
                        component={Link}
                        to = "/admin/newUser"
                        startIcon={<TimelineIcon />}
                        >
                        Add New
                    </Button>
                </Box>

            </Box>
        </>
    )
}

export default Sidebar
