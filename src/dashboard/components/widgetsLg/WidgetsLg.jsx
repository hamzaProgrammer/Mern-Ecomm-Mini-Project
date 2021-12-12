import React from 'react'
import { Box, Typography , Grid , List , ListItem , ListItemText , Menu , MenuItem} from '@mui/material'
import {makeStyles} from '@mui/styles'

const useStyles = makeStyles((theme) => ({
    root: {
        flex: 2,
        boxShadow: '2px 6px 39px -15px #000000',
        padding: '20px'
    },
    heading: {
        fontSize: '22px',
        fontWeight: 700,
        marginLeft: '25px'
    },
    mainContent : {
        marginTop: '20px'
    },
    headFirst : {
        fontSize: '17px',
        paddingLeft: '50px',
        fontWeight: 500
    },
    image : {
        borderRadius: '50%',
        width:"50px",
        height:'50px'
    },
    name : {
        fontSize: '17px',
        fontWeight: 500,
        marginLeft: '20px',
        marginTop: '10px'
    },
    btn : {
        color: '#fff',
        fontSize: '15px',
        fontWeight: 600
    },
    Pending:{
        backgroundColor: 'yellow'
    },
    Declined: {
        backgroundColor: 'red',
        color: 'red'
    },
    Dispatched : {
        backgroundColor: 'lightBlue'
    }
}))
const WidgetsLg = () => {
    const classes = useStyles();
    const options = [
        'Pending',
        'Dispatch',
        'Declined',
    ];

     const [anchorEl, setAnchorEl] = React.useState(null);
     const [selectedIndex, setSelectedIndex] = React.useState(0);

     const handleClickListItem = (event) => {
         setAnchorEl(event.currentTarget);
         
     };

     const handleMenuItemClick = (event, index) => {
         setSelectedIndex(index);
         setAnchorEl(null);
     };

     const handleClose = () => {
         setAnchorEl(null);
     };
    return (
        <>
            <Box className={classes.root}>
                <Typography className={classes.heading}>Latest Transactions</Typography>
                <Box className={classes.mainContent}>

                    <Grid container style={{marginTop: '20px'}} >
                        <Grid item xs={6} >
                            <Typography className={classes.headFirst}>Customer</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography style={{fontSize: '16px' , fontWeight: 500}}>Date</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography style={{fontSize: '16px' , fontWeight: 500}}>Amount</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography style={{fontSize: '16px' , fontWeight: 500}}>Status</Typography>
                        </Grid>
                    </Grid>

            {/* Users  Data Starts from here  */}

                    <Grid container style={{marginTop: '20px'}} >
                        <Grid item xs={6} >
                            <Box style={{display: 'flex', marginLeft: '25px' }}>
                                <img
                                    src="https://images.unsplash.com/photo-1630837524558-12b4c041be6a?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                                    alt="Customer Profile"
                                    className={classes.image}
                                />
                                <Typography className={classes.name}>Hussain Khan</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography style={{fontSize: '14px' , fontWeight: 400 , marginLeft: '-10px' , marginTop: '8px'}}>16-Jan 2021</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography style={{fontSize: '14px' , fontWeight: 400 , marginTop : '8px'}}>$1,12.874</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography style={{fontSize: '16px' , fontWeight: 500}}>
                                 <List component="nav" aria-label="Device settings">
                                        <ListItem
                                        button
                                        aria-haspopup="true"
                                        aria-controls="lock-menu"
                                        aria-label="when device is locked"
                                        onClick={handleClickListItem}
                                        style={{border: '1px solid black' , marginTop: '-10px'}}
                                        >
                                        <ListItemText primary="Pending" />
                                        {console.log(anchorEl)}
                                        </ListItem>
                                    </List>
                                    <Menu
                                        id="lock-menu"
                                        anchorEl={anchorEl}
                                        keepMounted
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
                                    >
                                        {options.map((option, index) => (
                                        <MenuItem
                                            key={option}
                                            selected={index === selectedIndex}
                                            onClick={(event) => handleMenuItemClick(event, index)}
                                        >
                                            {option}
                                        </MenuItem>
                                        ))}
                                    </Menu>
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid container style={{marginTop: '20px'}} >
                        <Grid item xs={6} >
                            <Box style={{display: 'flex', marginLeft: '25px' }}>
                                <img
                                    src="https://images.unsplash.com/photo-1630837524558-12b4c041be6a?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                                    alt="Customer Profile"
                                    className={classes.image}
                                />
                                <Typography className={classes.name}>Hussain Khan</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography style={{fontSize: '14px' , fontWeight: 400 , marginLeft: '-10px' , marginTop: '8px'}}>16-Jan 2021</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography style={{fontSize: '14px' , fontWeight: 400 , marginTop : '8px'}}>$1,12.874</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography style={{fontSize: '16px' , fontWeight: 500}}>
                                 <List component="nav" aria-label="Device settings">
                                        <ListItem
                                        button
                                        aria-haspopup="true"
                                        aria-controls="lock-menu"
                                        aria-label="when device is locked"
                                        onClick={handleClickListItem}
                                        style={{border: '1px solid black' , marginTop: '-10px'}}
                                        >
                                        <ListItemText primary="Pending" />
                                        {console.log(anchorEl)}
                                        </ListItem>
                                    </List>
                                    <Menu
                                        id="lock-menu"
                                        anchorEl={anchorEl}
                                        keepMounted
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
                                    >
                                        {options.map((option, index) => (
                                        <MenuItem
                                            key={option}
                                            selected={index === selectedIndex}
                                            onClick={(event) => handleMenuItemClick(event, index)}
                                        >
                                            {option}
                                        </MenuItem>
                                        ))}
                                    </Menu>
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid container style={{marginTop: '20px'}} >
                        <Grid item xs={6} >
                            <Box style={{display: 'flex', marginLeft: '25px' }}>
                                <img
                                    src="https://images.unsplash.com/photo-1630837524558-12b4c041be6a?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                                    alt="Customer Profile"
                                    className={classes.image}
                                />
                                <Typography className={classes.name}>Hussain Khan</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography style={{fontSize: '14px' , fontWeight: 400 , marginLeft: '-10px' , marginTop: '8px'}}>16-Jan 2021</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography style={{fontSize: '14px' , fontWeight: 400 , marginTop : '8px'}}>$1,12.874</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography style={{fontSize: '16px' , fontWeight: 500}}>
                                 <List component="nav" aria-label="Device settings">
                                        <ListItem
                                        button
                                        aria-haspopup="true"
                                        aria-controls="lock-menu"
                                        aria-label="when device is locked"
                                        onClick={handleClickListItem}
                                        style={{border: '1px solid black' , marginTop: '-10px'}}
                                        >
                                        <ListItemText primary="Pending" />
                                        {console.log(anchorEl)}
                                        </ListItem>
                                    </List>
                                    <Menu
                                        id="lock-menu"
                                        anchorEl={anchorEl}
                                        keepMounted
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
                                    >
                                        {options.map((option, index) => (
                                        <MenuItem
                                            key={option}
                                            selected={index === selectedIndex}
                                            onClick={(event) => handleMenuItemClick(event, index)}
                                        >
                                            {option}
                                        </MenuItem>
                                        ))}
                                    </Menu>
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid container style={{marginTop: '20px'}} >
                        <Grid item xs={6} >
                            <Box style={{display: 'flex', marginLeft: '25px' }}>
                                <img
                                    src="https://images.unsplash.com/photo-1630837524558-12b4c041be6a?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                                    alt="Customer Profile"
                                    className={classes.image}
                                />
                                <Typography className={classes.name}>Hussain Khan</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography style={{fontSize: '14px' , fontWeight: 400 , marginLeft: '-10px' , marginTop: '8px'}}>16-Jan 2021</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography style={{fontSize: '14px' , fontWeight: 400 , marginTop : '8px'}}>$1,12.874</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography style={{fontSize: '16px' , fontWeight: 500}}>
                                 <List component="nav" aria-label="Device settings">
                                        <ListItem
                                        button
                                        aria-haspopup="true"
                                        aria-controls="lock-menu"
                                        aria-label="when device is locked"
                                        onClick={handleClickListItem}
                                        style={{border: '1px solid black' , marginTop: '-10px'}}
                                        >
                                        <ListItemText primary="Pending" />
                                        {console.log(anchorEl)}
                                        </ListItem>
                                    </List>
                                    <Menu
                                        id="lock-menu"
                                        anchorEl={anchorEl}
                                        keepMounted
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
                                    >
                                        {options.map((option, index) => (
                                        <MenuItem
                                            key={option}
                                            selected={index === selectedIndex}
                                            onClick={(event) => handleMenuItemClick(event, index)}
                                        >
                                            {option}
                                        </MenuItem>
                                        ))}
                                    </Menu>
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid container style={{marginTop: '20px'}} >
                        <Grid item xs={6} >
                            <Box style={{display: 'flex', marginLeft: '25px' }}>
                                <img
                                    src="https://images.unsplash.com/photo-1630837524558-12b4c041be6a?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                                    alt="Customer Profile"
                                    className={classes.image}
                                />
                                <Typography className={classes.name}>Hussain Khan</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography style={{fontSize: '14px' , fontWeight: 400 , marginLeft: '-10px' , marginTop: '8px'}}>16-Jan 2021</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography style={{fontSize: '14px' , fontWeight: 400 , marginTop : '8px'}}>$1,12.874</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography style={{fontSize: '16px' , fontWeight: 500}}>
                                 <List component="nav" aria-label="Device settings">
                                        <ListItem
                                        button
                                        aria-haspopup="true"
                                        aria-controls="lock-menu"
                                        aria-label="when device is locked"
                                        onClick={handleClickListItem}
                                        style={{border: '1px solid black' , marginTop: '-10px'}}
                                        >
                                        <ListItemText primary="Pending" />
                                        {console.log(anchorEl)}
                                        </ListItem>
                                    </List>
                                    <Menu
                                        id="lock-menu"
                                        anchorEl={anchorEl}
                                        keepMounted
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
                                    >
                                        {options.map((option, index) => (
                                        <MenuItem
                                            key={option}
                                            selected={index === selectedIndex}
                                            onClick={(event) => handleMenuItemClick(event, index)}
                                        >
                                            {option}
                                        </MenuItem>
                                        ))}
                                    </Menu>
                            </Typography>
                        </Grid>
                    </Grid>


                </Box>

            </Box>
        </>
    )
}

export default WidgetsLg
