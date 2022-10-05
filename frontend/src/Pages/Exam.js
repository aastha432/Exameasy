import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Webcam from "react-webcam";
import Button from '@material-ui/core/Button';
import Question from '../Components/Question';



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

const Exam = () => {
    const classes = useStyles();
    const navigate = useNavigate();

    const submitHandler = () => {
      navigate("/result");
    }
    return(
        <div>
            <Navbar/>
            <Container maxWidth="xs" className={classes.contentBox}>
                <Typography variant="h5" component="h3" align="center" gutterBottom={true}>Exam page</Typography>
                <Grid item xs={12}>
                    <Webcam
                        audio={true}
                        height={100}
                        screenshotFormat="image/jpeg"
                        width={100}
                        mirrored = {true}
                        videoConstraints={{width : 500, height: 500,facingMode: "user"}}
                    />
                </Grid>

              <Grid item xs={12}>
                < Question/>
              </Grid>
              <Grid item xs={12}>
                < Question/>
              </Grid>
              <Grid item xs={12}>
                < Question/>
              </Grid>
              <Grid item xs={12}>
                < Question/>
              </Grid>

              <Button type="submit" variant="contained" color="primary" size="large" className={classes.primaryAction}
               onClick = {()=> submitHandler()}>
                  Submit
                </Button>
            </Container> 
            
        </div>
    )
}

export default Exam;