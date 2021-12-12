import React , {useState  } from 'react';
import {makeStyles} from '@mui/styles'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useHistory } from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: '15px',
  },
  title: {
    width:"150px",
    height : "30px"
  },
  search: {
    position: 'relative',
    borderRadius: '2px',
    backgroundColor: '#0b0b0b',
    '&:hover': {
      backgroundColor: '#0b0b0b',
    },
    marginRight: '30px',
    marginLeft: 0,
    width: '100%',
    // [theme.breakpoints.up('sm')]: {
    //   marginLeft: theme.spacing(3),
    //   width: 'auto',
    // },
  },
  searchIcon: {
    padding: '15px',
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    marginLeft:  '100px',
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${10}`,
    //transition: theme.transitions.create('width'),
    width: '100%',
    // [theme.breakpoints.up('md')]: {
    //   width: '20ch',
    // },
  },
  sectionDesktop: {
    display: 'none',
    // [theme.breakpoints.up('md')]: {
    //   display: 'flex',
    // },
  },
  sectionMobile: {
    display: 'flex',
    // [theme.breakpoints.up('md')]: {
    //   display: 'none',
    // },
  },
  navbarBtn : {
      backgroundColor: "#0b0b0b",
      color: '#fff',
      textTransform: 'capitalize',
      margin: '5px 5px',
      '&:hover': {
          backgroundColor: "#d63031"
      }
  },
  profilePic : {
      width: '40px',
      height: '45px',
      borderRadius: '50%'
  },
  changeNav:{
    backgroundColor: "#0b0b0b",
    '& $threeIcons': {
        color: '#fff'
    }
  },
  navColor :{
    background: 'transparent',
    boxShadow: 'none',
  },
  btnsOrig : {
    color: '#fff',
    textTransform: 'capitalize',
    '&:hover':{
      background: 'red',
    }
  },
  threeIcons: {
      color: 'grey',
      fontSize: '27px'
  }
}));

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const history = useHistory()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const RegisteredUser = JSON.parse(localStorage.getItem('Admin'));


  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };


  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
            <ExitToAppIcon />
        </IconButton>
        <p>Settings</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
            <ExitToAppIcon />
        </IconButton>
        <p>Logout</p>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
            <ExitToAppIcon />
        </IconButton>
        <p>Settings</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
            <ExitToAppIcon />
        </IconButton>
        <p>Logout</p>
      </MenuItem>
    </Menu>
  );


  const [ isScrolled , setisScrolled ] = useState(false)

  window.onscroll = () => {
    if(window.pageYOffset === 0){
        setisScrolled(false)
    }else{
      setisScrolled(true)
    }
  }

   const logOut = () => {
     localStorage.removeItem('Admin');
     history.push('/')
   }
  return (
    <div className={classes.grow}  >
      <AppBar position="fixed" className={ isScrolled ? classes.changeNav : classes.navColor}>
        <Toolbar className={isScrolled ?  classes.changeNav : classes.navColor }>


          <img className={classes.title}   alt="Logo" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAmVBMVEX////19fX/ZwD09PT+ZwD+ZgD/ZgD5+fn7+/v29vb+/v78/Pz6+vr4+Pj9/f339/f/XwD/u5j5tJH/tZH0+fv4wqf17Of/5Nb/9vD3/f//39D6r4r/rIH/yK7318j2283/jEv/bgD7mWX9g0H4yrH66uL+rYT/fDT/o3X9cRj/WwD24dT/klf/9ev/fTD8nm37lF//1cD/wqHoKZKLAAATD0lEQVR4nO2dDXubOBKAQZZkG3+Rxm1Kut20zWa79d5dr/v/f9xpJAT6mBHIJglXl6dPRzFmrAGhV5oRQ1GobbMoy3IFJSXLAxSWqrCoVKGCfVv4aK0KayisYN8eSrBvCYUdfDRLVWUxy2r9svAsCxcbX9ei/R3Qteh06e+vFo6uRVytWakqi43aVju1raAEhSUUtlDa2I+2UFjaj7bx17t981NVLNS20wZDCQp7KJjWoQq6BWzho0qfH7Xp83NQhdKcarVt7L75qdItYNe1caPLtv+ujW+99m90da2jtI1pMUtV12GhbQ+OLtseStseWl39XXxQ+9r24FRrhqqK1Wql7unlUt23qrSEDQpbJXcr2NS+ZbAPvq6OCvbtNnNUpQ2fol+2X5+dqmsi/qyq9QwWuhxq20PLoQoKRpdlzQo+2tuv+9iaoapJaFFO18VPrmoCC90ufoaqroP4iK5FoGvh6Fr4ujYDJ/61VRUHtS33altCCQobKGyhtFOFHRS28NEm2qe/voLCCkrzVFUYg2fXAU6ran4Q+0X8y7wYC3IEaMft/gjQnwLMTlVZwPB7C6N1GLcvu4L+KN6HfJT6+hxU9fPD7vw4M7GoX/ZmYkgXP0NVV0v8167WlBZe4tVCsDU/VUVVVcWmXK/V+VGltdp2UFjCR2pftYfCFj46wE4orOCjDeyEwhI+2kGpmKMqfS7MbZlBHrdfRiA2K1VXRfyErsV0J/7FVUGDr6oNtOUVlHSLh8IWSnto8VDYwkfQ4g9QWMFHG/v1JRSWUJqnqpl2gFP2pT8/D6/CwtQIMBUhyBxMvpKqYvuzb4VvcJmeiWUGG+ag6pqIP6tq/YpbZKlKjSW68QIyltjZr48blryeqjN83pnBhtdWdR3EH3G2UroyT/xLq4L7sPTnz/7c+gCFLXy09+fP/twaSuUcVekxzxw7wGlVzQ9iv4j/XHEL7y6+bDD5cqrKYi7hhWdTRa1r0+fO9Fq6BYAPU59O7afULaD1RWrX5d7u0+dua79emR4NVzVqfoisa1uX65Kq1fi4xfE9bO9g8wrUR/n7Nvv18XjUVc4h/obUviZU4RYeHrh83o1//vz45cMfT1WWhfu7z5JxJpjelOBKSC0EvyMsRL1axw8nWxUhhRCmJOAv+IcIMU4I2SqDra5P9eOf9/tmXY70tVU3J7IGp9sC97XFayB2+31xW0tzdqQ+VaSQkWBDQqoTzkGoqwFmnr7ePqlqxKsvolrt982bGg4HPSDU8b2oPzRmZUagqoj6ZX0X39ZGj9C2aMGNEFZA0+Dmp2LBCMG0Iq4Fb4Ws+V9P+pcH1+orC+1xLBT1h2MO8W9r0TZ25p40U1VHnLeJQMha/rk4jiC+stA5jrtCDlq4CCzUl0q3R94J4Qipr60gBSMFVydP3duekPW335vhuIVupeaASKQtLJFryE0nJUyXFQvVWqBf64UIBPNEty9sBtz8J09/GXN6C6NatdcQ30gLib5U9TRw3wip24QvOAgJX4BLZqweEvrStwJtqaqKj0/Hwb60bhERi5rqS1EegoW6w9SdpKmF9P+ylY2F+VXZCWnq4AjBUFF/+/uY5qGyMDo50l7DW4KHpIXsJWihBbNC8t+PQxbGmLC0SFgYRwiUhd15spgYoAUbJRhCC0dI/nBMxS2glfrHdbQILHTGpdGzDPCcQ/NB0cICoesRpCcu2MhbkclvT3uozA6r1XLX3CRocVuhT18UvsHwPIolPkkLGdCCBgMqPExwHxq8/qpmDhHx21qNp4W7rg1nq6GFwYJgqKAx0QqB/0XQwv5VfzkOER/fssc0GC24T4tRmOgFXEWRaqItNN4eUxbStEhbaOFRtl6t2wtoIfNp4R3++Wm9wGsVjNrs1ZP2GuK+NvTZzeZZaSEpWhhRf6/2xBOlTUsLe76kI1RPgz6A6vCQpoULjUtooe81oAV3BA+FPN07PMRo4R1grn+CFhTxhbAICzHxnLQwTfcTFU2pkrTIHNNgtHCFaR9JMLD2L+6JFC1acbo/JsY0FC0oC6mRt2mV3Wg5FjQf9ECDFrbFupjoaQH/1f9qyJE32TDIkbf/56LvSwdpYS7SGGEwIXnLjuGWevo3WqshWuTELfJoIREhux/PpAWI+iZF/O50SFOTjha5xKdoIeuzNylTmOiF/A9poT5RksXQGPZiYJ4onxZaqLv6+2/nbd//+8hPUEWRpAX8SP3vlCcqpoUS/rh0KGtEdUvTov6tgQ0Ck1VX8j8i962ffnzntRwauKkL8keFZY1IeKLUyLvJyBqRokX9pimK81M9NO/egI0WE6hQp/GvI9WX2q+EoutLR2WNaGkhMUxYC2PyjFtesD6++3JK00Kdy68NTXx8O8OLQXiiLrVQyebjUEuV396tcQtpWgx6MXb+uFRK+4PSF10rvSDVQ3HHZYoW6vO/14gqO2qTDi26ucUtXis8a0SVmFsoCy9P9dD8rU8hDY36fo+oStOiyckakaBFfVONDU0nUj0cf6i69tCQpvOXlgGi/jFIC9YJTtEi7cUgaXFTlRMsLzj+WaduxfqPzLhFfmSGpsU0Fq4XXyVNC1F/pCwkaTHOi9GPvGla3FSTLPM5/jjRtODaQmzkTdOCGnmnaCHDuYUgaHFOqoeifJREExXaH3UxLVJZI2BMg9CCu7TodLm0yFlQeHxbY44sI0gLe0xIjBZxrfLjFpcTv7Vw/ZSYYpAWYrRgQ3ELwouB0yIatZ2f6mH9SeK0UHNl1MKFtlDzwRMCBOmJQvMzNK4nKhDKwolSPTS/1TQt3h4RVV7cwnZKlha3RU7WCJIWcrK+VJ3qjzU5xaD70gQt8rwY2r9C0GIKHkKb/VFTtGA0DxO0yI9b9LQQHS3khBbe0VMM0kLqgOExjb/O8balhXQwYayU4bj0glQPdzU1t7AWBqrsqA2lBRVdQ5cxxnEL3gnV06CrHjeI36IxpT2+gLJ5UBMMkhYNsriy6WgRYx8ipOOzRoyhhR2321P9/p83artR2z83SuoS/K/+3eOpHg4PUg7SIpwfOnzwhZ0fnhG3iGmhLQzZ+uVE+RBP9R36CAFYmKAFOaYJhrA9LSaJW0jST/MJPNwmNhEIcbonLLS04DEtSAvTnijEQjJuQdKi97V5BPwULgxyDrlHH09eP8BdRdCitXCCuEWF5WcIacEDWiD5GZpPMg5YmMC9rH8/wrfDVA9DtIizRiRoAX1pTtYIG7cQ5nhuhP4roIUlj7HQBCxkL/SwGCwscB5S4QtLC3yO7zodUFqMWn3J2vsuogVOfGUhGddOWEjSgiI+TYvs1Zf24IgW5DW0vVrnP5HmL9fCRTim0aFHgwlHCPIaxpgQLS0oC9H8DJ4nyr0aupU22IOQcA2JDSzEUj2Ahf295Hc1YGGcNcK0UoIW6j4cnzUCoYUMaRH3pSQtiL70GNLCEXRfOhi3GLv6EubfAS14Mm5B0wIsJHgo/Zh3v6WIj29nxS2kO6lglhY08Q0muAcNTQvKQknTIuGJQg/IX31J04IYlzq0cKBhaHGPpno4Pkh6bkGNSxlJC2pcimZaaD4kaPGmQQ9J0eIePWQDtDATmECYuQXyI0lPFPojVNYI68UYpoWNEDSfpH8ZRPeX6kv15YtSPWgealqwQEh6fogvaBH5cQtYTyC4bJcHtQKabor48BXWCWn/So9puFnF7AuS+FAvrgcKylI9LGxFftyivaXUsb2QdGRGj9rcuF4v6DGNlB7cnL8ScQvnAFdkxy3g0asg7MRa4qO+NmUhcRs6rTTwtd0h/G5FIm5BmEj62tD8DNCXavbC/cRMqM4K1dNg+RmAh9B+zDelcwAHHmKpHlRfqkNjZprP3KdTwOeNZI1QPY0ZwohYqL40I2tE68XoaOEKKm6hR23tSM/v6PwZ8MLj4SAtyoAWPGSh9GgR1qpIeDEYTQvfwn5MgzbTNPFxWrBE3MKxSrp3/JlejBFxi/4auksaOlrAktuUhTgt6LhFjAlLC+oaolkjzLhU04JFtFAWIvkZipgWnQALkVQPu4eeFtKjhTTXMMoaAa1U6opo4dNC3YcZWSMoWtAx4DQtSrwvDWjh9ox03AI/gO5LKR6maEHw0J8guoeQxMeqqkUibkHTIjNuIVpM6CeMwEZLC3pMQ9KCtFDYm4/5tyLtxaBpkRu3MLNvjBb0uNSeUe9pZNW043FpacelJC2ocWn0TXQF7WDWiCpNCyw/Azm30GOaBkv1sNdzCxZ2/oYWHyskDQT4afAD9NwiI2uERwvhC3p+6C+Aa2nBDS2wVxgde1qE0JC9FyOiBYy1hCtcWmTELXxa8F6kiJ+gBeXFkB4tpEeLAiG+SwupF8cbcUbcgqRFwouB0iJJfLJnpOMW+AH0mIbytenxFEoLOm5BbaSvre+cIlrQcQvqnGRnjTCPNnW06KBR3zR2OYW7+iJNi2X8oo3dXtOCkbTAs0YkaJGZNcKcXsEiQfu8fUz0QiR83mNpUSZpofuHl4hbEFsybmEaP0ILKm6BH3BW3IKiBT1qM5jgDi2YoUUqMuPSohOpuIWwY25fZGeNoGkx2hMlxniiKFp8JLJG0LTIzRoxSAskbtHxwRNSkjHgjhbRDUz2pfit3tEiI24hYlpwjxYI8amN5iEbogUSt0jSIoP4BC2QOX5nofRmId1khNNjGknPLcgxTcITlRm3YBQtiNWXHi2kK8ATVZb4eppBT1Q4Lg2+yQ0tePiU7JisEcyjBXPnFtjbMasULe6r4Ov6Z1YPCVq8bfCsEYm5xVlZI3BaYOvabNyC2T6Gu7SI4xbtujaG0yKIW/hZIwIPDUaLMVkjNC3YS9BCULSg4hYoLYaeRogtRGnB6PWliCeqvaAj4hYmc4AVmhbJtRgoLXKzRtC0IH1t1H3ILo1b+FkjaE9UZtaIBC2wF4RXBC2kpkWFvTx8m6RFg2eNMHzgGC0ys0acRQvHhewInBYj4xYULfrVOkO0IMc0zNDCTHstLVgybkFs6biF+YojRsQtGEoLrFYJCwc9UYiFYVCo/WvAi4HTgn6ihAfRX0uLXC9GSwsHE4EnCvFiJDxR5OpLv/O3QpIjb/wAoEVu1ogULUbGLewlTMUtZIoWWNyCOiA/bpGiBUV8aptv3AKnBT3Hb2kRQSM/bpFYi+HSwoVGdtaIsZ6ohXsNCVooC4sCjVsIbq5ChieKU7TIzhrBOlp40JD1TROnc1DD/qQnaruxX9/2HK+sJyoMdZi4BZ41gjhAexPPyRqRilsE+RkoWkhGeTGOPS3gsrmC7kuZwUQssrNGDNIC4SEsHhGaD0y6Ih23SNJidNyCfhqBJP6QJyq2kI5yD41pYmiknyFFDhjhxQiia3At0I6ZyhoxFLdAo2uhciRuEUbXBuIWGVkjhG6j6NwCyxqRpsU2yBqhf2bv0EJGtKjwrBEYLXgbt8jLGpFJi8VFtBDPRIukFyOmhbS0mDxugXT+6bgFToszskbIvLhFhIlWpCx0McFcWtCrLyVBi9zVly4tPJHwYji08AQ58k7Qghp503OL3KwRWbQoz6cF0flPQYuBrBEtLfy5he5pUqsv8e014hbDXowL4hYxLRJxC0HQIh23wGhxTj7vCT1RxApa0Y9FRSc8T1QZEJ+mRXbWCEbRAs8aMeCJwrJGLB+6xX4xLaisETQtcrNG9C9M6V8qorcT0Zc+1pLaTqRH2HuJifvOkRPRl56Ql5+Y96dkejHuObWxz3d7jIfHf9rzAVfbCG6EkI/vSpSH7x8F8Svy2xPGw9XDZ3gtDHTB3ftcdEJYSPz6cMh6Z9eafN3Phng71oF6O9D7d4s19aKt9/HPmNIeT0BxWJAvITocsVrR7+zadjtL+zsHWy3/7Vh+HKt/+5NZXm17z6JAomt6jcS6NDmV1m21lnFn0dVquSidNzy1tVqbWm2oWj3bu7LmogqPcjvrWKZ7EfMrqaLySv/0b+l87WpNaSHqa3v1l9pPqArPGuE8yRGmeuie1ojyM8CT7/NTRWWNSL8t0u2Xh1/S9LqqSOL/jG/pTOhaTHfiX1wVkTUCfed195DkuNdnz0XVTDvAKfvSn5+HV2FhagQYBRvOH0y+kio8a8TPtBW+wWWZTAXoeOouexHzy6m6JuLPqlrPYGHk1ZrBS+2nUpUaS2CpHuxYAsnPME9VBA/p9MYxedwufoaqroP4I85WSlfmiX9pVXjWCGduHaZ66ObPUX4G7cOcnSoqa8Srd4DTqpofxH4R/zwvxvAI0LuLLxtMvpwqImvE/3ekYkzWCPQVRuMndbNSdbXEf+1qTWnhPB1kE6rCs0Z4Sybol3Ag7+yYn6rCGOz0y86Lts51VM9J1VURf7pqzUoVlTXi/GrNTRWRNeLVO8Ap+9Kfn4dXYeF5K1esrgkWwTyrKjxrRPSizZ2zb4ntg9JujqqorBGJVxiR69pCTM9D1TURf1bVesa4RZef4XIH2WxUoVkj2kc9sVQP/mOg2AOoM1OFZ40g++VqoIufoarrIP4Mq/XLwgxV/wOIkHj73XhrMAAAAABJRU5ErkJggg==" />
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>

            <img
                className={classes.title}
                style={{width:"50px" , height: '50px' , borderRadius: '50%'}}
                alt="Admin Cover"
                src={RegisteredUser?.myResult?.adminPhoto || 'data:image/png;base64,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'} />
             <IconButton aria-label="show 17 new notifications" color="inherit" onClick={logOut}>
                <ExitToAppIcon  className={classes.threeIcons}/>
                <p style={{color:'crimson' }} >Logout</p>
            </IconButton>

          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
