import React from 'react';
import Navbar from '../Components/Navbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Webcam from "react-webcam";


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
    return(
        <div>
            <Navbar/>
            <Container maxWidth="xs" className={classes.contentBox}>
                <Typography variant="h5" component="h3" align="center" gutterBottom={true}>Exam page</Typography>
                <Grid item xs={12}>
                    <Webcam
                        audio={true}
                        height={500}
                        screenshotFormat="image/jpeg"
                        width={500}
                        mirrored = {true}
                        videoConstraints={{width : 500, height: 500,facingMode: "user"}}
                    />
                </Grid>
            </Container>
        </div>
    )
}

export default Exam;