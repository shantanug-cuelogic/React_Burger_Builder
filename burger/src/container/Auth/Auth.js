import React , { Component } from 'react';
import { connect } from 'react-redux';
import Input from '../../component/UI/Input/Input';
import Button from '../../component/UI/Button/Button';
import Spinner from '../../component/UI/Spinner/Spinner';
import classes from './Auth.css';
import { updateObject, checkValidity } from '../../shared/utility';
import * as actions from '../../store/actions/index';
import { Redirect } from 'react-router-dom';

class Auth extends Component {
   
   state = {
       controls:{
        email: {
            elementType: 'input',
            elementConfig:{
                type: 'email',
                placeholder:'Your Email'
            },
            value:'',
            validation:{
                required:true,
                isEmail:true
                
            },
            valid:false,
            touched:false

          },

          password: {
            elementType: 'input',
            elementConfig:{
                type: 'password',
                placeholder:'Password'
            },
            value:'',
            validation:{
                required:true,
                minLength: 6
                
            },
            valid:false,
            touched:false

          },
       },
       isSignUp: true
   }

   componentDidMount(){
    if(!this.props.buildingBurger && this.props.authRedirectPath !=='/')
    {
        this.props.onSetAuthRedirectPath();
    }
}

  
    
    switchAuthHandler =() => {
        this.setState(
            prevState => {
                return{isSignUp : !prevState.isSignUp};
            }
        )
    }
    
    inputOnChangeHandler = (event, controlName) => {
        const updatedControls = updateObject(this.state.controls,{
            [controlName] :updateObject(   ...this.state.controls[controlName],{
                value:event.target.value,
                valid:checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched:true
            })
        });
        this.setState({controls:updatedControls});
    }

    submitHandler = (event) =>{
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignUp);
    }

    render() {
        const inputArrayElement =[];
        for(let key in this.state.controls)
        {
            inputArrayElement.push({
                id:key,
                config: this.state.controls[key]
            });
        }
        
        let form = inputArrayElement.map(formElement =>(
            <Input 
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                clicked={(event)=>this.inputOnChangeHandler(event,formElement.id)} 
            />
        ))

        if(this.props.loading){
            form = <Spinner />
        }

        let errorMessage = null;
        if(this.props.error)
        {
            errorMessage=(
                <p className={classes.ErrorMessage}>{this.props.error.message}</p>
                    )
        }

        let authRedirect = null;
        
        if(this.props.isAuthenticated)
        {
            authRedirect=<Redirect to={this.props.authRedirectPath} />
        }

        return(
           <div className={classes.Auth}>
                {errorMessage}
                {authRedirect}
                <form onSubmit={this.submitHandler}>
                    {form}
                <Button btnType='Success'> Submit</Button>
             </form>
             <Button 
                clicked={this.switchAuthHandler}
                btnType='Danger'> Switch To {this.state.isSignUp ? 'Sign In' : 'Sign Up'}</Button>     
           </div>
      );
    }
}

const mapStateToProps =  state => {
    return{
        loading : state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath 
    };
};

const mapDispatchToProps =  dispatch => {
    return{
        onAuth : (email,password,signup) => dispatch(actions.auth(email,password,signup)),
        onSetAuthRedirectPath: ()=> dispatch(actions.setAuthRedirectPath('/'))
   
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Auth);