import Navbar from '../Components/Navbar';
import {React , useState, useEffect, useCallback, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { logout } from '../firebase';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { auth } from '../firebase';
import { useAuthState, useUpdateProfile } from "react-firebase-hooks/auth";
import { Container } from '@material-ui/core';
import microphone from "../Utilities/microphone.jpeg";
import webcam_photo from "../Utilities/webcam.jpeg";
import internet from "../Utilities/internet_speed.jpeg";

// System checks
import { ReactMic } from 'react-mic';
import Webcam from "react-webcam";
import { ReactInternetSpeedMeter } from 'react-internet-meter'
import Signin from './Signin';

const useStyles = makeStyles((theme) => ({
  actions: {
    [theme.breakpoints.up('sm')]: {
      display: 'flex'
    }
  },
  primaryAction: {
    width: '100%',
    marginTop: theme.spacing(2),
    justifyContent : 'center',
  },
  contentBox : {
    marginTop : 100
  }
}));

const StudentDashboard = () => {

  const [user, loading, error] = useAuthState(auth);
  const [displayName, setDisplayName] = useState(user ? user.displayName : " ");
  const [photoURL, setPhotoURL] = useState(user ? user.photoURL : " ");
  const [exam, setExam] = useState(""); // should come from DB
  const [updateProfile, updating] = useUpdateProfile(auth);
  const navigate = useNavigate();

  //System checks
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
    <Container maxWidth="xs" className={classes.contentBox}>
        <Typography variant="h5" component="h3" align="center" gutterBottom={true}>Student Dashboard</Typography>
        <Grid container spacing={2}>
            <Paper variant="outlined">
              <img src={photoURL} height = {100} width = {100} alt="Profile photo"/>
            </Paper>
              <Grid item xs={12}><TextField variant="outlined" required fullWidth size="small" name="displayName" label="displayName" 
              value={displayName} onChange={(e) => setDisplayName(e.target.value)} /></Grid>
            <Grid item xs={12}><TextField variant="outlined" required fullWidth size="small" name="email" label="email" 
              value={user.email} /></Grid>
            <Grid item xs={12}><TextField variant="outlined" required fullWidth size="small" name="Exam" label="Exam" 
              value={exam} /></Grid>
        </Grid>
        <Button type="submit" variant="contained" color="error" size="large" className={classes.primaryAction}
          onClick={async () => {
            await updateProfile({ displayName});
            alert('Updated profile');
          }}>
            Update Profile
        </Button>

        <Typography variant="h5" component="h3" align="center" gutterBottom={true}>System Check</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <img src={microphone} alt="microphone" width="50" height="50"/>
            <ReactMic
              record={record}
              className="sound-wave"
              strokeColor="#000000"
              backgroundColor="#FF4081" />
            <Button onClick={()=> setRecord(true)} type="button">Start</Button>
            <Button onClick={()=> setRecord(false)} type="button">Stop</Button>
          </Grid>
          <Grid item xs={12}>
            <img src={webcam_photo} alt="webcam" width="50" height="50"/>
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
          </Grid>
          <Grid item xs={12}>
            <img src={internet} alt="internet" width="50" height="50"/>
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