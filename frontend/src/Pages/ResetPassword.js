import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, sendPasswordReset } from "../firebase";
import "./ResetPassword.css";
import { makeStyles } from '@material-ui/core/styles';
import Navbar from "../Components/Navbar";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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



const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const classes = useStyles();
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
  }, [user, loading]);
  return (

    <div>
      <Navbar/>
      <Container maxWidth="xs" className={classes.contentBox}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField variant="outlined" required fullWidth size="small" name="email" label="E-mail address" 
            value={email} onChange={(e) => setEmail(e.target.value)} />
          </Grid>
          <Button type="submit" variant="contained" color="error" size="large" className={classes.primaryAction}
             onClick={() => sendPasswordReset(email)}>
              Send password reset email
          </Button>
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
export default ResetPassword;