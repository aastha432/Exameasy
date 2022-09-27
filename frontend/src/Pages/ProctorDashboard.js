import Navbar from '../Components/Navbar';
import React from 'react';
import Typography from '@material-ui/core/Typography';



const ProctorDashboard = () => {

  return (
   <div >
    <Navbar/>
    <Typography variant="h5" component="h3" align="center" gutterBottom={true}>Proctor Dashboard</Typography>
    </div>
  );
}

export default ProctorDashboard;