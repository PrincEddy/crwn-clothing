import React from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import './sign-in.component.styles.scss';
import { signInWithGoogle,auth} from '../../firebase/firebase.utils';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            password:''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();
        const {email,password} = this.state;

        try {
            await auth.signInWithEmailAndPassword(email,password);
            this.setState({email:'',password:''});
        } catch (e) {
            console.log(e);
        }
        
    }

    handleChange = event => {
        const {value , name} = event.target;
        this.setState({[name]:value});
    }
    render(){
        return (
            <div className='sign-in'>
                <h2 className=''>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        name='email'
                        type="email" 
                        value={this.state.email} 
                        handleChange ={this.handleChange}
                        required
                        label='Email'
                     />
                    <FormInput 
                    name='password' 
                    type = "password" 
                    value={this.state.password} 
                    handleChange ={this.handleChange} 
                    required
                    label='Password'
                    />
                    <div className='buttons'>
                        <CustomButton type='submit' >SIGN IN</CustomButton>
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
                            {''}
                            Sign in with Google {''}
                        </CustomButton>
                    </div>
                </form>
            </div>
        );
    }
}

export default SignIn;