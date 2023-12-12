import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Layout from '../../components/Layout'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
      const reponse = await axios.post(`${process.env.REACT_APP_API}/register`,
      { name,email,password,confirmPassword }
    );
      if(reponse.data.success){
        navigate('/login')
      }

    }catch (error){
      console.log(error);
      setError(error.response.data.error);
    }
  }

  return (
    <Layout title="Register - Vegolution">
        <div className="register">
          <h1>Register Page</h1>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <input 
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control" 
                id="exampleInputName1"
                placeholder="Enter Your Name" />
            </div>
            <div className="mb-3">
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control" 
                id="exampleInputEmail1"
                placeholder="Enter Your Email" />
            </div>
            <div className="mb-3">
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control" 
                id="exampleInputPassword1"
                placeholder="Enter Your Password" />
            </div>
            <div className="mb-3">
              <input 
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="form-control" 
                id="exampleInputPassword1"
                placeholder="Confirm Your Password" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
    </Layout>
  )
}

export default Register