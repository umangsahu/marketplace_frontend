import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Cookies from 'js-cookies'
// import { navigate } from "react-router-dom"



// TODO remove, this demo shouldn't need to reset the theme.


export default function SignIn(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const Data={
      email: data.get('email'),
      password: data.get('password'),
    }

    sendUserData(Data);
  
  };


  const sendUserData= async(data)=>{
  
    const res= await fetch(`${process.env.REACT_APP_API_URL}/auth/login`,{
      method:"POST",
      body:JSON.stringify(data),
      headers:{
           "content-type":"application/json"
      }
    })

  const response= await res.json();

  
     
      window.alert(response.message);
      
      if(response.token){
        Cookies.setItem('token',response.token,{sameSite: 'None', secure: true});
        // navigate(`/`)
      }
  }
  return (
  
      <Container component="main" maxWidth="xs" sx={{display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}} >
        <CssBaseline />
      
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",width:"400px"}}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link  onClick={()=>{props.tabChange(1)}}  sx={{cursor:'pointer'}}>
                  Don't have account? Signup
                </Link>
              </Grid>
            </Grid>
          </Box>
        
        
      </Container>
      
  );
}