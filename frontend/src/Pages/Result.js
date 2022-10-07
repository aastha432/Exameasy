
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
    actions: {
      [theme.breakpoints.up('sm')]: {
        display: 'flex'
      }
    },
    primaryAction: {
      width: '100%',
      marginTop: theme.spacing(2),
    },
    contentBox : {
      marginTop : 100
    }
  }));

const Result = () => {

    const [user, loading, error] = useAuthState(auth);
    const classes = useStyles();
    const navigate = useNavigate();

    const submitHandler = () => {
        navigate("/studentdashboard");
      }


    return(
        <div>
            <Navbar/>
            <Container maxWidth="xs" className={classes.contentBox}>
                <Typography variant="h5" component="h3" align="center" gutterBottom={true}>Result</Typography>
                <Typography variant="h5" component="h3" align="center" gutterBottom={true}>Name : {user.displayName}</Typography>
                <Typography variant="h5" component="h3" align="center" gutterBottom={true}>Exam : AZ-900</Typography>
                <Typography variant="h5" component="h3" align="center" gutterBottom={true}>Marks : 784/1000</Typography>
                <Button type="submit" variant="contained" color="primary" size="large" className={classes.primaryAction}
                    onClick = {()=> submitHandler()}>
                  Go to Profile
                </Button>
                <Typography variant="h5" component="h3" align="center" gutterBottom={true}>The result will be emailed to you considering the logs of MPDS</Typography>
            </Container> 
            
        </div>
    )
}

export default Result;