import React from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import { Link, Navigate } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '../firebase';
import { logout } from '../firebase';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position : "sticky",
    marginTop : 0,
    backgroundColor : "primary.dark"
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color : "#99ccff"
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = () => {

    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    const classes = useStyles();

  return (
      <AppBar className={classes.root}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
           onClick={()=> navigate("/")}>
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
          </Typography>
         
          {!user ? <Button type="submit" color="inherit"
            onClick={()=> navigate("/signup")}>
              Sign up
          </Button> : null}
          {!user ? <Button type="submit" color="inherit"
            onClick={()=> navigate("/signin")}>
              Sign in
          </Button> : null}
          {user ? <Button type="submit" color="inherit"
            onClick={logout}>
              Sign out
          </Button> : null}
        </Toolbar>
      </AppBar>
  );
}

export default Navbar;