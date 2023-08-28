import React, { useRef } from 'react';
import FormInput from '../components/FormInput';
import Button from '../components/buton';
import { useDispatch } from 'react-redux';
import { login } from '../features/auth/authSlice';  

const SignIn = () => {
    const dispatch = useDispatch();

    const usernameRef = useRef(null);
    const passwordRef = useRef(null);

    const handleSignIn = () => {
        console.log("Handle Sign In Called");
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
        console.log("Username:", username);
        console.log("Password:", password);
    
        dispatch(login(username, password));  
    }
    

    return (
        <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <form onSubmit={e => e.preventDefault()}>  
                    <FormInput 
                        ref={usernameRef}
                        label="Username" 
                        type="text" 
                        id="username" />
                    <FormInput 
                        ref={passwordRef}
                        label="Password" 
                        type="password" 
                        id="password" />

                    <div className="input-remember">
                        <input type="checkbox" id="remember-me" />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>

                    <Button type="button" onClick={handleSignIn}>Sign In</Button>
                </form>
            </section>
        </main>
    );
}

export default SignIn;
