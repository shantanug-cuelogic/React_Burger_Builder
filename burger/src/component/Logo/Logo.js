import React from 'react';
import classes from './Logo.css';
import Logoimage from '../../Assets/images/burger-logo.png'


const logo = (props) => (
    <div className={classes.Logo}>
        <img src={Logoimage} alt= " Burger app"/> 
     </div>   
);

export default logo;