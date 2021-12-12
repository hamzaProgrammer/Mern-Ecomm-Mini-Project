import React , {useState} from 'react'
import {
    Box,
    Typography,
    TextField,
    Button
} from '@mui/material'
import { signInAdmin } from '../../../server_api/Api'
import { useHistory } from 'react-router-dom'
import {makeStyles} from '@mui/styles'

const useStyles = makeStyles((theme) => ({
    root : {
        marginTop: '100px',
        padding: '20px',
        boxShadow: '2px 6px 39px -15px #000000',
        marginRight: '30px',
        marginLeft: '500px',
        paddingLeft : '30px',
        maxWidth: '380px',
    },
    head : {
        fontSize : '22px',
        fontWeight: 600,
    },
    prodComps : {
        display : 'flex',
        flexDirection: 'column',
        marginTop: '30px'
    },
    inputs : {
        width: '300px',
        marginBottom : '20px'
    },
    uploadBtn: {
        color: '#fff',
        fontSize: '14px',
        width: '100px',
        marginLeft: '100px',
        backgroundColor: '#130f40',
        fontWeight: 600,
        marginTop: '30px',
        textTransform: 'none',
        '&:hover': {
            backgroundColor: '#30336b'
        }
    }
}))
const SignIn = () => {
    const classes = useStyles();
    const [ msg , setMsg ] = useState('')
    const history = useHistory()

    const [ userInfo , setUserInfo ]= useState({
        email: '',
        password: ''
    });

    const handleInfo = async () => {
        const { data } = await signInAdmin(userInfo)
        if(data?.message !== ''){
            setMsg(data?.message)
        }else{
            localStorage.setItem('Admin', JSON.stringify(data));
            history.push('/admin')
        }
    }

    return (
        <>
            <Box className={classes.root} >
                <Typography className={classes.head}>Sign In</Typography>
                {
                    msg && (
                        <Typography style={{fontSize: '12px' , fontWeight: 600 , color:'red' , marginLeft: '30px' }}>{msg}</Typography>
                    )
                }
                <Box className={classes.prodComps} >
                    <TextField
                        label="Email"
                        variant="outlined"
                        className={classes.inputs}
                        value={userInfo.email}
                        name="email"
                        onChange={(e) => setUserInfo({...userInfo ,[e.target.name]:e.target.value})}
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        className={classes.inputs}
                         value={userInfo.password}
                        name="password"
                        type="password"
                        onChange={(e) => setUserInfo({...userInfo ,[e.target.name]:e.target.value})}
                    />

                    <Button variant="contained" type="file" className={classes.uploadBtn} onClick={handleInfo} > Sign In</Button>
                </Box>

            </Box>
        </>
    )
}

export default SignIn