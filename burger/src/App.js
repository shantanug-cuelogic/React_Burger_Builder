import React, { Component } from 'react';
import {Route ,Switch, withRouter, Redirect} from 'react-router-dom';
import Layout from './component/Layout/Layout'; 
import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder';
import Checkout from './container/Checkout/Checkout';
import Orders from './container/Orders/Orders';
import Auth from './container/Auth/Auth';
import Logout from './container/Auth/Logout/Logout';
import * as actions from './store/actions/index';
import { connect } from 'react-redux';

class App extends Component {
  
  componentDidMount(){
    this.props.onTryAutoSignup();
  }
  render() {
    let routes= (
      <Switch>
          <Route path="/auth" component={Auth}/>
          <Route path="/" exact component={BurgerBuilder} /> 
          <Redirect to="/" />
      </Switch>  
    );

    if(this.props.isAuthenticated){
      routes = (
      <Switch>
          <Route path="/checkout" component={Checkout} />  
          <Route path="/orders" component={Orders}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/auth" component={Auth}/>
          <Route path="/"  component={BurgerBuilder} /> 
          <Redirect to="/" />
      </Switch>        
      );
    }


    return (
      <div>
       <Layout>
         {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state =>{
  return{
    isAuthenticated : state.auth.token !=null,
  };
};
const mapDispatchToProps= dispatch => {
  return{
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
