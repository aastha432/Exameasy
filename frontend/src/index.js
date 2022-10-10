import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from './Pages/Signin';
import Signup from './Pages/Signup';
import AdminDashboard from './Pages/AdminDashboard';
import StudentDashboard from './Pages/StudentDashboard';
import ProctorDashboard from './Pages/ProctorDashboard';
import ResetPassword from './Pages/ResetPassword';
import Exam from './Pages/Exam';
import Result from './Pages/Result';

/*
 /studentdashboard should be changed to /studentdashboard/userID
 /proctordashboard should be changed to /proctordashboard/userID
 /admindashboard should be changed to /admindashboard/userID
 /exam should be changed to /exam/studentID/examID
 /result should be changed to /result/studentID/examID
*/

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>} />
        <Route path="signin" element={<Signin/>} />
        <Route path="signup" element={<Signup/>} />
        <Route path="reset" element={<ResetPassword/>} />
        <Route path="admindashboard" element={<AdminDashboard/>} />
        <Route path="studentdashboard" element={<StudentDashboard/>} />
        <Route path="proctordashboard" element={<ProctorDashboard/>} />
        <Route path="exam" element={<Exam/>} />
        <Route path="result" element={<Result/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
