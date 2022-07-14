import Navbar from '../Components/Navbar';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
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

const Signup = (props) => {

  const classes = useStyles();

  return (
    <div >
    <Navbar/>
      <Container maxWidth="xs" className={classes.contentBox}>
          
          <Typography variant="h5" component="h3" align="center" gutterBottom={true}>Sign up</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField variant="outlined" required fullWidth size="small" name="name" label="First name" />
                </Grid>
                <Grid item xs={12}>
                  <TextField variant="outlined" required fullWidth size="small" name="name" label="Last name" />
                </Grid>
                <Grid item xs={12}>
                  <TextField variant="outlined" required fullWidth size="small" name="email" label="E-mail address" />
                </Grid>
                <Grid item xs={12}>
                  <TextField variant="outlined" required fullWidth size="small" type="password" name="password" label="New password" />
                </Grid>
                <Grid item xs={12}>
                  <TextField variant="outlined" required fullWidth size="small" type="password" name="password" label="Re-enter new password" />
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="error" size="large" className={classes.primaryAction}>
                      Continue with Google
                    </Button>
                    <Button type="submit" variant="contained" color="primary" size="large" className={classes.primaryAction}>
                      Sign up
                    </Button>
                </Grid>
            </Grid>

      </Container>
    </div>
  );
}

export default Signup;