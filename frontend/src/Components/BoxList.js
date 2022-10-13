import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@mui/material/Box';
import { makeStyles } from '@material-ui/core/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';

const useStyles = makeStyles((theme) => ({
    box : {
      //width: '100%',
      width : 600,
      height: 300,
      borderRadius : 10,
    },
    boxHeader : {
      backgroundColor: "#5d85d5",
      height : 30,
    },
    boxContent : {
        //backgroundColor : "red"
    }
  }));

const BoxList = ({heading, items}) => {
    const classes = useStyles();
    return (
    <List
      sx={{
        position: 'relative',
        bgcolor : "#d9d9f2", // can be overwritten
        overflow: 'auto',
      }}
      className = {classes.box}
      subheader={<li />}
    >
        <ListSubheader className={classes.boxHeader}><Typography align='center'>{heading}</Typography></ListSubheader>
        <div className={classes.boxContent}>
            {items.map((item) => (
                <ListItem >
                    <ListItemText primary={item} />
                </ListItem>
            ))} 
        </div>
        
    </List>
    )
}

export default BoxList;