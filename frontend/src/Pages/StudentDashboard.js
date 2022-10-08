import Navbar from '../Components/Navbar';
import {React , useState, useEffect, useCallback, useRef, useLayoutEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@mui/material/Box';
import { logout } from '../firebase';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Avatar from '@mui/material/Avatar';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { auth } from '../firebase';
import { useAuthState, useUpdateProfile } from "react-firebase-hooks/auth";
import { Container } from '@material-ui/core';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import MicIcon from '@mui/icons-material/Mic';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import WifiIcon from '@mui/icons-material/Wifi';

// System checks
import { ReactMic } from 'react-mic';
import Webcam from "react-webcam";
import { ReactInternetSpeedMeter } from 'react-internet-meter'
import Signin from './Signin';

const useStyles = makeStyles((theme) => ({
  
  primaryAction: {
    width: '100%',
    justifyContent : 'center',
  },
  container : {
    marginTop : 30,
  },
  boxGrid : {
    marginTop : 50,
    flexDirection : "row",
  },
  box : {
    width: '100%',
    height: 300,
    backgroundColor: "#aec2ea",
    borderRadius : 10,
    overflow : "auto"
  },
  boxHeader : {
    backgroundColor: "#5d85d5",
    height : 30,
    borderRadius : 10,
  },
}));

const StudentDashboard = () => {

  const [user, loading, error] = useAuthState(auth);
  const [displayName, setDisplayName] = useState(user ? user.displayName : " ");
  const [photoURL, setPhotoURL] = useState(user ? user.photoURL : " ");
  const [exam, setExam] = useState("AZ-900"); // should come from DB
  const [upcomingExams, setUpcomingExams] = useState(["AZ-900", "DP-900", "AI-900", "PL-900", "SC-900","AZ-900", "DP-900", "AI-900", "PL-900", "SC-900"]); // should come from DB
  const [pastExams, setPastExams] = useState(["AZ-900", "DP-900", "AI-900", "PL-900", "SC-900","AZ-900", "DP-900", "AI-900", "PL-900", "SC-900"]); // should come from DB
  const [updateProfile, updating] = useUpdateProfile(auth);
  const navigate = useNavigate();

  //System checks

  // toggle dropdowns
  const [openMicrophone, setOpenMicrophone] = useState(false);
  const [openWebcam, setOpenWebcam] = useState(false);
  const [openInternet, setOpenInternet] = useState(false);

  //content
  const [record, setRecord] = useState(false);
  const [webcam, setWebcam] = useState(false);
  const [speed, setSpeed] = useState('');
  const [checkSpeed, setCheckSpeed] = useState(false);

  // Capturing image
  const [capturedStudentImage, setCapturedStudentImage] = useState('');
  const [capturedGovIDImage, setCapturedGovIDImage] =  useState('');

  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }
  }, [user, loading]);

  const classes = useStyles();

  const handleMicrophoneClick = () => {
    setOpenMicrophone(!openMicrophone);
  }
  const handleWebcamClick = () => {
    setOpenWebcam(!openWebcam);
  }
  const handleInternetClick = () => {
    setOpenInternet(!openInternet);
  }

  const webcamRefStudent = useRef(null);
  const capturingStudentImage = useCallback(
    () => {
      const imageSrc = webcamRefStudent.current.getScreenshot();
      setCapturedStudentImage(imageSrc);
    },
    [webcamRefStudent]
  );

  const webcamRefGov = useRef(null);
  const capturingGovIDImage = useCallback(
    () => {
      const imageSrc = webcamRefGov.current.getScreenshot();
      setCapturedGovIDImage(imageSrc);
    },
    [webcamRefGov]
  );

  


  return (
  <div>
    { user ? <div>
    <Navbar/>
    <Container  className={classes.container}>
        <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Avatar alt="Profile photo" src={photoURL} height = {100} width = {100} />
            </Grid>
            <Grid item >
              <TextField variant="outlined" required size="small" name="Name" label="Name" 
              value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" component="h3" align="center" gutterBottom={true}>Email : {user.email}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" component="h3" align="center" gutterBottom={true}>Exam : {exam}</Typography>
            </Grid>
            <Grid>
                <Button type="submit" variant="contained" color="error" size="large" className={classes.primaryAction}
                onClick={async () => {
                  await updateProfile({ displayName});
                  alert('Updated profile');
                }}>
                  Update Profile
              </Button>
            </Grid>
        </Grid>
        

        <Grid className={classes.boxGrid} container spacing={2}>
          <Grid item xs={6}>
            <Box className={classes.box}>
              <Typography variant="h5" component="h3" align="center" className={classes.boxHeader} gutterBottom={true}
               >UPCOMING EXAMS</Typography>
               { 
                upcomingExams.map((e) =>
                   <Typography  component="h5" align="center" gutterBottom={true}>{e}</Typography>
                )
               }
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box className={classes.box}>
              <Typography variant="h5" component="h3" align="center" gutterBottom={true} className={classes.boxHeader}>PAST EXAMS</Typography>
              { 
                pastExams.map((e) =>
                   <Typography  component="h5" align="center" gutterBottom={true}>{e}</Typography>
                )
               }
            </Box>
          </Grid>
        </Grid>
        

        
        <Grid container spacing={2}>

          <Grid item xs={12} marginTop="30">
          <Typography variant="h5" component="h3" align="center" gutterBottom={true}>System Check</Typography>
          </Grid>

          <Grid item xs={12}>
            <ListItemButton onClick={handleMicrophoneClick}>
              <ListItemIcon>
                <MicIcon/>
              </ListItemIcon>
              <ListItemText primary="Check microphone" />
              {openMicrophone ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openMicrophone} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ReactMic
                    record={record}
                    className="sound-wave"
                    strokeColor="#000000"
                    backgroundColor="#FF4081" />
                  <Button onClick={()=> setRecord(true)} type="button">Start</Button>
                  <Button onClick={()=> setRecord(false)} type="button">Stop</Button>
                </ListItemButton>
              </List>
            </Collapse>
          </Grid>
          
          
          <Grid item xs={12}>
            <ListItemButton onClick={handleWebcamClick}>
              <ListItemIcon>
                <CameraAltIcon/>
              </ListItemIcon>
              <ListItemText primary="Check webcam" />
              {openWebcam ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openWebcam} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  {webcam ? <Webcam
                    audio={false}
                    height={500}
                    screenshotFormat="image/jpeg"
                    width={500}
                    mirrored = {true}
                    videoConstraints={{width : 500, height: 500,facingMode: "user"}}
                  ></Webcam> : null}
                  <Button onClick={()=> setWebcam(true)} type="button">Start</Button>
                  <Button onClick={()=> setWebcam(false)} type="button">Stop</Button>
                </ListItemButton>
              </List>
            </Collapse>
          </Grid>

          <Grid item xs={12}>
            <ListItemButton onClick={handleInternetClick}>
              <ListItemIcon>
                <WifiIcon/>
              </ListItemIcon>
              <ListItemText primary="Check internet" />
              {openInternet ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openInternet} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                { checkSpeed ? <ReactInternetSpeedMeter  
                  txtSubHeading={`Internet speed is ${speed} Mbps` }
                  outputType="alert"
                  customClassName={null}
                  txtMainHeading=" " 
                  pingInterval={4000} // milliseconds 
                  thresholdUnit='megabyte' // "byte" , "kilobyte", "megabyte" 
                  threshold={100}
                  imageUrl="https://getwallpapers.com/wallpaper/full/7/2/a/286383.jpg"
                  downloadSize="1781287"  //bytes
                  callbackFunctionOnNetworkTest={(s)=>setSpeed(s)}
                /> : null }
                <Button onClick={()=> setCheckSpeed(true)} type="button">Start</Button>
                <Button onClick={()=> setCheckSpeed(false)} type="button">Stop</Button>
                </ListItemButton>
              </List>
            </Collapse>
          </Grid>

        </Grid>


       <Typography variant="h5" component="h3" align="center" gutterBottom={true}>Capturing Images</Typography>
        <Grid container spacing={2}>

        <Typography variant="h5" component="h5" align="center" gutterBottom={true}>Capture Student Image</Typography>
          <Grid item xs={12}>
            {capturedStudentImage=='' ? <Webcam
                audio={false}
                height={500}
                ref={webcamRefStudent}
                screenshotFormat="image/jpeg"
                width={500}
                videoConstraints={{width : 500, height: 500,facingMode: "user"}}
              />
             : <img src={capturedStudentImage} height="500" width="500"/>}
            <Button onClick={capturingStudentImage}>Capture Photo</Button>
            <Button onClick={()=> setCapturedStudentImage('')}>Retake Photo</Button>
          </Grid>

          <Typography variant="h5" component="h5" align="center" gutterBottom={true}>Capture Government ID image</Typography>
          <Grid item xs={12}>
            {capturedGovIDImage=='' ? <Webcam
                audio={false}
                height={500}
                ref={webcamRefGov}
                screenshotFormat="image/jpeg"
                width={500}
                videoConstraints={{width : 500, height: 500,facingMode: "user"}}
              />
             : <img src={capturedGovIDImage} height="500" width="500"/>}
            <Button onClick={capturingGovIDImage}>Capture Photo</Button>
            <Button onClick={()=> setCapturedGovIDImage('')}>Retake Photo</Button>
          </Grid>
        </Grid>


        <Button type="submit" variant="contained" color="primary" size="large" className={classes.primaryAction} 
        onClick = {()=>navigate("/exam")}>
            Start Exam
        </Button>


        <Button type="submit" variant="contained" color="error" size="large" className={classes.primaryAction}
          onClick={logout}>
            Sign Out
        </Button>
    </Container>
  </div> : null }
 </div>
  );
}

export default StudentDashboard;