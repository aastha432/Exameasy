import Navbar from '../Components/Navbar';
import {React , useState, useEffect, useCallback, useRef, useLayoutEffect, Fragment} from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Avatar from '@mui/material/Avatar';
import Grid from '@material-ui/core/Grid';
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
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import { ReactMic } from 'react-mic';
import Webcam from "react-webcam";
import { ReactInternetSpeedMeter } from 'react-internet-meter'
import Signin from './Signin';
import { BoxList } from '../Components/BoxList';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import ruLocale from "date-fns/locale/ru";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";

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
    justifyItems : 'center'
  },
  scheduleExamButton : {
    width: '30%',
    justifyContent : 'center',
  },
  primaryAction2 : {
    width: '100%',
    justifyContent : 'center',
    marginTop : 15,
  },
  

}));

const StudentDashboard = () => {

  const [user, loading, error] = useAuthState(auth);

  // Profile related deatils
  const [displayName, setDisplayName] = useState(user ? user.displayName : " ");
  const [photoURL, setPhotoURL] = useState(user ? user.photoURL : " ");
  const [exam, setExam] = useState("AZ-900"); // should come from DB
  const [updateProfile, updating] = useUpdateProfile(auth);


  // upcoming and past exam information
  const [upcomingExams, setUpcomingExams] = useState(["AZ-900", "DP-900", "AI-900", "PL-900", "SC-900","AZ-900", "DP-900", "AI-900", "PL-900", "SC-900"]); // should come from DB
  const [pastExams, setPastExams] = useState(["AZ-900", "AI-900", "PL-900", "SC-900","AZ-900", "DP-900", "AI-900", "PL-900", "SC-900"]); // should come from DB
  
  /* Scheduling exams*/
  const[openScheduledExamButton, setOpenScheduledExamButton] = useState(false);
  // Scheduled exam name
  const [scheduledExam, setScheduledExam] = useState('');
  const [openScheduledExam, setOpenScheduledExam] = useState(false);
  const avaibleExams = ["DP-900","PL-900","PL-300","SC-900"];
  const handleCloseExamName = () => {
    setOpenScheduledExam(false);
  }
  const handleOpenExamName = () => {
    setOpenScheduledExam(true);
  }
  const handleChangeExamName = (e) => {
    setScheduledExam(e.target.value);
  } 
  // Scheduled exam slot
  const [scheduledSlot, setScheduledSlot] = useState('');
  const [openScheduledSlot, setOpenScheduledSlot] = useState(false);
  const avaibleSlots = ["2:00 PM - 3:30 PM", "4:00 PM - 5:30 PM", "11:00 AM - 12:30 PM"];
  const handleCloseSlot = () => {
    setOpenScheduledSlot(false);
  }
  const handleOpenSlot = () => {
    setOpenScheduledSlot(true);
  }
  const handleChangeSlot = (e) => {
    setScheduledSlot(e.target.value);
  } 
  // Scheduled exam Date
  const [scheduledDate, setScheduledDate] = useState(new Date());
  


  /**  (System checks) */

  // toggle dropdowns for system check
  const [openMicrophone, setOpenMicrophone] = useState(false);
  const [openWebcam, setOpenWebcam] = useState(false);
  const [openInternet, setOpenInternet] = useState(false);
  // toggle system check dropdown functions
  const handleMicrophoneClick = () => {
    setOpenMicrophone(!openMicrophone);
  }
  const handleWebcamClick = () => {
    setOpenWebcam(!openWebcam);
  }
  const handleInternetClick = () => {
    setOpenInternet(!openInternet);
  }

  // microphone controls
  const [record, setRecord] = useState(false);
  const [microphoneVerified, setMicrophoneVerified] = useState(false);
  // microphone control functions
  const handleMicrophoneVerification = () => {
    setMicrophoneVerified(true);
  }
  const onData = ()=> {
    console.log("Recording.....");
  }
  const onStop = (recordedBlob) => {
    console.log(recordedBlob);
  }

  // webcam controls
  const [webcam, setWebcam] = useState(false);
  const [webcamVerified, setWebcamVerified] = useState(false);
// webcam control functions
  const handleWebcamVerification = () => { }


  // internet controls
  const [speed, setSpeed] = useState('');
  const [checkSpeed, setCheckSpeed] = useState(false);
  const [internetVerified, setInternetVerified] = useState(false);
  // internet control functions
  const handleInternetVerification = () => { }





  /* (For capturing student and GovID images */
  
  // toggle dropdowns (Capturing images)
  const [openCaptureStudentImage, setOpenCaptureStudentImage] = useState(false);
  const [openCaptureGovIDImage, setOpenCaptureGovIDImage] =  useState(false);
  // Capturing image
  const [capturedStudentImage, setCapturedStudentImage] = useState('');
  const [capturedGovIDImage, setCapturedGovIDImage] =  useState('');
  const [imagesVerified, setImagesVerified] = useState(true); // shouls be populated from proctor's end
  const webcamRefStudent = useRef(null);
    const capturingStudentImage = useCallback(
      () => {
        const imageSrc = webcamRefStudent.current.getScreenshot();
        setCapturedStudentImage(imageSrc); // store this in DB later
      },
      [webcamRefStudent]
    );

    const webcamRefGov = useRef(null);
    const capturingGovIDImage = useCallback(
      () => {
        const imageSrc = webcamRefGov.current.getScreenshot();
        setCapturedGovIDImage(imageSrc);// store this in DB later
      },
      [webcamRefGov]
    );




  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }
  }, [user, loading]);

  const classes = useStyles();
  const navigate = useNavigate();

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
              <Typography  component="h3" align="center">Email : {user.email}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography component="h3" align="center">Exam : {exam}</Typography>
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
        

        <Grid className={classes.boxGrid} container spacing={2} justifyContent='center'>
          <Grid item>
            <BoxList heading={"UPCOMING EXAMS"} items={upcomingExams}/>
          </Grid>
          <Grid item>
            <BoxList heading={"PAST EXAMS"} items={pastExams}/>
          </Grid>
        </Grid>
        
        <br></br>
        <Typography align='center'><Button onClick={()=>setOpenScheduledExamButton(!openScheduledExamButton)}
         type="submit" variant="contained" size="large" className={classes.scheduleExamButton} color="primary"
        >SCHEDULE EXAM</Button></Typography>
        {
          openScheduledExamButton ? 
          <Grid container spacing={2} justifyContent='center'>
            <Grid item xs={12}></Grid>
            <Grid item>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-controlled-open-select-label">Exam</InputLabel>
                <Select
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  open={openScheduledExam}
                  onClose={handleCloseExamName}
                  onOpen={handleOpenExamName}
                  value={scheduledExam}
                  label="Age"
                  onChange={(e)=>handleChangeExamName(e)}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {
                    avaibleExams.map((exam) => <MenuItem value={exam}>{exam}</MenuItem>)
                  }
                </Select>
              </FormControl>
          </Grid>
          <Grid item>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-controlled-open-select-label">Slot</InputLabel>
                <Select
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  open={openScheduledSlot}
                  onClose={handleCloseSlot}
                  onOpen={handleOpenSlot}
                  value={scheduledSlot}
                  label="Age"
                  onChange={(e)=>handleChangeSlot(e)}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {
                    avaibleSlots.map((slot) => <MenuItem value={slot}>{slot}</MenuItem>)
                  }
                </Select>
              </FormControl>
          </Grid>
          
          <Grid item>
              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
                <Fragment>
                <DatePicker
                  label="Date"
                  value={scheduledDate}
                  onChange={(e)=>setScheduledDate(e)}
                  animateYearScrolling
                /></Fragment>
              </MuiPickersUtilsProvider>
          </Grid>

          <Grid item>
            <Button onClick={()=>{}}
              type="submit" variant="contained" size="large" className={classes.primaryAction2} color="secondary"
            >Submit</Button>
          </Grid>
        </Grid> : null
        }
        
        

        
        <Grid container spacing={2}>
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
                <Grid container spacing={2} justifyContent="center">
                  <Grid item >
                    <ReactMic
                    record={record}
                    className="sound-wave"
                    strokeColor="#000000"
                    backgroundColor="#FFFFFF" 
                    onStop={onStop}
                    onData={onData}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Button onClick={()=> setRecord(true)} type="button">Start</Button>
                  </Grid>
                  <Grid item >
                    <Button onClick={()=> setRecord(false)} type="button">Stop</Button>
                  </Grid>
                  <Grid item xs={12}>
                    {
                      microphoneVerified ? <Typography  align='center'><CheckCircleIcon fontSize='large'/> </Typography> :
                      <Typography align='center'><CancelIcon fontSize='large'/></Typography>
                    }
                  </Grid>
                  
                  </Grid>
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
                  <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12}>
                      {webcam ? <Typography align='center'><Webcam
                      audio={false}
                      height={100}
                      screenshotFormat="image/jpeg"
                      width={100}
                      mirrored = {true}
                      videoConstraints={{width : 500, height: 500,facingMode: "user"}}
                    ></Webcam></Typography> : null}
                    </Grid>
                    <Grid item >
                      <Button onClick={()=> setWebcam(true)} type="button">Start</Button>
                    </Grid>
                    <Grid item >
                      <Button onClick={()=> setWebcam(false)} type="button">Stop</Button>
                    </Grid>
                    <Grid item xs={12}>
                      {
                        webcamVerified ? <Typography  align='center'><CheckCircleIcon fontSize='large'/> </Typography> :
                        <Typography align='center'><CancelIcon fontSize='large'/></Typography>
                      }
                    </Grid>
                  </Grid>
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
                  <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12} alignItems="center">
                     { checkSpeed ? <Typography align='center'><ReactInternetSpeedMeter  
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
                        /></Typography> : null }
                    </Grid>
                    <Grid item >
                      <Button onClick={()=> setCheckSpeed(true)} type="button">Start</Button>
                    </Grid>
                    <Grid item >
                      <Button onClick={()=> setCheckSpeed(false)} type="button">Stop</Button>
                    </Grid>
                    <Grid item xs={12}>
                      {
                        internetVerified ? <Typography  align='center'><CheckCircleIcon fontSize='large'/> </Typography> :
                        <Typography align='center'><CancelIcon fontSize='large'/></Typography>
                      }
                    </Grid>
                  </Grid>
                </ListItemButton>
              </List>
            </Collapse>
          </Grid>
        </Grid>

        <Typography component="h5" align="center" gutterBottom={true}>
          <Button variant="contained" color="primary" size="large"
          onClick={()=> setOpenCaptureStudentImage(!openCaptureStudentImage)}
          >Capture Student Image</Button>
        </Typography>
        { openCaptureStudentImage ? <Grid container spacing={2} justifyContent="center" className={classes.container}>
          <Grid item >
            {capturedStudentImage=='' ? <Typography align='center'><Webcam
                audio={false}
                height={500}
                ref={webcamRefStudent}
                screenshotFormat="image/jpeg"
                width={500}
                videoConstraints={{width : 500, height: 500,facingMode: "user"}}
              /></Typography>
             : <Typography align='center'><img src={capturedStudentImage} height="500" width="500"/></Typography>}
          </Grid>
          <Grid item>
            <Button onClick={capturingStudentImage}>Capture Photo</Button>
          </Grid>
          <Grid item>
            <Button onClick={()=> setCapturedStudentImage('')}>Retake Photo</Button>
          </Grid>
        </Grid> : null }

        
        <Typography component="h5" align="center" gutterBottom={true}>
          <Button variant="contained" color="primary" size="large"
          onClick={()=> setOpenCaptureGovIDImage(!openCaptureGovIDImage)}
          >Capture Government ID Image</Button>
        </Typography>
        { openCaptureGovIDImage ? <Grid container spacing={2} justifyContent="center" className={classes.container}>
          <Grid item >
            {capturedGovIDImage=='' ? <Typography align='center'><Webcam
                audio={false}
                height={500}
                ref={webcamRefGov}
                screenshotFormat="image/jpeg"
                width={500}
                videoConstraints={{width : 500, height: 500,facingMode: "user"}}
              /></Typography>
             : <Typography align='center'><img src={capturedGovIDImage} height="500" width="500"/></Typography>}
          </Grid>
          <Grid item>
            <Button onClick={capturingGovIDImage}>Capture Photo</Button>
          </Grid>
          <Grid item>
            <Button onClick={()=> setCapturedGovIDImage('')}>Retake Photo</Button>
          </Grid>
        </Grid> : null }

        { !imagesVerified ?
        <Grid container spacing={2} justifyContent="center" className={classes.container}>
           <Grid item>
            <Typography align='center'>
              Waiting for verification ..... 
            </Typography>
           </Grid>
           <Grid item>
            <HourglassTopIcon/>
           </Grid>
        </Grid > :
        <Grid container spacing={2} justifyContent="center" className={classes.container}>
        <Grid item>
         <Typography align='center'>
           Verification successfull
         </Typography>
        </Grid>
        <Grid item>
         <CheckCircleIcon/>
        </Grid>
     </Grid > }
        


      <Grid container spacing={2} justifyContent="center" className={classes.container}>
        <Grid item>
          {imagesVerified ? 
          <Button type="submit" variant="contained" size="large" className={classes.primaryAction}
          onClick = {()=>navigate("/exam")}>
              Start Exam
          </Button> :
          <Button type="submit" variant="contained" size="large" className={classes.primaryAction} disabled
          onClick = {()=>navigate("/exam")}>
              Start Exam
          </Button> }
        </Grid>
      </Grid>

    </Container>
  </div> : null }
 </div>
  );
}

export default StudentDashboard;