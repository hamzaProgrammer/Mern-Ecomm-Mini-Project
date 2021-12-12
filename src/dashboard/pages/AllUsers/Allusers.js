import React , { useState , useEffect } from 'react'
import {
    Box,
    Typography,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Grid
} from '@mui/material'
import { uploadMovieList , getAllMovieName } from  '../../../server_api/Api'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root : {
        marginTop: '20px',
        padding: '20px',
        boxShadow: '2px 6px 39px -15px #000000',
        marginRight: '30px',
        marginLeft: '-30px',
        paddingLeft : '30px',
        maxWidth: '100%',
        marginBottom: '25px'
    },
    head : {
        fontSize : '22px',
        fontWeight: 600,
        marginBottom: '55px'
    },
    prodComps : {
        display : 'flex',
        flexDirection: 'row',
        marginTop: '30px'
    },
    inputs : {
        width: '300px',
        marginBottom : '20px'
    },
    uploadBtn: {
        color: '#fff',
        fontSize: '16px',
        width: '160px',
        marginLeft: '400px',
        backgroundColor: '#130f40',
        fontWeight: 700,
        marginTop: '30px',
        textTransform: 'none',
        '&:hover': {
            backgroundColor: '#30336b'
        }
    },
    uploadBtn1: {
        color: '#fff',
        fontSize: '16px',
        width: '200px',
        marginLeft: '400px',
        backgroundColor: '#130f40',
        fontWeight: 700,
        marginTop: '30px',
        textTransform: 'none',
        '&:hover': {
            backgroundColor: '#30336b'
        }
    },
    fileInput: {
    width: '100%',
    marginBottom: '50px',
    },
}))

const initValue = {
    title: '',
    genre: '',
    type: '',
    content: []
}

const NewMovieList = () => {
    const classes = useStyles();
    const history = useHistory()

    const [ movieInfoList , setMovieListInfo ] = useState(initValue)

    const handleChangeAll = (e) => {
        setMovieListInfo({...movieInfoList , [e.target.name]: e.target.value})
    }


    // for Sending Movie Data to server
    const handleSubmit = async () => {
          if (!movieInfoList.title || !movieInfoList.genre || !movieInfoList.type || !movieInfoList.content ) {
                console.log("Please Fill All required Fields")
        }else{
            try {
                const { data } = await uploadMovieList(movieInfoList)
                console.log("In New MovieList : ", data)
                history.push('/admin/moviesLists')
                setMovieListInfo(initValue)
            } catch (error) {
                console.log("Error is : ", error)
            }
        }
    }

    // for Type of List
    const [open, setOpen] = React.useState(false);

    const handleType = (e) => {
        setMovieListInfo({...movieInfoList , [e.target.name]: e.target.value})
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };


    //  for Multiple Selecet
    const [selectedValue, setSelectedValue] = React.useState([]);
    const [ names , setNames ] = useState([])

    const handleChangeMultiple = (event) => {
        const { options } = event.target;
        const value = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
        if (options[i].selected) {
            value.push(options[i].value);
        }
        }
        setSelectedValue(value);
        setMovieListInfo({...movieInfoList , content :[ value ] })
    };

    useEffect(() => {
        const getMovieName = async () => {
            const { data } = await getAllMovieName();
            setNames(data)
        }
        getMovieName()
    }, [])

    return (
        <>
            <Box className={classes.root} >
                <Typography className={classes.head}>Add New Movie List</Typography>

                 <Grid container direction="row" className={classes.prodComps} >
                    <Grid item xs={4}>
                        <TextField
                            label="List Title"
                            variant="outlined"
                            className={classes.inputs}
                            name="title"
                            value={movieInfoList.title}
                            onChange={handleChangeAll}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl required sx={{ m: 1, minWidth: 120 }} style={{width: '200px'}}>
                            <InputLabel id="demo-simple-select-required-label">Genre</InputLabel>
                            <Select
                                labelId="demo-simple-select-required-label"
                                id="demo-simple-select-required"
                                value={movieInfoList.genre}
                                label="Genre"
                                name="genre"
                                onChange={handleChangeAll}
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
                    <Grid item xs={4}>
                            <FormControl required sx={{ m: 1, minWidth: 120 }} style={{width: '200px'}}>
                            <InputLabel id="demo-simple-select-required-label">Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-required-label"
                                id="demo-simple-select-required"
                                value={movieInfoList.type}
                                label="Type"
                                name="type"
                                onChange={handleChangeAll}
                            >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="movies">Movies</MenuItem>
                            <MenuItem value="series">Series</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                <Grid container direction="row" className={classes.prodComps} >
                    <Grid item xs={4}>
                        <Box className={classes.fileInput}>
                            <FormControl sx={{ m: 1, minWidth: 200, maxWidth: 300 }} style={{width: '300px'}} >
                                <InputLabel shrink htmlFor="select-multiple-native" >
                                Included Movies
                                </InputLabel>
                                <Select
                                    multiple
                                    native
                                    value={selectedValue}
                                    // @ts-ignore Typings are not considering `native`
                                    onChange={handleChangeMultiple}
                                    label="Native"
                                    inputProps={{
                                        id: 'select-multiple-native',
                                    }}
                                    >
                                    {names.map((name) => (
                                        <option key={name._id} value={name._id}>
                                        {name.title}
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </Grid>
                </Grid>

                <Button variant="contained" type="file" className={classes.uploadBtn} onClick={handleSubmit}  >Add  List</Button>
            </Box>
        </>
    )
}

export default NewMovieList