import React , { Component } from 'react';
import { connect } from 'react-redux';
import Input from '../../component/UI/Input/Input';
import Button from '../../component/UI/Button/Button';
import Spinner from '../../component/UI/Spinner/Spinner';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
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

   checkValidity (value,rules) {
    let isValid = true;

    if(!rules)
    {
        return true;
    }
    if(rules.required){
        isValid = value.trim() !== '' && isValid;;
    }

    if(rules.minLength)
    {
        isValid = value.length >=rules.minLength && isValid;
    }

    if(rules.maxLength)
    {
        isValid = value.length <=rules.maxLength && isValid;
    }

    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
    }

    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid
    }

    return isValid;
}
    
    switchAuthHandler =() => {
        this.setState(
            prevState => {
                return{isSignUp : !prevState.isSignUp};
            }
        )
    }
    
    inputOnChangeHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName] : {
                ...this.state.controls[controlName],
                value:event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched:true
            }
        };
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

        return(
           <div className={classes.Auth}>
                {errorMessage}
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
        error: state.auth.error
    };
};

const mapDispatchToProps =  dispatch => {
    return{
        onAuth : (email,password,signup) => dispatch(actions.auth(email,password,signup))
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Auth);