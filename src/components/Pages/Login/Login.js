import React, { useEffect, useState } from 'react';
import Illustration from '../../Illustration/Illustration';
import './Login.css';
import loginImg from '../../../images/login.svg';
import Form from '../../Form/Form';
import TextInput from '../../TextInput/TextInput';
import Button from '../../Button/Button';
import { useAuth } from '../../../hooks/useAuth';
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, error, user } = useAuth();
    const location = useLocation();
    const history = useHistory();

    const handleLogin = (e) => {
        e.preventDefault();
        login(email, password);
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
            <h1>Login to your account</h1>
            <div className="column">
                <Illustration src={loginImg} alt="Login"></Illustration>
                <Form className="login" onSubmit={handleLogin}>
                    <TextInput type="email" placeholder="Enter email" required value={email} onChange={e => setEmail(e.target.value)} icon="alternate_email" />

                    <TextInput type="password" placeholder="Enter password" required value={password} onChange={e => setPassword(e.target.value)} icon="lock" />

                    <Button type="submit">
                        <span>Login Now</span>
                    </Button>
                    {
                        error && <p className="error">{error}</p>
                    }
                    <div className="info">Don't have an account? <Link to="/signup">Signup</Link> instead.</div>
                </Form>
            </div>
        </>
    );
};

export default Login;