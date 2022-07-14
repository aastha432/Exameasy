import Navbar from '../Components/Navbar';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
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

const Signin = (props) => {

  const classes = useStyles();


  return (
   <div >
    <Navbar/>
      <Container maxWidth="xs" className={classes.contentBox}>
          
          <Typography variant="h5" component="h3" align="center" gutterBottom={true}>Sign in</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField variant="outlined" required fullWidth size="small" name="email" label="E-mail address" />
                </Grid>
                <Grid item xs={12}>
                  <TextField variant="outlined" required fullWidth size="small" type="password" name="password" label="Password" />
                </Grid>
                <Grid item xs={12}>
                  <Box alignItems="center" justifyContent="space-between" className={classes.actions}>
                    <Link href="#" color="textSecondary">Forgot your password?</Link>
                  </Box>
                    <Button type="submit" variant="contained" color="error" size="large" className={classes.primaryAction}>
                      Continue with Google
                    </Button>
                    <Button type="submit" variant="contained" color="primary" size="large" className={classes.primaryAction}>
                      Sign in
                    </Button>
                </Grid>
            </Grid>

      </Container>
    </div>
  );
}

export default Signin;