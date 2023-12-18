import { React, useEffect, useState } from 'react'
import Layout from '../components/Layout'

const Cart = () => {
    const [userId, setUserId] = useState('')
    const [cart, setCart] = useState([])

    useEffect(() => {
        console.log(document.cookie)
        console.log(document)
        console.log('hola')
        fetchCart()
    }, [])



    const fetchCart = async () => {
        try {
            const response = await fetch(`http://localhost:3006/cart/?userId=65774cfc915b33dfea928eb4`, { credentials: 'include' });
            const data = await response.json();
            setCart(data)
            console.log(data)
        }
        catch (e) {
            console.log('Error fetching data')
        }
    }






    return (
        <Layout>
            <h1>Cart</h1>
        </Layout>
    )
}

export default Cart