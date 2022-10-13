import Navbar from '../Components/Navbar';
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { auth } from '../firebase';
import { useAuthState, useUpdateProfile } from "react-firebase-hooks/auth";
import TextField from '@material-ui/core/TextField';
import Avatar from '@mui/material/Avatar';
import { Container } from '@material-ui/core';
import Button from '@material-ui/core/Button';



const useStyles = makeStyles((theme) => ({
  
  primaryAction: {
    width: '100%',
    justifyContent : 'center',
  },
  container : {
    marginTop : 30,
  },
  boxGrid : {
    marginTop : 50,
    flexDirection : "row",
  },
  box : {
    width: '100%',
    height: 300,
    backgroundColor: "#aec2ea",
    borderRadius : 10,
    overflow : "auto"
  },
  boxHeader : {
    backgroundColor: "#5d85d5",
    height : 30,
    borderRadius : 10,
  },
}));

const ProctorDashboard = () => {

  // profile
  const [user, loading, error] = useAuthState(auth);
  const [displayName, setDisplayName] = useState(user ? user.displayName : " ");
  const [photoURL, setPhotoURL] = useState(user ? user.photoURL : " ");
  const [email, setEmail] = useState(user ? user.email : ' ');
  const [exam, setExam] = useState("AZ-900");
  const [updateProfile, updating] = useUpdateProfile(auth);
  // should come from DB

  const classes = useStyles();
  const navigate = useNavigate();


  // useEffect(() => {
  //   if (!user) {
  //     navigate("/signin");
  //   }
  // }, [user, loading]);


  return (
   <div >
    <Navbar/>
    <Container  className={classes.container}>
        <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Avatar alt="Profile photo" src={photoURL} height = {100} width = {100} />
            </Grid>
            <Grid item >
              <TextField variant="outlined" required size="small" name="Name" label="Name" 
              value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <Typography  component="h3" align="center">Email : {email}</Typography>
            </Grid>
            <Grid>
                <Button type="submit" variant="contained" color="error" size="large" className={classes.primaryAction}
                onClick={async () => {
                  await updateProfile({ displayName});
                  alert('Updated profile');
                }}>
                  Update Profile
              </Button>
            </Grid>
        </Grid>


    </Container>
    </div>
  );
}

export default ProctorDashboard;