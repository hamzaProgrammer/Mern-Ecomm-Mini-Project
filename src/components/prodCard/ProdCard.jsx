import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import StarsIcon from '@mui/icons-material/Stars';

export default function MediaCard(myprod) {
  return (
    <Card sx={{ maxWidth: 260 }} style={{marginBottom: '40px' , boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'}} >
      <CardMedia
        component="img"
        height="140"
        image={myprod?.item?.image}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom style={{fontSize: '17px' , fontWeight: 600}} component="div">
          {myprod?.item?.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" style={{marginleft: '-15px' }} >
          <Button variant="fab" color="primary" aria-label="Add" style={{color: 'orange'}}>
            <StarsIcon  />
            <StarsIcon  />
            <StarsIcon  />
          </Button>
            <b>4.5</b>(12 Reviews)
        </Typography>
        <Typography gutterBottom style={{fontSize: '18px' , fontWeight: 700 , paddingLeft: '70px' , paddingTop: '15px' , marginBottom : '-15px'}} component="h6">
         $ {myprod?.item?.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained" style={{marginLeft: '60px' , marginBottom : '10px' , marginTop: '10px' , backgroundColor: '#e17055' , fontWeight: 700}} >View Details</Button>
      </CardActions>
    </Card>
  );
}
