import React , { useState }from 'react'
import { Box  , Typography , Grid ,TextField  , Button } from '@mui/material'
import { checkAdminInfo , uploadAdminData } from '../../../Frontend_pages/server_api/Api'
import {storage}  from '../../../../Firebase'
import {makeStyles} from '@mui/styles'

const useStyles = makeStyles((theme) => ({
    root : {
        padding: '20px',
        boxShadow: '2px 6px 39px -15px #000000',
        marginLeft: '60px',
        marginRight: '30px',
        maxWidth: '800px',
        marginTop:'60px'
    },
    head : {
        fontSize : '27px',
        fontWeight: 700,
        marginLeft: '300px'
    },
    leftInputs : {
        marginTop: '10px',
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '30px'
    },
    inputFields: {
        width: '300px',
        marginBottom: '20px',
        color: 'grey'
    },
    rightInputs : {
        marginTop: '10px',
        display: 'flex',
        flexDirection: 'column',
    },
    uploadBtn: {
        color: '#fff',
        fontSize: '15px',
        width: '150px',
        marginLeft: '0px',
        backgroundColor: '#130f40',
        fontWeight: 600,
        textTransform: 'none',
        marginTop: '20px',
        '&:hover' : {
            backgroundColor: '#30336b'
        }
    }
}))
const NewUsers = () => {
    const classes = useStyles();

    const [userData, setUserData] = useState({
        email: '',
        username: '',
        password: '',
        adminPhoto: '',
    })

    const [ isEmail , setisEmail ] = useState(true)
    const [isuserName, setisUser] = useState(true)
    const [isPassword, setisPassword] = useState(true)

    const [ img , setimg ] = useState(null)
    const [ isPhotoUploaded , setPhotoUploaded ] = useState(false)
    const [ uploadData , setUploadData ] = useState(false)
    const [ msg , setMsg ] = useState('')
    const [ progress , setProgress ] = useState(0)



    const checkMyEmail = async(type , Mydata) => {
        const { data } = await checkAdminInfo(type , Mydata)
        setMsg(data?.message)
        if(data?.message === null){
            if(type === "email"){
                setisEmail(false)
            }else{
                setisUser(false)
            }
        }
    }
    // Image Blur Function
    const imgBlur = () => {
        setPhotoUploaded(true)
    }
    // Password Blur function
    const BlurPassword = () => {
        setisPassword(false)
    }

    // for submiting Data to server
    const submitData = async () => {
        const { data } = await uploadAdminData(userData)
        console.log(data.newAdmin);
    }

    // for uploading Profile Pic to Firebase
    const uploadImage = () => {
        setPhotoUploaded(false)
        const fileName = new Date().getTime() + img.name
            const uploadedTask = storage.ref(`/NetflixApp/ProfileAdmins/${fileName}`).put(img)

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
                        setUserData({...userData , adminPhoto: url })

                    })
                }
            )
            setUploadData(true)
    }

    return (
        <>
            <Box className={classes.root}>
                <Typography className={classes.head}> Add New User</Typography>
                <Typography variant="body2" style={{marginLeft: '330px', color: 'red' ,fontWeight: 500}} >{msg}</Typography>
                <Grid container style={{marginTop: '20px'}}>
                    <Grid item xs={6}>
                        <Box className={classes.leftInputs}>
                            <TextField
                                id="standard-error-helper-text"
                                label = "Email"
                                variant = "outlined"
                                value={userData.email}
                                onChange={(e) => setUserData({ ...userData , [ e.target.name ] : e.target.value })}
                                name="email"
                                className={classes.inputFields}
                                onBlur={() =>  checkMyEmail( "email" , userData.email) }
                            />
                            <TextField
                                id="standard-error-helper-text"
                                label = "Password"
                                value={userData.password}
                                onChange={(e) => setUserData({...userData , [ e.target.name ] : e.target.value })}
                                name="password"
                                disabled={isuserName}
                                variant = "outlined"
                                className={classes.inputFields}
                                onBlur={BlurPassword}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box className={classes.leftInputs}>
                            <TextField
                                id="standard-error-helper-text"
                                label = "UserName"
                                value={userData.username}
                                onChange={(e) => setUserData({...userData , [ e.target.name ] : e.target.value })}
                                name="username"
                                disabled={isEmail}
                                //onBlur={show}
                                variant = "outlined"
                                className={classes.inputFields}
                                onBlur={() =>  checkMyEmail( "username" , userData.username) }
                            />
                            <Typography variant="body1" style={{fontWeight: 700 , marginBottom : '-0px' , color : '#34ace0' }}>Upload Profile Picture  <span style={{color: 'red' }}>*</span>  </Typography>
                            <input type="file" disabled={isPassword} onBlur={imgBlur}  onChange={(e)=> setimg(e.target.files[0])}  />
                        </Box>
                    </Grid>
                </Grid>

                <Box style={{display: 'flex' , justifyContent: 'center'}}>
                {
                    isPhotoUploaded && (
                        <Button variant="contained" className={classes.uploadBtn} onClick={uploadImage} >Upload Photo </Button>
                    )
                }
                {
                    progress > 0 && (
                        <Typography variant="body2" style={{marginLeft: '330px', color: 'red' ,fontWeight: 500}} >Please Wait: Image {progress}% Uploaded</Typography>
                    )
                }
                {
                    uploadData && (
                        <>
                            <Button variant="contained"  className={classes.uploadBtn} onClick={submitData}>Create user </Button>
                        </>
                    )
                }
                </Box>
            </Box>
        </>
    )
}

export default NewUsers
