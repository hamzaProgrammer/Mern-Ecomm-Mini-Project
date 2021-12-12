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
import { addProduct } from  '../../../server_api/Api'
import {storage}  from '../../Firebase'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {makeStyles} from '@mui/styles'
import { useHistory } from 'react-router-dom';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import ToggleButton from '@mui/material/ToggleButton';
import { useTheme } from '@mui/material/styles';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Chip from '@mui/material/Chip';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextareaAutosize from '@mui/material/TextareaAutosize';


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
    width: '97%',
    marginLeft: '20px',
    marginBottom: '50px',
    },
}))

const initValue = {
    name: '',
    desc: '',
    date: null,
    category: '',
    inStock: '',
    sizes: null,
    image: '',
    colors: null,
    status: '',
    price : 0,
}

const NewProduct = () => {
    const classes = useStyles();
    const history = useHistory()
    const [ movieInfo , setMovieInfo ] = useState(initValue)

    const [ progress , setProgress ] = useState(0)

    const handleChange = (e) => {
        setMovieInfo({...movieInfo , [e.target.name]: e.target.value})
    }

    // uploading to firebase
    const upload =  (myImg) => {
        const fileName = new Date().getTime() + myImg.name
        const uploadedTask = storage.ref(`/tempImages/${fileName}`).put(myImg)
        uploadedTask.on
        ("state_changed",
            (snapshot) => {
                setProgress(snapshot.bytesTransferred / snapshot.totalBytes * 100);
        },
        (err) => {console.log(err)},
            () => {
                uploadedTask.snapshot.ref.getDownloadURL().then((url) => {
                    setMovieInfo((prev) => { return { ...prev , image: url } })
                })
            }
        )
    }

    // for Sending Movie Data to server
    const handleSubmit = async () => {
        if(!movieInfo.name || !movieInfo.desc || !movieInfo.date || !movieInfo.category || !movieInfo.image || !movieInfo.sizes || !movieInfo.colors || !movieInfo.inStock || !movieInfo.status || !movieInfo.price  ){
                alert("!!!  Please Fill All required Fields !!!")
        }else{
            try {
                await addProduct(movieInfo)
                setMovieInfo(initValue)
                // window.location.reload(false)
            }catch (error) {
                console.log("Error is : ", error)
            }
        }
    }

    // for sizes
    const [formats, setFormats] = React.useState(() => []);

    const handleFormat = (event, newFormats) => {
        setFormats(newFormats);
        setMovieInfo({...movieInfo , sizes: newFormats})
    };


    // colors sescton
    const names = [
        'green',
        'yellow',
        'pink',
        'red',
        'black',
        'purple',
    ];
    const theme = useTheme();
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
            },
        },
    };
    function getStyles(name, personName, theme) {
        return {
            fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
        };
    }
    const [personName, setPersonName] = React.useState([]);

    const handleColors = (event) => {
        const {
        target: { value },
        } = event;
        setPersonName(
            // On autofill we get a the stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    useEffect(() => {
        setMovieInfo({...movieInfo , colors : personName})
    }, [personName])


    const [value, setValue] = React.useState(new Date('2014-08-18'));

    const handleDate = (newValue) => {
        setValue(newValue);
        setMovieInfo({...movieInfo , date: newValue})
    };
    return (
        <>
            <Box className={classes.root} >
            {
                progress > 0  && (
                    <Typography variant="body2" style={{color: 'crimson'}}>Photo is {progress}% uploaded</Typography>
                )
            }
                <Typography className={classes.head}>Add New Product</Typography>

                 <Grid container direction="row" className={classes.prodComps} >
                    <Grid item xs={4}>
                        <Box className={classes.fileInput}>
                            <Typography variant="body1" style={{fontWeight: 700 , marginBottom:'10px' , paddingLeft: 'grey'}}>Product Image  </Typography>
                            <input type="file" className={classes.input} onChange={(e) => upload(e.target.files[0])}  />
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            label="Product Name"
                            variant="outlined"
                            className={classes.inputs}
                            name="name"
                            value={movieInfo.name}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl required  style={{width: '300px'}}>
                            <InputLabel id="demo-simple-select-required-label">Category</InputLabel>
                            <Select
                                labelId="demo-simple-select-required-label"
                                id="demo-simple-select-required"
                                value={movieInfo.category}
                                label="Genre"
                                name="category"
                                onChange={handleChange}
                            >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="Men">Men</MenuItem>
                            <MenuItem value="Women">Women</MenuItem>
                            <MenuItem value="Kids">Kids</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                <Grid container direction="row" className={classes.prodComps} >
                    <Grid item xs={4}>
                        <Typography variant="body1" style={{fontWeight: 700 , marginBottom:'10px' , paddingLeft: 'grey' , marginTop: '-20px'}}>Choose Sizes :   </Typography>
                        <ToggleButtonGroup
                            value={formats}
                            onChange={handleFormat}
                            aria-label="text formatting"
                        >
                            <ToggleButton value="S" aria-label="bold" >
                                S
                            </ToggleButton>
                            <ToggleButton value="M" aria-label="bold"
                                >
                                M
                            </ToggleButton>
                            <ToggleButton value="L" aria-label="bold"  >
                                L
                            </ToggleButton>
                            <ToggleButton value="XL" aria-label="bold" >
                                XL
                            </ToggleButton>
                            <ToggleButton value="XS" aria-label="bold" >
                                XS
                            </ToggleButton>
                            <ToggleButton value="XXL" aria-label="bold" >
                                XXL
                            </ToggleButton>
                            <ToggleButton value="XXS" aria-label="bold" >
                                XXS
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl sx={{ m: 1, width: 300 , marginTop: '-2px' }}>
                            <InputLabel id="demo-multiple-chip-label">Colors</InputLabel>
                            <Select
                                labelId="demo-multiple-chip-label"
                                id="demo-multiple-chip"
                                multiple
                                value={personName}
                                onChange={handleColors}
                                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} />
                                    ))}
                                    </Box>
                                )}
                            MenuProps={MenuProps}
                            >
                            {names.map((name) => (
                                <MenuItem
                                key={name}
                                value={name}
                                style={getStyles(name, personName, theme)}
                                >
                                {name}
                                </MenuItem>
                            ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                                label="Date desktop"
                                inputFormat="MM/dd/yyyy"
                                value={value}
                                name="date"
                                onChange={ handleDate }
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                </Grid>

                <Grid container direction="row" className={classes.prodComps} style={{marginTop: '45px'}} >
                    <Grid item xs={4}>
                        <TextField
                            label="Price($)"
                            variant="outlined"
                            className={classes.inputs}
                            name="price"
                            value={movieInfo?.price}
                            type="Number"
                            onChange={handleChange}
                        />
                        <FormControl required  style={{width: '300px' , marginTop: '20px'}}>
                            <InputLabel id="demo-simple-select-required-label">Status</InputLabel>
                            <Select
                                labelId="demo-simple-select-required-label"
                                id="demo-simple-select-required"
                                value={movieInfo?.status}
                                label="Status"
                                name="status"
                                onChange={handleChange}
                            >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="active" selected>Active</MenuItem>
                            <MenuItem value="inActive">InActive</MenuItem>aa
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid>
                        <TextareaAutosize
                            aria-label="minimum height"
                            minRows={10}
                            name="desc"
                            onChange={(e) => setMovieInfo({...movieInfo , [e.target.name] : e.target.value })}
                            placeholder="Product Description"
                            style={{ width: 290 }}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            label="Stock"
                            variant="outlined"
                            className={classes.inputs}
                            style={{maxWidth: '300px' , marginLeft: '30px'}}
                            name="inStock"
                            value={movieInfo.inStock}
                            type="Number"
                            onChange={handleChange}
                        />
                        {/* <TextField
                            label="Stock"
                            variant="outlined"
                            className={classes.inputs}
                            style={{maxWidth: '300px' , marginLeft: '30px' , marginTop: '20px'}}
                            name="inStock"
                            value={movieInfo.inStock}
                            type="Number"
                            onChange={handleChange}
                        /> */}
                    </Grid>
                </Grid>

                {
                progress === 100 && (
                    <>
                        <Button variant="contained" type="file" className={classes.uploadBtn1} onClick={handleSubmit} >Upload Product</Button>
                    </>
                )
            }
                )
            </Box>
        </>
    )
}

export default NewProduct