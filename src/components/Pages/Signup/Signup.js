import React, { useEffect, useState } from 'react';
import Button from '../../Button/Button';
import CheckBox from '../../CheckBox/CheckBox';
import Form from '../../Form/Form';
import TextInput from '../../TextInput/TextInput';
import Illustration from '../../Illustration/Illustration';
import signupImg from '../../../images/signup.svg'
import './Signup.css';
import { useAuth } from '../../../hooks/useAuth';
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
const Signup = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [signUpError, setSignUpError] = useState();

    const { signUp, user } = useAuth();

    const location = useLocation();
    const history = useHistory();

    const handleSignUp = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            return setSignUpError("Confirm Password Doesn't Match");
        }
        try {
            setSignUpError("");
            signUp(name, email, password);
            history.push("/")
        }
        catch (err) {
            setSignUpError(err);
        }
    }

    const redirect_url = location.state?.from || "/";

    useEffect(() => {
        if (user?.email) {
            history.push(redirect_url);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    return (
        <>
            <h1>Create an account</h1>
            <div className="column">
                <Illustration src={signupImg} alt="Signup"></Illustration>
                <Form className="signup" onSubmit={handleSignUp}>
                    <TextInput type="text" placeholder="Enter name" required value={name} onChange={e => setName(e.target.value)} icon="alternate_email" />

                    <TextInput type="email" placeholder="Enter email" required value={email} onChange={e => setEmail(e.target.value)} icon="person" />

                    <TextInput type="password" placeholder="Enter password" required value={password} onChange={e => setPassword(e.target.value)} icon="lock_clock" />

                    <TextInput type="password" placeholder="Confirm password" required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} icon="lock" />

                    <CheckBox text="I agree to the Terms &amp; Conditions" required />

                    <Button type="submit">
                        <span>Sign Up Now</span>
                    </Button>

                    {
                        signUpError && <p className="error">{signUpError}</p>
                    }
                    <div className="info">
                        Already have an account? <Link to="/login">Login</Link> instead.
                    </div>
                </Form>
            </div>
        </>
    );
};

export default Signup;