import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Layout from '../../components/Layout'
import { useAuth } from '../../context/auth'


const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate()
  
  const loginHandler = async(e)=>{
    e.preventDefault();
    const email =  e.target.email.value;
    const password = e.target.password.value;
    const body = {
        email,password
    }
    console.log(body);
    const result = await fetch("http://localhost:3006/api/auth/login",{
        method:"POST",
        credentials:"include",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(body)
    });
    if (result.status === 200) {
      const data = await result.json();
      setAuth({
        user:data.user,
        token:data.token
      });
      navigate('/');
      return;
    }
    const data = await result.json();
    console.log(data);

    if(data.error){
        alert(data.error);
        return;
    }
    alert("te has logueado");
  }

  const submitHandler = (e) =>{
    e.preventDefault();
    loginHandler(e);
  }
  return (
    <Layout>
      <section className="login">
      <form onSubmit={submitHandler}>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" />
          <button type="submit">Login</button>
      </form>
      </section>
    </Layout>      
  )
  }

  export default Login;
