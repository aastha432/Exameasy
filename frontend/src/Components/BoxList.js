import React, {useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@mui/material/Box';
import { makeStyles } from '@material-ui/core/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Button from '@material-ui/core/Button';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Grid from '@material-ui/core/Grid';
import transitions from '@material-ui/core/styles/transitions';


const useStyles = makeStyles((theme) => ({
    primaryAction: {
        width: '10%',
        justifyContent : 'center',
      },
    box : {
      //width: '100%',
      width : 600,
      height: 300,
      borderRadius : 10,
    },
    box1 : {
        width: 1100,
        height: '100%',
        maxHeight : 300,
        borderRadius : 10,
    },
    boxHeader : {
      backgroundColor: "#5d85d5",
      height : 30,
    },
    boxContent : {
        //backgroundColor : "red"
    },
    imageList : {
        marginRight : 30,
        marginLeft : 30,
    },
    imageHovered: {
        transform: "scale3d(1.05, 1.05, 1)",
    },
    image : {
        //
    },
    terminateButton: {
        width : 100,
        height : 30,
        marginTop: 7,
        backgroundColor : "#ff3333",
        marginLeft : 50,
        color : "white"
      },
  }));

export const BoxList = ({heading, items}) => {
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

export const BoxList1 = ({heading, items}) => {

    // const [hovered, setHovered] = useState({});
    // items.forEach((item) => {
    //     setHovered(...hovered, hovered.push(item : false));
    // }) lets do tomorrow
    const [hovered, setHovered] = useState(false);
    const classes = useStyles();

    return (
    <List
      sx={{
        position: 'relative',
        bgcolor : "#d9d9f2", // can be overwritten
        overflow: 'auto',
      }}
      className = {classes.box1}
      subheader={<li />}
    >
        <ListSubheader className={classes.boxHeader}><Typography align='center'>{heading}</Typography></ListSubheader>
        <div className={classes.boxContent}>
            {items.map((item) => (
                <ListItem >
                    <ListItemText primary={item.name} />
                    <ListItemText primary={item.email} />
                    <ListItemText primary={item.exam} />
                    <ImageList sx={{ width: 100, height: 50 }}  className={classes.imageList}>
                        <ImageListItem className={hovered ? classes.imageHovered : classes.image}
                        onMouseOver={()=>setHovered(true )}
                        onMouseOut={()=>setHovered(false)}
                         >
                        <img
                            src={item.studentImageURL}
                            srcSet={item.img}
                            alt={"studentImageURL"}
                            loading="lazy"
                        />
                        </ImageListItem>
                        <ImageListItem className={classes.image}>
                        <img
                            src={item.govIDURL}
                            srcSet={item.img}
                            alt={"govIDURL"}
                            loading="lazy"
                        />
                        </ImageListItem>
                    </ImageList>
                    {item.verify ? 
                        <Button type="submit" variant="contained" size="small" className={classes.primaryAction} disabled>
                            Verify
                        </Button>
                    :
                        <Button type="submit" variant="contained" size="small" className={classes.primaryAction}>
                            Verify
                        </Button>
                    }
                    
                </ListItem>
            ))} 
        </div>
        
    </List>
    )
}

export const BoxList2 = () => {

    const classes = useStyles();

    return (
        <Grid item >
            <Box
              sx={{
                width: 200,
                height: 200,
                backgroundColor: 'primary.dark',
                '&:hover': {
                  backgroundColor: 'primary.main',
                  opacity: [0.9, 0.8, 0.7],
                },
              }}
            >
                <Box sx={{width:200, height:150, backgroundColor: "#d9d9f2"}}/>
                <Button variant="contained" className={classes.terminateButton}>TERMINATE</Button>
            </Box>
        </Grid>
    )
}

export const BoxList3 = ({heading,items}) => {
    const [hovered, setHovered] = useState(false);
    const classes = useStyles();

    return (
    <List
      sx={{
        position: 'relative',
        bgcolor : "#d9d9f2", // can be overwritten
        overflow: 'auto',
      }}
      className = {classes.box1}
      subheader={<li />}
    >
        <ListSubheader className={classes.boxHeader}><Typography align='center'>{heading}</Typography></ListSubheader>
        <div className={classes.boxContent}>
            {items.map((item) => (
                <ListItem >
                    <ImageList sx={{ width: 100, height: 50 }}  className={classes.imageList}>
                        <ImageListItem className={hovered ? classes.imageHovered : classes.image}
                        onMouseOver={()=>setHovered(true )}
                        onMouseOut={()=>setHovered(false)}
                         >
                        <img
                            src={item.image}
                            srcSet={item.img}
                            alt={"studentImageURL"}
                            loading="lazy"
                        />
                        </ImageListItem>
                    </ImageList>
                    <ListItemText primary={item.malpracitce} />
                    <ListItemText primary={item.email} />
                    {item.terminateExam ? 
                        <Button type="submit" variant="contained" size="small" className={classes.terminateButton} disabled>
                            TERMINATE
                        </Button>
                    :
                        <Button type="submit" variant="contained" size="small" className={classes.terminateButton}>
                            TERMINATE
                        </Button>
                    }
                    
                </ListItem>
            ))} 
        </div>
        
    </List>
    )
}
