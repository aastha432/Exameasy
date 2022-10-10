import { useNavigate } from 'react-router-dom';
import {React , useState, useEffect, useCallback, useRef} from 'react';
import Navbar from '../Components/Navbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '../firebase';

const useStyles = makeStyles((theme) => ({
    
    timer : {
        color: "green"
    }
  }));

const Timer = ({ hours, minutes, seconds}) => {

    const [[hrs, mins, secs], setTime] = useState([hours, minutes, seconds]);
    const navigate = useNavigate();
    const classes = useStyles();



    const count = () => {
   
        if (hrs === 0 && mins === 0 && secs === 0){
            navigate("/result");
        }
        else if (mins === 0 && secs === 0) {
            setTime([hrs - 1, 59, 59]);
        } else if (secs === 0) {
            setTime([hrs, mins - 1, 59]);
        } else {
            setTime([hrs, mins, secs - 1]);
        }


    };

    useEffect(() => {
        const timerId = setInterval(() => count(), 1000);
        return () => clearInterval(timerId);
    });

    return (
        <div className={classes.timer}>
            <p>{`${ hrs==undefined ? "00" : hrs.toString().padStart(2, '0')}:
            ${ mins==undefined ? "00" : mins.toString().padStart(2, '0')}:
            ${ secs==undefined ? "00" : secs.toString().padStart(2, '0')}`}</p> 
        </div>
    )
}

export default Timer;