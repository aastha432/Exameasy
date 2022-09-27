import Navbar from '../Components/Navbar';
import React from 'react';
import Typography from '@material-ui/core/Typography';



const AdminDashboard = () => {

  return (
   <div >
    <Navbar/>
    <Typography variant="h5" component="h3" align="center" gutterBottom={true}>Admin Dashboard</Typography>
    </div>
  );
}

export default AdminDashboard;