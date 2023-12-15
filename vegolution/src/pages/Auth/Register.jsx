import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Layout from '../../components/Layout'

const Register = () => {

  const navigate = useNavigate()

  const registerHandler = async(e)=>{
      try{
          e.preventDefault();
          const username =  e.target.username.value;
          const email =  e.target.email.value;
          const password = e.target.password.value;
          const confirmPassword  = e.target.confirmPassword.value;
          const body = {
            username,email,password,confirmPassword
          }
          console.log(body);
          const response = await fetch("http://localhost:3006/register",{
              method:"POST",
              credentials:"include",
              headers:{
                  "Content-Type":"application/json"
              },
              body: JSON.stringify(body)
          });

          if(!response.ok){
              throw new Error(`Error ${response.status}: ${response.statusText}`);
          }
          const data = await response.json();
          console.log(data);
          if(data.error){
              alert(data.error);
              return;
          }
          alert("te has registrado");
          navigate('/login');
      }
      catch(error){
          console.log(error);
      }
  }

  return (
    <Layout>
      <section className="register">
      <form onSubmit={registerHandler}>
        <h1>REGISTER</h1>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" />
          <label htmlFor="email">Email</label>
          <input type="email" name="email" />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" />
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="password" name="confirmPassword" />
          <button type="submit">Register</button>
      </form>
      </section>
    </Layout>      
  )
}

export default Register