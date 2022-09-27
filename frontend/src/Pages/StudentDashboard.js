import Navbar from '../Components/Navbar';
import {React , useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { logout } from '../firebase';
import { makeStyles } from '@material-ui/core/styles';
import { auth } from '../firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  actions: {
    [theme.breakpoints.up('sm')]: {
      display: 'flex'
    }
  },
  primaryAction: {
    width: '100%',
    marginTop: theme.spacing(2),
    justifyContent : 'center',
  },
  contentBox : {
    marginTop : 100
  }
}));

const StudentDashboard = () => {

  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (!user) {
      navigate("/");
    }
  }, [user, loading]);

  const classes = useStyles();

  return (
   <div >
    <Navbar/>
    <Container maxWidth="xs" className={classes.contentBox}>
        <Typography variant="h5" component="h3" align="center" gutterBottom={true}>Student Dashboard</Typography>
        <Button type="submit" variant="contained" color="error" size="large" className={classes.primaryAction}
          onClick={logout}>
            Sign Out
        </Button>
    </Container>
    
    </div>
  );
}

export default StudentDashboard;