import React from 'react'
import Layout from '../../components/Layout'
import { useNavigate } from 'react-router-dom'

const ForgotPassword = () => {

    const navigate = useNavigate()
  
  const loginHandler = async(e)=>{
    e.preventDefault();
    const email =  e.target.email.value;
    const password = e.target.password.value;
    const reset = e.target.reset.value;
    const body = {
        email,password,reset
    }
    console.log(body);
    const result = await fetch("http://localhost:3006/forgot-password",{
        method:"POST",
        credentials:"include",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(body)
    });
    if (result.status === 200) {
      const data = await result.json();
      navigate('/');
      return;
    }
    const data = await result.json();

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
    <Layout title='forgot-password'>
      <section className="login">
      <form onSubmit={submitHandler}>
        <h1>RESET PASSWORD</h1>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" />
          <button type="submit" className='forgot-password-btn' onClick={()=>{navigate('/login')}}>Change Password</button>
      </form>
      </section>
    </Layout>  
  )
}

export default ForgotPassword