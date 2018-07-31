import React from 'react';
import classes from './Input.css'


const input = (props) => {
   
    let inputElement = null;
    const inputElementClass =  [classes.InputElement];
    
    if(props.invalid && props.shouldValidate && props.touched){
        inputElementClass.push(classes.Invalid);
    }

    switch(props.elementType)
    {
        
        case('input'): 
        inputElement = <input 
                            className={inputElementClass.join(' ')} 
                            {...props.elementConfig} 
                            value={props.value}
                            onChange={props.clicked}/>
        break;

        case('textarea') :
        inputElement =  <textarea 
                           className={inputElementClass.join(' ')}
                            {...props.elementConfig} 
                            value={props.value}
                            onChange={props.clicked}
                             />
        break;

        case('select') :
        inputElement =  <select 
                             className={inputElementClass.join(' ')}
                            onChange={props.clicked}>
                            {props.elementConfig.options.map(option => (
                                 <option key={option.value} 
                                        value={option.value} >{option.display}</option>   
                             ))}
        </select>
        break;


        default : 
        inputElement = <input className={inputElementClass.join(' ')} 
                                        {...props.elementConfig}
                                         value={props.value}
                                         onChange={props.clicked}/>
        break; 
    }

    return(
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label> 
            {inputElement}
        </div>
        
    );
}

export default input;