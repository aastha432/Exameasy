
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';


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
    const classes = useStyles();
    const navigate = useNavigate();

    const submitHandler = () => {
      navigate("/studentdashboard");
    }
    return(
        <div>
            <Navbar/>
            <Container maxWidth="xs" className={classes.contentBox}>
                <Typography variant="h5" component="h3" align="center" gutterBottom={true}>Result page</Typography>
            </Container> 
            
        </div>
    )
}

export default Result;