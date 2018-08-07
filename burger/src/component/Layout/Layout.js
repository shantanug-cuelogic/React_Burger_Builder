import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxilary';
import classes from './Layout.css'
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer  from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    
    state={
      showSideDrawer : false,
    }
    
    SideDrawerClosedHandler = () => {
        this.setState({showSideDrawer:false})
    }

    toggleHandler = () => {

        this.setState({showSideDrawer:true});
    }
    render (){
        return(
            <Aux>
                <Toolbar 
                    isAuth={this.props.isAuthenticated}
                    toggle={this.toggleHandler} />
                <SideDrawer 
                isAuth={this.props.isAuthenticated}
                open ={this.state.showSideDrawer}
                closed={this.SideDrawerClosedHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
             
             </Aux>

    )
}

}

const mapStateToProps = state => {
    return{
        isAuthenticated: state.auth.token !==null
    }
}

export default connect(mapStateToProps)(Layout); 