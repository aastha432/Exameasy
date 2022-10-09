import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import { Link } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '../firebase';
import { logout } from '../firebase';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position : "sticky",
    marginTop : 0,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = () => {

    const [user, loading, error] = useAuthState(auth);
    const classes = useStyles();

  return (
      <AppBar className={classes.root}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
           <Link to="/"><HomeIcon /></Link>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
          </Typography>
          {!user ? <Button color="inherit"><Link to="/signin">Sign in</Link></Button> : null}
          {!user ? <Button color="inherit"><Link to="/signup">Sign up</Link></Button> : null}
          {user ? <Button type="submit" color="inherit"
            onClick={logout}>
              Sign out
          </Button> : null}
        </Toolbar>
      </AppBar>
  );
}

export default Navbar;