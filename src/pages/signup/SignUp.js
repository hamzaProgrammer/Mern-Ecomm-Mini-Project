import React , {useState} from 'react'
import { Paper , TextField , Button , Box, Typography} from '@mui/material';
import swal from 'sweetalert'
import {Link , useHistory } from 'react-router-dom'
import { signUp } from '../../server_api/Api'
import { makeStyles } from '@mui/styles'


const useStyles = makeStyles((theme) => ({
    root:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop : "3%",
    },
    title: {
        fontFamily: 'Grand Hotel , cursive',
        fontSize: '35px'
    },
    paper : {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: '20px',
        width: '400px',
        paddingBottom: '20px',
        boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px'
    },
    form : {
        display : 'flex',
        flexDirection : 'column',
        justifyContent: 'center',
        marginLeft: '10px',
        marginRight: '5px',

    },
    input:{
        marginLeft: '20px',
        marginRight: '5px',
        width: '350px',
        marginBottom : '20px',
    },
    signin: {
        color: '#2c3e50',
        textDecoration: 'none',
        marginTop : '20px',
        fontSize : '20px',
    },
    fileInput: {
        width: '97%',
        marginLeft: '20px',
        marginBottom: '50px',
    },
}));

const initValues = {
    username: '',
    email: '',
    password: '',
    confirmpassword: '',
}
const SignUp = () => {
    const classes = useStyles();
    const [formData , setFormData] = useState(initValues);
    const history = useHistory()

    const handleChange = (e) => {
        setFormData({...formData , [e.target.name] : e.target.value });
    }

    const SignUpNow = async () => {
        const { data } = await signUp(formData)
        console.log(data)
        if (data.message === '') {
            swal({
                icon: "success",
                text: "User Signed Up successFully!!!"
            });
            history.push('/signin')
        }else{
            swal({
                icon: "warning",
                text: "Some Error Occured"
            });
        }
    }

    return (
        <>
            <div className={classes.root}>
                <Paper className={classes.paper} variant = "outlined" elevation = {6} >
                    <h2 className={classes.title}>Ecommerce Store</h2>
                    <form classname={classes.form} >
                        <TextField id="outlined-basic" label="Name" value={formData.name} onChange={(e) => handleChange(e)} name="username" className={classes.input} />
                        <TextField id="outlined-basic" label="Email" value={formData.email} onChange={(e) => handleChange(e)} name="email"  className={classes.input} />
                        <TextField id="outlined-basic" label="Password" type="password" value={formData.password} onChange={(e) => handleChange(e)} name="password" className={classes.input} />
                        <TextField id="outlined-basic" label="Confirm Password" type="password" value={formData.confirmpassword} onChange={(e) => handleChange(e)} name="confirmpassword"  className={classes.input} />
                        <Box textAlign='center' style={{marginTop: '15px'}}>
                            <Button variant='contained' color="primary" onClick={SignUpNow}>
                                Sign Up
                            </Button>
                        </Box>
                    </form>
                    <Typography component={Link} to="/signin" className={classes.signin}>
                        Do You Have an Account?
                    </Typography>
                </Paper>
            </div>
        </>
    )
}

export default SignUp
