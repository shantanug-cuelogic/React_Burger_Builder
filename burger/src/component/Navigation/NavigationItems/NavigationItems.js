import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Burger Builder </NavigationItem>
        { props.isAuth ? <NavigationItem link="/orders"> Order </NavigationItem>:null}
        {!props.isAuth
         ? <NavigationItem link="/auth"> Authenticate </NavigationItem>
         : <NavigationItem link="/logout"> Logout </NavigationItem>
        }

    </ul>    

);

export default navigationItems;