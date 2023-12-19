import React from 'react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '../../components/Layout';
import { useAuth } from '../../context/auth';

const Login = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const reset = e.target.reset.value;
    const body = {
      email,
      password,
      reset,
    };
    try {
      const result = await fetch('http://localhost:3006/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      if (result.status === 200) {
        const data = await result.json();
        setAuth({
          user: data.user,
          token: data.token,
        });
        navigate('/');
      } else {
        const data = await result.json();
        setErrorMessage(data.error || 'Invalid email or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setErrorMessage(''); // Resetear el mensaje de error al intentar nuevamente
    loginHandler(e);
  };

  return (
    <Layout>
      <section className="login">
        <article className='card-form'>
          <form onSubmit={submitHandler}>
            <h1>LOGIN</h1>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" />
            <button type="submit" className="login-btn">
              Login
            </button>
            <label htmlFor="reset"></label>
            <button
              type="button"
              className="login-btn"
              onClick={() => {
                navigate('/forgot-password');
              }}
            >
              Forgot Password
            </button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </form>
          <p>
            No tienes cuenta?{' '}
            <Link to="/register" className="register-link">
              Regístrate
            </Link>
          </p>
        </article>     
      </section>
    </Layout>
  );
};

export default Login;
