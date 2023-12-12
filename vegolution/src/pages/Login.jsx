import React from 'react'
import Layout from '../components/Layout'

const Login = () => {
  return (
    <Layout>
        <form action="post">
            <input type="email" name="email" id="email" placeholder="Email" />
            <input type="password" name="password" id="password" placeholder="Password" />
            <input type="submit" value="Login" />
        </form>
    </Layout>
  )
}

export default Login