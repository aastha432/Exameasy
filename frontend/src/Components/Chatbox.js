import React, {useState, useEffect} from 'react';
import Badge from '@mui/material/Badge';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MailIcon from '@mui/icons-material/Mail';
import Typography from '@material-ui/core/Typography';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import { Paper } from '@material-ui/core';
import Box from '@mui/material/Box';
import CancelIcon from '@mui/icons-material/Cancel';
import Grid from '@material-ui/core/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';



const useStyles = makeStyles((theme) => ({
    chatButton : {
        width : 100,
        height : 30,
        marginTop: 7,
        marginLeft : 50,
        color : "white"
    },
    chatBox : {
        width : 360,
        height : 320,
        paddingLeft : 5,
        paddingRight : 5,
        zIndex : 100, //
    },
    chatBoxHeader : {
        width : "100%",
        height : 25,
        backgroundColor : "#40bf80",
        color : "white",
    },
    chatBoxContent : {
        width : 360,
        height : 250,
    },
    chatBoxMessage : {
        minWidth : 100,
        width : '100%',
        maxWidth : 360, // check once
        backgroundColor : "#9999ff",
        marginTop : 5,
        borderRadius : 20,
    },
    chatBoxTypeArea : {
        width : 360,
        height : 10,
        marginTop : 5,
    }
}))


const Chatbox = ({user}) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState(user.messages);
    const [text, setText] = useState('');

    const id = (open && Boolean(anchorEl)) ? 'transition-popper' : undefined;

    const classes = useStyles();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen(!open);
    };

    const addMessage = () => {
        console.log("addMessage hit");
        setText('');
        setMessages(...messages,messages.push({
            "id" : messages.length + 1,
            "isProctor" : true,
            "message" : text
        }));
    }
    

    return (
        <div>
            <Button type="submit" variant="contained" size="small" className={classes.chatButton}
             onClick={(e)=>handleClick(e)}>
                <Badge badgeContent={user.chat} color="primary" overlap='rectangular'>
                    <MailIcon color="action" />
                </Badge>
             </Button>
            <Popper id={id} open={open} anchorEl={anchorEl} placement='right-start' transition>
                    {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                        <Paper className={classes.chatBox}>
                            <Grid container className={classes.chatBoxHeader}>
                                <Grid item xs={11}>
                                    <Typography align='center'>{user.name}</Typography>
                                </Grid>
                                <Grid item>
                                    <CancelIcon onClick={(e)=>handleClick(e)} />
                                </Grid>
                            </Grid>
                            
                            <List
                                sx={{
                                    position: 'relative',
                                    overflow: 'auto',
                                }}
                                className = {classes.chatBoxContent}
                                subheader={<li />}
                                >
                                    {messages.map((msg) => (
                                        <Grid container>
                                            {msg.isProctor ? <Grid item xs={4}></Grid> : null}
                                            <Grid item xs={8} >
                                                <Paper className = {classes.chatBoxMessage}>
                                                <ListItem>
                                                    {msg.isProctor ? <ListItemText align='right' primary={msg.message} />
                                                        : <ListItemText align='left' primary={msg.message} />
                                                        }
                                                </ListItem>
                                                </Paper>
                                            </Grid>
                                            {!msg.isProctor ? <Grid item xs={4}></Grid> : null}
                                        </Grid>
                                    ))} 
                            </List>

                            <TextField id="filled-basic"  variant="filled"
                             className={classes.chatBoxTypeArea} size="small" 
                               onChange={(e)=> setText(e)}
                             // onKeyPress={addMessage}
                             />
                        </Paper>
                    </Fade>
                    )}  
                
             </Popper>
        </div>
    )
}

export default Chatbox;

