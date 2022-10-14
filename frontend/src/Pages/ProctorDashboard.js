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
import { Container, ListSubheader } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { BoxList1, BoxList2 } from '../Components/BoxList';
import Box from '@mui/material/Box';




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
    height : 30,
    marginTop : 50,
    marginBottom : 0,
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

  /* student allocated details 
  Should come from DB */
  const [studentDetails, setStudentDetails] = useState([
    {
      "name" : "Aastha Sarkar",
      "email" : "aasthasarkar13gul@gmail.com",
      "exam" : "AZ-900",
      "studentImageURL" : "https://tse1.mm.bing.net/th/id/OIP.U0eJqMMa4V_0H3n3A6TZkwHaEV?pid=ImgDet&rs=1",
      "govIDURL" : "https://tse1.mm.bing.net/th/id/OIP.U0eJqMMa4V_0H3n3A6TZkwHaEV?pid=ImgDet&rs=1",
      "verify" : true
    },
    {
      "name" : "Aastha Sarkar",
      "email" : "aasthasarkar13gul@gmail.com",
      "exam" : "AZ-900",
      "studentImageURL" : "https://static01.nyt.com/images/2011/01/14/arts/14MOVING-span/MOVING-jumbo.jpg",
      "govIDURL" : "https://static01.nyt.com/images/2011/01/14/arts/14MOVING-span/MOVING-jumbo.jpg",
      "verify" : false
    },
    {
      "name" : "Aastha Sarkar",
      "email" : "aasthasarkar13gul@gmail.com",
      "exam" : "AZ-900",
      "studentImageURL" : "https://tse4.mm.bing.net/th/id/OIP.9odqTO7q2qwzItvYWVEi0QHaF7?pid=ImgDet&rs=1",
      "govIDURL" : "https://tse4.mm.bing.net/th/id/OIP.9odqTO7q2qwzItvYWVEi0QHaF7?pid=ImgDet&rs=1",
      "verify" : true
    },
    {
      "name" : "Aastha Sarkar",
      "email" : "aasthasarkar13gul@gmail.com",
      "exam" : "AZ-900",
      "studentImageURL" : "https://tse4.mm.bing.net/th/id/OIP.9odqTO7q2qwzItvYWVEi0QHaF7?pid=ImgDet&rs=1",
      "govIDURL" : "https://tse4.mm.bing.net/th/id/OIP.9odqTO7q2qwzItvYWVEi0QHaF7?pid=ImgDet&rs=1",
      "verify" : true
    },
    {
      "name" : "Aastha Sarkar",
      "email" : "aasthasarkar13gul@gmail.com",
      "exam" : "AZ-900",
      "studentImageURL" : "https://tse4.mm.bing.net/th/id/OIP.9odqTO7q2qwzItvYWVEi0QHaF7?pid=ImgDet&rs=1",
      "govIDURL" : "https://tse4.mm.bing.net/th/id/OIP.9odqTO7q2qwzItvYWVEi0QHaF7?pid=ImgDet&rs=1",
      "verify" : true
    },
    {
      "name" : "Aastha Sarkar",
      "email" : "aasthasarkar13gul@gmail.com",
      "exam" : "AZ-900",
      "studentImageURL" : "https://tse4.mm.bing.net/th/id/OIP.9odqTO7q2qwzItvYWVEi0QHaF7?pid=ImgDet&rs=1",
      "govIDURL" : "https://tse4.mm.bing.net/th/id/OIP.9odqTO7q2qwzItvYWVEi0QHaF7?pid=ImgDet&rs=1",
      "verify" : true
    }
  ])

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

        <Grid container spacing={2} justifyContent="center" className={classes.boxGrid}>
          <Grid item>
            <BoxList1 heading={"DETAILS OF STUDENTS ALLOCATED"} items={studentDetails}/>
          </Grid>
        </Grid>

        
        <ListSubheader className={classes.boxHeader}><Typography align='center'>{"VIDEO STREAMS OF STUDENTS"}</Typography></ListSubheader>
         <Grid container spacing={1} justifyContent="center" >
           {
            [1,2,3,4,5,6,7,8].map((n) => {
              return (
                <BoxList2 />
              )
            })
          }
        </Grid>


    </Container>
    </div>
  );
}

export default ProctorDashboard;