import React from 'react';
import FormInput from '../components/FormInput';
import Button from '../components/buton';

const SignIn = () => {
    const handleSignIn = () => {
        // Logic for handling sign in
    }

    return (
        <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <form>
                    <FormInput label="Username" type="text" id="username" />
                    <FormInput label="Password" type="password" id="password" />

                    <div className="input-remember">
                        <input type="checkbox" id="remember-me" />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>

                  
                    <Button onClick={handleSignIn}>Sign In</Button>
                </form>
            </section>
        </main>
    );
}

export default SignIn;
