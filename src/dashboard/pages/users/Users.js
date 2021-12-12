import React , {useEffect , useState} from 'react'
import { Box , Grid , Typography , Button, TextField } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DateRangeIcon from '@mui/icons-material/DateRange';
import {  useLocation , useHistory  } from 'react-router-dom'
import {storage}  from '../../../../Firebase'
import { updateAdmin } from '../../../server_api/Api'
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles((theme) => ({
    root:{
        marginTop: '-30px',
        padding: '20px',
        flex: '4',
        marginLeft: '-20px',
        marginRight: '20px'
    },
    head : {
        fontSize: '30px',
        fontWeight: 600
    },
    leftSide : {
        boxShadow: '2px 6px 39px -15px #000000',
        padding: '20px',
        marginRight: '10px',
        marginLeft: '-10px'
    },
    userImage : {
        width: '50px',
        height: '50px',
        borderRadius: '50%'
    },
    userInfo : {
        display : 'flex',
        flexDirection:'column',
        marginLeft: '25px'
    },
    userName : {
        fontSize : '15px',
        fontWeight:600
    },
    userProf: {
         fontSize: '13px',
         color: 'grey'
    },
    rightSide : {
        boxShadow: '2px 6px 39px -15px #000000',
        padding: '20px'
    },
    userDetails : {
        display: 'flex',
        flexDirection: 'column',
        marginTop: '15px'
    },
    DetailHead :{
        fontSize: '18px',
        fontWeight: 500,
        color: 'grey'
    },
    button : {
        marginTop: '7px',
        color: '#0b0b0b',
        backgroundColor: '#fff',
        fontSize: '16px',
        fontWeight: 500,
        textTransform: 'none',
        maxWidth: '230px',
        overflow: 'hidden',
        '&:hover' : {
            backgroundColor: '#fff',
            cursor: 'text-pointer'
        }
    },

    editHead : {
        fontSize: '25px',
        fontWeight: 600,
        marginLeft: '25px'
    },
    inputFields : {
        width: '300px',
        marginBottom: '20px',
        color: 'grey'
    },
    uploadedImage : {
        display : 'flex',

    },
    uploadedImg : {
        width:'100px',
        height: '100px',
        borderRadius: '10px'
    },
    uploadIcon : {
        fontSize : '35px',
        marginTop: '30px',
        marginLeft: '10px',
        color: '#4834d4'
    },
    uploadBtn :{
        color: '#fff',
        fontSize: '17px',
        width: '100px',
        marginLeft: '15px',
        backgroundColor: '#130f40',
        fontWeight: 600,
        textTransform: 'none',
        '&:hover': {
            backgroundColor: '#30336b'
        }
    }
}))
const Users = () => {
    const classes = useStyles();
    const history = useHistory()

    // for getting sent movie details
    const location = useLocation()
    const [ error , setError ] = useState('')
    const [progress, setProgress] = useState(0)
    const [img, setimg] = useState(null)
    const [ showBtnUpld , setShowBtnUpld ] = useState(false)

    const [ currntData , setCurrntData ] = useState({})

    const handleChange = (e) => {
        setCurrntData({...currntData , [ e.target.name ] : e.target.value})
    }


    // for sendig data fro updating
    const handleSubmit = async () => {
        try {
            const { data } = await updateAdmin(currntData?._id , currntData)
            if(data.message !== ''){
                setError(data.message)
            }else{
                setError('')
                history.push('/admin/allAdmins')
            }
        } catch (error) {
            console.log("Error is in Updating Admin  : ", error)
        }
    }

    useEffect(() => {
        setCurrntData(location.user)
    },[location])

        // for uploading Profile Pic to Firebase
    const uploadImage = () => {
        setShowBtnUpld(false)
        const fileName = new Date().getTime() + img.name
            const uploadedTask = storage.ref(`/NetflixApp/ProfileImages/${fileName}`).put(img)

            uploadedTask.on
            ("state_changed",
                (snapshot) => {
                    const progress =  (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    setProgress(progress)
                    console.log(" file is " + progress + "% done")
            },
                (err) => {console.log(err)},
                () => {
                    uploadedTask.snapshot.ref.getDownloadURL().then((url) => {
                        setCurrntData({...currntData , adminPhoto: url })
                    })
                }
            )
    }


    return (
        <>
            <Box className={classes.root}>
                <Grid container >
                    <Grid item xs={2}>
                        <Typography className={classes.head}>Edit Admin </Typography>
                    </Grid>
                    <Grid item xs={8}></Grid>
                    <Grid item xs={2}>
                    </Grid>
                </Grid>

                <Grid container style={{marginTop: '20px'}} >
                    <Grid item xs={4} className={classes.leftSide} >
                        <Grid container style={{marginTop: '15px'}}>
                            <Grid item xs={2}>
                            <img
                                src={ currntData?.adminPhoto || "https://images.unsplash.com/photo-1553272725-086100aecf5e?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwzN3x8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" }
                                alt=" User Cover"
                                className={classes.userImage}
                            />
                        </Grid>
                            <Grid item xs={10}>
                            <Box className={classes.userInfo}>
                                <Typography className={classes.userName}>{currntData?.username}</Typography>
                            </Box>
                        </Grid>
                        </Grid>
                        <Box className={classes.userDetails}>
                            <Typography className={classes.DetailHead}>Account Details</Typography>
                            <Button
                                style={{  maxWidth: '200px', overflowX: 'hidden' }}
                                className={classes.button}
                                startIcon={<AccountCircleIcon style={{marginLeft: '-30px'}} />}
                            >
                                {currntData.email}
                            </Button>
                            <Button
                            style={{ maxWidth: '250px'}}
                                className={classes.button}
                                startIcon={<DateRangeIcon style={{marginLeft: '0px'}} />}
                            >
                            {currntData?._id}
                            </Button>
                        </Box>
                    </Grid>


                    <Grid item xs={8} className={classes.rightSide}>
                        <Typography className={classes.editHead}>Edit</Typography>
                        {
                            error && (
                                <Typography style={{color: 'red' , marginTop: '10px', fontSize: '14px' , fontWeight: 500}} >{error}</Typography>
                            )
                        }
                        <Grid container style={{marginTop: '20px'}}>
                            <Grid item xs={9}>
                                <Box style={{display: 'flex' , flexDirection: 'column' , marginTop: '15px'}}>
                                    <TextField
                                        id="standard-error-helper-text"
                                        label = "Email"
                                        name="email"
                                        value={currntData?.email}
                                        onChange={handleChange}
                                        variant = "outlined"
                                        className={classes.inputFields}
                                    />
                                    <TextField
                                        id="standard-error-helper-text"
                                        label = "UserName"
                                        name="username"
                                        value={currntData?.username}
                                        onChange={handleChange}
                                        variant = "outlined"
                                        className={classes.inputFields}
                                    />
                                    <Typography variant="body1" style={{fontWeight: 700 , marginBottom : '-0px' , color : '#34ace0' }}>Change Profile Picture  <span style={{color: 'red' }}>*</span>  </Typography>
                                    <Box style={{display: 'flex'}}>
                                        <input type="file" onChange={(e)=>  { setimg(e.target.files[0]); setShowBtnUpld(true)  }}  />
                                        {
                                            showBtnUpld && (
                                                <>
                                                    <Button variant="contained" style={{backgroundColor: '#8e44ad' , color: '#fff' , fontWeight: 600 }} onClick={uploadImage}> Upload Photo</Button>
                                                </>
                                            )
                                        }
                                    </Box>
                                    {
                                        progress > 0 && (
                                            progress === 100 ? (
                                                <>
                                                    <Typography style={{color: 'green' , marginTop: '10px' , fontSize: '14px' , fontWeight: 500}}>Profile Picture is  {progress}% Uploaded</Typography>
                                                </>
                                            ) : (
                                                <Typography style={{color: 'red' , marginTop: '10px', fontSize: '14px' , fontWeight: 500}}>Profile Picture is  {progress}% Uploaded</Typography>
                                            )
                                        )
                                    }
                                </Box>
                            </Grid>
                            <Grid item xs={3} style={{display: 'flex' , flexDirection : 'column' , justifyContent:'space-between'}} >
                                {
                                    progress > 0 ? (
                                        <>
                                            {
                                                progress === 100 ? (
                                                    <Button variant="contained" type="file" className={classes.uploadBtn} onClick={handleSubmit} > Update</Button>
                                                ) : (
                                                    <Button variant="contained" disabled type="file" className={classes.uploadBtn}> Update</Button>
                                                )
                                            }
                                        </>
                                    ) : (
                                        <Button variant="contained" type="file" className={classes.uploadBtn} onClick={handleSubmit} > Update</Button>
                                    )
                                }
                            </Grid>
                        </Grid>
                    </Grid>

                </Grid>
            </Box>
        </>
    )
}

export default Users
