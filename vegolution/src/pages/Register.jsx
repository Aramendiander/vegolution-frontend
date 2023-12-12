import React from 'react'
import Layout from '../components/Layout'

const Register = () => {
  return (
    <Layout>
        <form action="post">
            <input type="text" name="username" id="username" placeholder="Username" />
            <input type="email" name="email" id="email" placeholder="Email" />
            <input type="password" name="password" id="password" placeholder="Password" />
            <input type="password" name="password2" id="password2" placeholder="Confirm Password" />
            <input type="submit" value="Register" />
        </form>
    </Layout>
  )
}

export default Register