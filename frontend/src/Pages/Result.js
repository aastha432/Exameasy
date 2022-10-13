
import { useNavigate } from 'react-router-dom';
import {React , useState, useEffect, useCallback, useRef} from 'react';
import Navbar from '../Components/Navbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '../firebase';



const useStyles = makeStyles((theme) => ({
    button: {
      width: '30%',
      marginTop: theme.spacing(2),
    },
    contentBox : {
      marginTop : 100,
    },
    malpracticeDetected : {
      color : "red",
      fontWeight : "bold",
    },
    malpracticeNotDetected : {
      color : "green",
      fontWeight : "bold",
    },
    bold : {
      fontWeight : "bold",
    }
  }));

const Result = () => {

    const [user, loading, error] = useAuthState(auth);
    const classes = useStyles();
    const navigate = useNavigate();
    const [exam, setExam] = useState("AZ-900"); // should come from DB
    const [marks, setMarks] = useState("750"); // should come from DB
    const [malpracticeDetected, setMalpracticeDetected] = useState(true); // will be handled by MPDS

    const submitHandler = () => {
        navigate("/studentdashboard");
      }


    return(
        <div>
          { !malpracticeDetected ? 
          <div>
            <Navbar/>
            <Container className={classes.contentBox}> 
              <Grid container spacing={2} justifyContent='center'>
                <Grid item xs={12}>
                  <Typography variant="h5" component="h3" align="center" gutterBottom={true} className={classes.malpracticeNotDetected}>
                    Thank you for appearing. Here is your result !</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h5" component="h3" align="center" gutterBottom={true}>
                    Name : {user.displayName ? user.displayName : " "}</Typography>
                </Grid>
                <Grid item xs={12}>
                 <Typography variant="h5" component="h3" align="center" gutterBottom={true}>Exam : {exam}</Typography>
                </Grid>
                <Grid item xs={12}>
                 <Typography variant="h5" component="h3" align="center" gutterBottom={true}>Marks : {marks}/1000</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography align='center'>
                    <Button type="submit" variant="contained" color="primary" size="large" className={classes.button}
                        onClick = {()=> submitHandler()}>
                      Go to Profile
                    </Button>
                  </Typography>
                </Grid>
              </Grid>  
            </Container> 
          </div> :
          <div>
          <Navbar/>
          <Container className={classes.contentBox}> 
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h5" component="h3" align="center" gutterBottom={true} className={classes.bold}>
                  You have been caught for malpractice !</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h5" component="h3" align="center" gutterBottom={true}>
                  Name : {user.displayName ? user.displayName : " "}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h5" component="h3" align="center" gutterBottom={true}>Exam : AZ-900</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h5" component="h3" align="center" gutterBottom={true} className={classes.malpracticeDetected}
                > Your exam has been terminated.</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography align='center'>
                  <Button type="submit" variant="contained" color="primary" size="large" className={classes.button}
                      onClick = {()=> submitHandler()}>
                    Go to Profile
                  </Button>
                </Typography>
              </Grid>
            </Grid>  
          </Container> 
        </div> }
        </div>
    )
}

export default Result;