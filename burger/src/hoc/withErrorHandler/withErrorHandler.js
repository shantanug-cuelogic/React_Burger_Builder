import React ,{ Component } from 'react';

import Aux from '../Auxilary';
import Modal from '../../component/UI/Modal/Modal';

const withErrorHandler =(WrappedComponents,axios) =>{
    return class extends Component {
        state ={
            error: null,
        }
        
        componentWillMount() {

            this.requestInterceptor=axios.interceptors.request.use(req=>{
                this.setState({error:null});
                return  req;
            });
            this.responseInterceptor=axios.interceptors.response.use ( res =>res ,error => {
                this.setState({error:error});
            });
        }

        componentDidUnmount(){
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
        }

        errorHandler = () => {
            this.setState({error:null});
        }
        
        render() {
            return (
                <Aux>
                    <Modal show={this.state.error}
                    clicked ={this.errorHandler}

                    >
                    {this.state.error ? this.state.error.message : null}

                    
                     </Modal>
                      <WrappedComponents {...this.props} />
                </Aux>
            ); 
        }
    }
}

export default withErrorHandler;
