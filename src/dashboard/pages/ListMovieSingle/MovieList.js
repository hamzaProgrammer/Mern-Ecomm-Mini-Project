import React, { useState , useEffect } from 'react'
import {
    Box,
    Typography,
    Button,
    Grid,
    TextField,
    MenuItem
} from '@mui/material'
import { Link , useLocation } from 'react-router-dom'
import { UpdateMovieList } from '../../../server_api/Api'
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useHistory } from 'react-router-dom'
import Select from '@mui/material/Select';
import {makeStyles} from '@mui/styles'

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '05px',
        marginLeft: '-30px',
        marginRight: '30px'
    },
    head : {
        fontSize : '30px',
        fontWeight: 700
    },
    CreateSec : {
        display : 'flex',
        justifyContent : 'space-between'
    },
    createBtn : {
        fontSize: '18px',
        backgroundColor: '#30336b',
        textTransform : 'none',
        color: '#fff',
        fontWeight: 600
    },
    prod: {
        marginTop: '20px',
        padding : '20px',
        paddingTop: '-30px',
        paddingBottom: '-30px',
        boxShadow: '2px 6px 39px -15px #000000',
        maxHeight: '205px'
    },
    prodImStock:{
        width: '60px',
        height: '60px',
        borderRadius: '50%',
    },
    prodName : {
        fontSize : '18px',
        fontWeight: 600,
        marginTop: '10px',
        marginLeft: '10px'
    },
    prodDetails : {
        marginTop: '0px',
    },
    prodDetailLeft : {
        display : 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        marginLeft: '-15px',
        paddingTop: '8px',
        paddingLeft: '15px'
    },
    prodDetailLeftHead : {
        color: 'black',
        fontSize: '15px',
        marginBottom : '5px',
    },
    prodDetailrightHead : {
        color: 'grey',
        fontSize: '15px',
        marginBottom : '5px',
    },
    editProdSec : {
        marginTop: '25px',
        padding: '20px',
        marginBottom : '25px',
        boxShadow: '2px 6px 39px -15px #000000',
    },
    button: {
            display: 'block',
            marginTop: '15px',
    },
    formControl: {
        margin: '20px',
        minWidth: 120,
    },
    uploadedImg : {
        width:'100px',
        height: '100px',
        borderRadius: '10px',
    },
    uploadIcon : {
        fontSize : '35px',
        marginLeft: '10px',
        color: '#4834d4',
    },
    uploadBtn :{
        color: '#fff',
        fontSize: '16px',
        width: '120px',
        marginLeft: '15px',
        backgroundColor: '#130f40',
        fontWeight: 600,
        marginTop: '100px',
        textTransform: 'none',
        '&:hover': {
            backgroundColor: '#30336b'
        }
    },
    inputsDet :{
        marginBottom : '15px',
        width: '300px',
        marginLeft: '10px'
    }
}))
const MoviesList = () => {
    const classes = useStyles()
    const history =useHistory()
    const [currntData, setCurrntData] = useState([])
    const location = useLocation()

    const handleChange = (e) => {
        setCurrntData({...currntData , [ e.target.name ] : e.target.value})
    }

    // for sendig data fro updating
    const handleSendData = async () => {
        try {
            const { data } = await UpdateMovieList(currntData?._id , currntData)
            setCurrntData(data.updatedMovieList)
            history.push('/admin/moviesLists')
        } catch (error) {
            console.log("Error is in Product.js : ", error)
        }
    }

    useEffect(() => {
        setCurrntData(location.movieList)
    },[location])

    return (
        <>{console.log("Reached In List")}
            <Box className={classes.root}>
                <Box className={classes.CreateSec}>
                    <Typography className={classes.head}>Movie List</Typography>
                    <Button variant="contained" size="medium" className={classes.createBtn} component={Link} to="/newProduct" >
                        Upload New
                    </Button>
                </Box>

                <Grid container style={{marginTop: '20px'}}>
                    <Grid item xs={12} className={classes.prod} >
                        <Grid container style={{marginTop : '-10px'}} >
                            <Grid item xs={12}>
                                <Typography className={classes.prodName}> {currntData?.title}</Typography>
                            </Grid>
                        </Grid>

                        <Grid container className={classes.prodDetails} >
                            <Grid item xs={2}>
                                <Box className={classes.prodDetailLeft}>
                                    <Typography className={classes.prodDetailLeftHead}>Id:</Typography>
                                    <Typography className={classes.prodDetailLeftHead}>Genre:</Typography>
                                    <Typography className={classes.prodDetailLeftHead}>Type:</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={3}>
                                    <Box className={classes.prodDetailLeft}>
                                    <Typography className={classes.prodDetailrightHead}>{currntData?._id}</Typography>
                                    <Typography className={classes.prodDetailrightHead}>{currntData?.genre}</Typography>
                                    <Typography className={classes.prodDetailrightHead}>{currntData?.type}</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={7}>
                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>

                <Grid container className={classes.editProdSec}>
                    <Grid item xs={4}>
                        <TextField
                            id="outlined-multiline-flexible"
                            variant="outlined"
                            value={currntData?.title}
                            onChange={handleChange}
                            name="title"
                            className={classes.inputsDet}
                        />

                        <FormControl required sx={{ m: 1, minWidth: 120 }} style={{width: '300px'}}>
                            <InputLabel id="demo-simple-select-required-label">Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-required-label"
                                id="demo-simple-select-required"
                                value={currntData?.type}
                                label="Type"
                                name="type"
                                onChange={handleChange}
                            >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="movies">Movies</MenuItem>
                            <MenuItem value="series">Series</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl required sx={{ m: 1, minWidth: 120 }} style={{width: '300px'}}>
                            <InputLabel id="demo-simple-select-required-label">Genre</InputLabel>
                            <Select
                                labelId="demo-simple-select-required-label"
                                id="demo-simple-select-required"
                                value={currntData?.genre}
                                label="Genre"
                                name="genre"
                                onChange={handleChange}
                            >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="comedy">Comedy</MenuItem>
                            <MenuItem value="adventure">Adventure</MenuItem>
                            <MenuItem value="horror">Horror</MenuItem>
                            <MenuItem value="scifi">Sc-Fi</MenuItem>
                            <MenuItem value="animation">Animation</MenuItem>
                            <MenuItem value="kids">Kids</MenuItem>
                            <MenuItem value="action">Action</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={5}>
                    </Grid>
                    <Grid item xs={3} style={{display: 'flex' , flexDirection : 'column' , justifyContent:'space-between'}} >
                        <Button variant="contained" type="file" className={classes.uploadBtn} onClick={handleSendData} > Update List</Button>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default MoviesList
