import Navbar from '../Components/Navbar';
import {React , useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

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

const Signin = (props) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const classes = useStyles();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) {
      //TODO
      navigate("/studentdashboard");
    }
  }, [user, loading]);

  return (
   <div >
    <Navbar/>
      <Container maxWidth="xs" className={classes.contentBox}>
          
          <Typography variant="h5" component="h3" align="center" gutterBottom={true}>Sign in</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField variant="outlined" required fullWidth size="small" name="email" label="E-mail address" 
                  value={email} onChange={(e) => setEmail(e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                  <TextField variant="outlined" required fullWidth size="small" type="password" name="password" label="Password" 
                  value={password} onChange={(e) => setPassword(e.target.value)}/>
                </Grid>
                <Grid item xs={12}>
                  <Box alignItems="center" justifyContent="space-between" className={classes.actions}>
                    <Link href="/reset" color="textSecondary">Forgot your password?</Link>
                  </Box>
                    <Button type="submit" variant="contained" color="error" size="large" className={classes.primaryAction}
                    onClick={signInWithGoogle}>
                      Continue with Google
                    </Button>
                    <Button type="submit" variant="contained" color="primary" size="large" className={classes.primaryAction}
                    onClick={() => logInWithEmailAndPassword(email, password)}>
                      Sign in
                    </Button>
                </Grid>
                <Grid item xs={12}>
                  <Box alignItems="center" justifyContent="space-between" className={classes.actions}>
                      <Link href="/signup" color="textSecondary">Are you a new user ?</Link>
                    </Box>
                </Grid>
            </Grid>

      </Container>
    </div>
  );
}

export default Signin;