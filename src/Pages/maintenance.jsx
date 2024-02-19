import React from 'react';
import SideNavone from '../SideNavBar';

const Maintainance = () => {
  return (
    <SideNavone>
      <div className='d-flex justify-content-center align-items-center flex-column py-5'>
    <img id="img360" alt='nothing' src="https://leantech.com/wp-content/uploads/2020/07/Maintenance-2.png" style={{height: "300px", width:"300px"}} />
    <h1>In Progress</h1>
    <h2>We'll be back shortly.</h2></div></SideNavone>
  )
}

export default Maintainance;