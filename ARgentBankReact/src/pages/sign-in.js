import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import { login } from '../features/auth/authSlice';  
import Button from '../components/buton'; 
import FormInput from '../components/FormInput';

const SignIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn); 
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/user'); 
        }
    }, [isLoggedIn, navigate]);

    const handleSignIn = () => {
        const email = usernameRef.current.value; 
        const password = passwordRef.current.value;
        dispatch(login(email, password));  
    }
    
    

    return (
        <main className="main bg-dark style">
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

                    <Button className="sign-in-button" label="Sign In" onClick={handleSignIn} />

                </form>
            </section>
        </main>
    );
}

export default SignIn;
