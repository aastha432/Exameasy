import Navbar from '../Components/Navbar';
import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../firebase";

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

const Signup = (props) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password);
  };

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/studentdashboard");
  }, [user, loading]);

  const classes = useStyles();

  return (
    <div >
    <Navbar/>
      <Container maxWidth="xs" className={classes.contentBox}>
          
          <Typography variant="h5" component="h3" align="center" gutterBottom={true}>Sign up</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField variant="outlined" required fullWidth size="small" name="name" label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                  <TextField variant="outlined" required fullWidth size="small" name="email" label="E-mail address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}/>
                </Grid>
                <Grid item xs={12}>
                  <TextField variant="outlined" required fullWidth size="small" type="password" name="password" label="New password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}/>
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="error" size="large" className={classes.primaryAction}
                    onClick={signInWithGoogle}>
                      Continue with Google
                    </Button>
                    <Button type="submit" variant="contained" color="primary" size="large" className={classes.primaryAction}
                    onClick={register}>
                      Sign up
                    </Button>
                </Grid>
                <Grid item xs={12}>
                  <Box alignItems="center" justifyContent="space-between" className={classes.actions}>
                      <Link href="/signin" color="textSecondary">Already have an account ?</Link>
                    </Box>
                </Grid>
            </Grid>

      </Container>
    </div>
  );
}

export default Signup;