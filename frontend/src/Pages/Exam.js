import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Webcam from "react-webcam";
import Button from '@material-ui/core/Button';
import Question from '../Components/Question';
import Timer from '../Components/Timer';



const useStyles = makeStyles((theme) => ({
    
    submitButton: {
      width: '30%',
      marginTop: theme.spacing(2),
      backgroundColor : "#40bf80"
    },
    contentBox : {
      marginTop : 30
    }
  }));

const Exam = () => {
    const classes = useStyles();
    const navigate = useNavigate();

    // Timer - should come from DB
    const [timer, setTimer] = useState({
      "hours" : 0,
      "minutes" : 0,
      "seconds" : 10
    })

    const [questions, setQuestions] = useState([
      {
        "question" : "A company is planning to set up a solution on the Azure platform. The solution has the following main key requirement. Provide a managed service that could be used to manage and scale container-based applications. Which of the following would be best suited for this requirement?",
        "option1" : "When they have a hybrid solution",
        "option2" : "When all of their servers are in the private cloud",
        "option3" : "When all of their servers are in the public cloud",
        "option4" : "When all of their servers are in the public or private cloud",
        "correct" : "option3"
      },
      {
        "question" : "When can an organization decommission its private cloud infrastructure hosted in its data center?",
        "option1" : "Azure Event Grid",
        "option2" : "Azure DevOps",
        "option3" : "Azure Kubernetes",
        "option4" : "Azure Dev Test Labs",
        "correct" : "option3"
      },
      {
        "question" : "Which of the following service is a cloud-based network security service that helps to protect the resources that are stored in an Azure Virtual Network?",
        "option1" : "Azure Sentinel",
        "option2" : "Azure Key Vault",
        "option3" : "Azure Dedicated Hosts",
        "option4" : "Azure Firewall",
        "correct" : "option4"
      }
    ]); // should be populated by DB later

    const submitHandler = () => {
      navigate("/result");
    }
    return(
        <div>
            <Navbar/>
            <Container className={classes.contentBox}>

              <Grid container spacing={2}>
                <Grid item xs={1}>
                  <Timer hours={timer.hours} minutes={timer.minutes} seconds={timer.seconds}/>
                </Grid>
                <Grid item xs={10}>
                  <Typography variant="h5" component="h3" align="center" gutterBottom={true}>Microsoft Certified : Azure Data Fundamentals</Typography>
                </Grid>
                <Grid item xs={1}>
                    <Webcam
                        audio={true}
                        height={100}
                        screenshotFormat="image/jpeg"
                        width={100}
                        mirrored = {true}
                        videoConstraints={{width : 500, height: 500,facingMode: "user"}}
                    />
                </Grid>
              </Grid>
                
              <Grid container spacing={4}>
                {
                  questions.map((question)=>
                  <Grid item xs={12}>
                    <Question question={question.question}
                    option1={question.option1}
                    option2={question.option2}
                    option3={question.option3}
                    option4={question.option4}
                    correct={question.correct}
                    />
                  </Grid>
                  )
                }
              </Grid>

              

              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <Typography align='center'>
                    <Button type="submit" variant="contained" size="large" className={classes.submitButton}
                      onClick = {()=> submitHandler()}>
                          Submit
                      </Button>
                  </Typography>
                </Grid>
              </Grid>
            </Container> 
            
        </div>
    )
}

export default Exam;