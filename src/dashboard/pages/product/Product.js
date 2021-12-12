import React, { useState , useEffect } from 'react'
import {
    Box,
    Typography,
    Button,
    Grid,
    TextField
} from '@mui/material'
import { useHistory , useLocation } from 'react-router-dom'
import { UpdateMovie } from '../../../server_api/Api'
import {storage}  from '../../../../Firebase'
import ReactPlayer from 'react-player'
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
            marginTop: '20px',
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
        fontSize: '17px',
        width: '150px',
        marginTop: '30px',
        marginLeft: '400px',
        backgroundColor: '#130f40',
        fontWeight: 600,
        textTransform: 'none',
        '&:hover': {
            backgroundColor: '#30336b'
        }
    },
    inputsDet :{
        marginBottom : '15px'
    }
}))
const Produt = () => {
    const classes = useStyles()
    const [currntData, setCurrntData] = useState({})

    // for getting sent movie details
    const location = useLocation()
    const history = useHistory()

    const [ img , setimg ] = useState(null)
    const [imgTitle, setimgTitle] = useState(null)
    const [imgSm, setimgSm] = useState(null)
    const [trailor, settrailor] = useState(null)
    const [video, setvideo] = useState(null)

    const [ vid, setVideo ] = useState('');
    const [ vidTrail, setVideoTrail ] = useState('');

    const [ isImage , setIsImage ] = useState(false)
    const [ isImageSm , setIsImageSm ] = useState(false)
    const [ isImageTitle , setIsImageTitle ] = useState(false)
    const [ isTrailor , setIsTrailor ] = useState(false)
    const [ isVideo , setIsVideo ] = useState(false)

    const [ isImageUpload , setIsImageUpload ] = useState(false)
    const [ isImageSmUpload , setIsImageSmUpload ] = useState(false)
    const [ isImageTitleUpload , setIsImageTitleUpload ] = useState(false)
    const [ isTrailorUpload , setIsTrailorUpload ] = useState(false)
    const [ isVideoUpload , setIsVideoUpload ] = useState(false)

    const [ error , setError ] = useState('')
    const [progress, setProgress] = useState(0)



    const handleChange = (e) => {
        setCurrntData({...currntData , [ e.target.name ] : e.target.value})
    }

    // for sendig data fro updating
    const handleSendData = async () => {
        try {
            const { data } = await UpdateMovie(currntData?._id , currntData)
            if(data?.message !== ''){
                setError(data?.message)
                alert(error)
            }else{
                setError('')
                alert("Movie Details Updated SuccesssFully")
                history.push('/admin/movies/')
            }
            //setCurrntData(data.updatedMovie)
        } catch (error) {
            console.log("Error is in Product.js : ", error)
        }
    }

    // for uploading Profile Pic to Firebase
    const uploadImage = (type , field) => {
        if(field === "img"){
            setIsImage(false)
            setIsImageUpload(true)
        } else if (field === "imgTitle") {
            setIsImageSm(false)
            setIsImageSmUpload(true)
        } else if (field === "imgSm") {
            setIsImageTitle(false)
            setIsImageTitleUpload(true)
        } else if (field === "trailor") {
            setIsTrailor(false)
            setIsTrailorUpload(true)
        } else if (field === "video") {
            setIsVideo(false)
            setIsVideoUpload(true)
        }


        const fileName = new Date().getTime() + type.name
        const uploadedTask = storage.ref(`/NetflixApp/ProfileImages/${fileName}`).put(type)

        uploadedTask.on("state_changed",
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                setProgress(progress)
                console.log(" file is " + progress + "% done")
            },
            (err) => {
                console.log(err)
            },
            () => {
                uploadedTask.snapshot.ref.getDownloadURL().then((url) => {
                    if(field === "img"){
                        setCurrntData((prev) => { return { ...prev , img: url } })
                        setIsImageUpload(false)
                    } else if (field === "imgTitle") {
                        setCurrntData((prev) => { return { ...prev , imgTitle: url }  })
                        setIsImageSmUpload(false)
                    } else if (field === "imgSm") {
                        setCurrntData((prev) => { return { ...prev , imgSm: url } })
                        setIsImageTitleUpload(false)
                    } else if (field === "trailor") {
                        setCurrntData((prev) => { return { ...prev , trailor: url }  })
                        setIsTrailorUpload(false)
                        setVideoTrail(url)
                    } else if (field === "video") {
                        setCurrntData((prev) => { return { ...prev , video: url }  })
                        setVideo(url)
                        setIsVideoUpload(false)
                    }
                })
            }
        )
    }

    useEffect(() => {
        setCurrntData(location.movie)
    },[location ])


    useEffect(() => {
        setVideo(currntData?.video)
        setVideoTrail(currntData?.trailor)
    }, [currntData])

    return (
        <>
            <Box className={classes.root}>
                <Box className={classes.CreateSec}>
                    <Typography className={classes.head}>Movie</Typography>
            </Box>
            <Typography style={{fontSize: '17px' , fontWeight: 600 , color:'red', marginLeft: '350px' }}>{error}</Typography>
                <Grid container style={{marginTop: '20px'}}>
                    <Grid item xs={12} className={classes.prod} >
                        <Grid container style={{marginTop : '-10px'}} >
                            <Grid item xs={2}>
                                <img
                                    src = {currntData.img || "https://images.unsplash.com/photo-1600375104627-c94c416deefa?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YWlycG9kc3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" }
                                    alt="Product Cover"
                                    className={classes.prodImStock}
                                />
                            </Grid>
                            <Grid item xs={10}>
                                <Typography className={classes.prodName}> {currntData.title}</Typography>
                            </Grid>
                        </Grid>

                        <Grid container className={classes.prodDetails} >
                            <Grid item xs={2}>
                                <Box className={classes.prodDetailLeft}>
                                    <Typography className={classes.prodDetailLeftHead}>Id:</Typography>
                                    <Typography className={classes.prodDetailLeftHead}>Genre:</Typography>
                                    <Typography className={classes.prodDetailLeftHead}>Year:</Typography>
                                    <Typography className={classes.prodDetailLeftHead}  >Age Limit:</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={3}>
                                    <Box className={classes.prodDetailLeft}>
                                    <Typography className={classes.prodDetailrightHead}>{currntData._id}</Typography>
                                    <Typography className={classes.prodDetailrightHead}>{currntData.genre}</Typography>
                                    <Typography className={classes.prodDetailrightHead}>{currntData.year}</Typography>
                                    <Typography className={classes.prodDetailrightHead}  >{currntData.limit}</Typography>
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
                            value={currntData.title}
                            onChange={handleChange}
                            name="title"
                            className={classes.inputsDet}
                        />

                        <TextField
                            id="outlined-multiline-flexible"
                            variant="outlined"
                            value={currntData.year}
                            onChange={handleChange}
                            name="year"
                            className={classes.inputsDet}
                        />

                        <TextField
                            id="outlined-multiline-flexible"
                            variant="outlined"
                            value={currntData.genre}
                            onChange={handleChange}
                            name="genre"
                            className={classes.inputsDet}
                        />

                        <TextField
                            id="outlined-multiline-flexible"
                            variant="outlined"
                            value={currntData.limit}
                            onChange={handleChange}
                            name="limit"
                            className={classes.inputsDet}
                        />

                    </Grid>
                    <Grid item xs={5}>

                        <Box style={{display: 'flex' , flexDirection: 'column' , marginTop: '15px' }} >
                                <Box style={{display: 'flex' , flexDirection: 'column'}}>
                                <Typography variant="body1" style={{fontWeight: 700 , marginBottom : '-0px' , color : '#34ace0' }}>Change Cover Picture  <span style={{color: 'red' }}>*</span>  </Typography>
                                <Box style={{display: 'flex'}}>
                                    <>
                                    <input type="file" onChange={(e)=>  { setimg(e.target.files[0]); setIsImage(true)  }}  />
                                    {
                                        isImage && (
                                            <>
                                                <Button variant="contained" style={{backgroundColor: '#8e44ad' , color: '#fff' , fontWeight: 600 }} onClick={() => uploadImage(img , "img")}> Upload Photo</Button>
                                            </>
                                        )
                                    }
                                    </>
                                </Box>
                            </Box>
                            {
                                isImageUpload && (
                                        progress > 0 && (
                                        progress === 100 ? (
                                            <>
                                                <Typography style={{color: 'green' , marginTop: '10px' , fontSize: '14px' , fontWeight: 500}}>Profile Picture is  {progress}% Uploaded</Typography>
                                            </>
                                        ) : (
                                            <Typography style={{color: 'red' , marginTop: '10px', fontSize: '14px' , fontWeight: 500}}>Profile Picture is  {progress}% Uploaded</Typography>
                                        )
                                    )
                                )
                            }
                            </Box>

                        <Box style={{display: 'flex' , flexDirection: 'column' , marginTop: '100px'}} >
                                <Box style={{display: 'flex' , flexDirection: 'column'}}>
                                <Typography variant="body1" style={{fontWeight: 700 , marginBottom : '-0px' , color : '#34ace0' }}>Change Thumbnail Picture  <span style={{color: 'red' }}>*</span>  </Typography>
                                <Box style={{display: 'flex'}}>
                                    <>
                                        <input type="file" onChange={(e)=>  { setimgTitle(e.target.files[0]); setIsImageSm(true)  }}  />
                                        {
                                            isImageSm && (
                                                <>
                                                    <Button variant="contained" style={{backgroundColor: '#8e44ad' , color: '#fff' , fontWeight: 600 }} onClick={() => uploadImage(imgTitle , "imgTitle")}> Upload Photo</Button>
                                                </>
                                            )
                                        }
                                        </>
                                    </Box>
                                </Box>
                                {
                                    isImageSmUpload && (
                                        progress > 0 && (
                                            progress === 100 ? (
                                                <>
                                                    <Typography style={{color: 'green' , marginTop: '10px' , fontSize: '14px' , fontWeight: 500}}> Picture is  {progress}% Uploaded</Typography>
                                                </>
                                            ) : (
                                                <Typography style={{color: 'red' , marginTop: '10px', fontSize: '14px' , fontWeight: 500}}> Picture is  {progress}% Uploaded</Typography>
                                            )
                                        )
                                    )
                                }
                            </Box>

                        <Box style={{display: 'flex' , flexDirection: 'column' , marginTop: '100px'}} >
                                <Box style={{display: 'flex' , flexDirection: 'column'}}>
                                <Typography variant="body1" style={{fontWeight: 700 , marginBottom : '-0px' , color : '#34ace0' }}>Change Small Picture  <span style={{color: 'red' }}>*</span>  </Typography>
                                <Box style={{display: 'flex'}}>
                                    <>
                                    <input type="file" onChange={(e)=>  { setimgSm(e.target.files[0]); setIsImageTitle(true)  }}  />
                                    {
                                        isImageTitle && (
                                            <>
                                                <Button variant="contained" style={{backgroundColor: '#8e44ad' , color: '#fff' , fontWeight: 600 }} onClick={() => uploadImage(imgSm , "imgSm")}> Upload Photo</Button>
                                            </>
                                        )
                                    }
                                    </>
                                </Box>
                            </Box>
                            {
                                isImageTitleUpload && (
                                    progress > 0 && (
                                        progress === 100 ? (
                                            <>
                                                <Typography style={{color: 'green' , marginTop: '10px' , fontSize: '14px' , fontWeight: 500}}> Picture is  {progress}% Uploaded</Typography>
                                            </>
                                        ) : (
                                            <Typography style={{color: 'red' , marginTop: '10px', fontSize: '14px' , fontWeight: 500}}> Picture is  {progress}% Uploaded</Typography>
                                        )
                                    )
                                )
                            }
                            </Box>

                        <Box style={{display: 'flex' , flexDirection: 'column' , marginTop: '100px'}} >
                            <Box style={{display: 'flex' , flexDirection: 'column'}}>
                            <Typography variant="body1" style={{fontWeight: 700 , marginBottom : '-0px' , color : '#34ace0' }}>Change Trailor   <span style={{color: 'red' }}>*</span>  </Typography>
                            <Box style={{display: 'flex'}}>
                                <>
                                <input type="file" onChange={(e)=>  { settrailor(e.target.files[0]); setIsTrailor(true)  }}  />
                                {
                                    isTrailor && (
                                        <>
                                            <Button variant="contained" style={{backgroundColor: '#8e44ad' , color: '#fff' , fontWeight: 600 }} onClick={() => uploadImage(trailor , "trailor")}> Upload Trailor</Button>
                                        </>
                                    )
                                }
                                </>
                            </Box>
                        </Box>
                        {
                            isTrailorUpload && (
                                progress > 0 && (
                                    progress === 100 ? (
                                        <>
                                            <Typography style={{color: 'green' , marginTop: '10px' , fontSize: '14px' , fontWeight: 500}}>Trailor is  {progress}% Uploaded</Typography>
                                        </>
                                    ) : (
                                        <Typography style={{color: 'red' , marginTop: '10px', fontSize: '14px' , fontWeight: 500}}>Trailor is  {progress}% Uploaded</Typography>
                                    )
                                )
                            )
                        }
                        </Box>

                        <Box style={{display: 'flex' , flexDirection: 'column' , marginTop: '70px'}} >
                            <Box style={{display: 'flex' , flexDirection: 'column'}}>
                            <Typography variant="body1" style={{fontWeight: 700 , marginBottom : '-0px' , color : '#34ace0' }}>Change Trailor   <span style={{color: 'red' }}>*</span>  </Typography>
                            <Box style={{display: 'flex'}}>
                            <>
                            <input type="file" onChange={(e)=>  { setvideo(e.target.files[0]); setIsVideo(true)  }}  />
                            {
                                isVideo && (
                                    <>
                                        <Button variant="contained" style={{backgroundColor: '#8e44ad' , color: '#fff' , fontWeight: 600 }} onClick={() => uploadImage(video , "video")}> Upload Trailor</Button>
                                    </>
                                )
                            }
                            </>
                        </Box>
                    </Box>
                    {
                        isVideoUpload && (
                            progress > 0 && (
                                progress === 100 ? (
                                    <>
                                        <Typography style={{color: 'green' , marginTop: '10px' , fontSize: '14px' , fontWeight: 500}}>Video is  {progress}% Uploaded</Typography>
                                    </>
                                ) : (
                                    <Typography style={{color: 'red' , marginTop: '10px', fontSize: '14px' , fontWeight: 500}}>Video is  {progress}% Uploaded</Typography>
                                )
                            )
                        )
                    }
                    </Box>

                    </Grid>
                    <Grid item xs={3} style={{display: 'flex' , flexDirection : 'column' , justifyContent:'space-between'}} >
                        <Box style={{display: 'flex' , flexDirection: 'column' , marginBottom: '20px'}}>
                            <img src={currntData.img} alt="Img " style={{width:"90px" , height: '90px' , borderRadius: '10px'}} />
                            <Typography style={{fontSize: '14px' , fontWeight: 600 , marginTop: '5px' , color: '#6c5ce7'}} >Cover Photo</Typography>
                        </Box>
                        <Box style={{display: 'flex' , flexDirection: 'column' , marginBottom: '20px'}}>
                            <img src={currntData.imgTitle} alt="Img " style={{width:"90px" , height: '90px' , borderRadius: '10px'}} />
                            <Typography style={{fontSize: '14px' , fontWeight: 600 , marginTop: '5px' , color: '#6c5ce7'}} >Small Photo</Typography>
                        </Box>
                        <Box style={{display: 'flex' , flexDirection: 'column' , marginBottom: '20px'}}>
                            <img src={currntData.imgSm} alt="Img " style={{width:"90px" , height: '90px' , borderRadius: '10px'}} />
                            <Typography style={{fontSize: '14px' , fontWeight: 600 , marginTop: '5px' , color: '#6c5ce7'}} >Thumbnail Photo</Typography>
                        </Box>
                        <Box style={{display: 'flex' , flexDirection: 'column' , marginBottom: '20px' , marginLeft:'-60px'}}>
                            {
                                vidTrail && (
                                    <ReactPlayer
                                        url={vidTrail}
                                        playing={false}
                                        controls={true}
                                        progress={true}
                                        width = "250px"
                                        height = "150px"
                                    />
                                )
                            }
                            <Typography style={{fontSize: '14px' , fontWeight: 600 , marginTop: '5px' , color: '#6c5ce7' , marginLeft: '25px'}} >Trailor</Typography>
                        </Box>
                        <Box style={{display: 'flex' , flexDirection: 'column' , marginBottom: '20px' , marginLeft: '-60px'}}>
                        {
                            vid && (
                                <ReactPlayer
                                    url={vid}
                                    playing={false}
                                    controls={true}
                                    progress={true}
                                    width = "250px"
                                    height = "150px"
                                />
                            )
                        }
                            <Typography style={{fontSize: '14px' , fontWeight: 600 , marginTop: '5px' , color: '#6c5ce7' , marginLeft: '25px'}} >Video</Typography>
                        </Box>
                    </Grid>

                    {
                        progress > 0 ? (
                            <>
                                {
                                    progress === 100 ? (
                                        <Button variant="contained" type="file" className={classes.uploadBtn} onClick={handleSendData} > Update</Button>
                                    ) : (
                                        <Button variant="contained" disabled type="file" className={classes.uploadBtn} onClick={handleSendData} > Update</Button>
                                    )
                                }
                            </>
                        ) : (
                            <Button variant="contained" type="file" className={classes.uploadBtn} onClick={handleSendData} > Update</Button>
                        )
                    }

                </Grid>

            </Box>
        </>
    )
}

export default Produt
