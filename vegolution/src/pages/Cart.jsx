import { React, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import Layout from '../components/Layout'

const Cart = () => {
    const [userId, setUserId] = useState('')
    const [cart, setCart] = useState([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchCart()
    }, [])



    const fetchCart = async () => {
        try {
            const response = await fetch(`http://localhost:3006/cart/`, { credentials: 'include' });
            if (response.status === 401) {
                try {
                    console.log('hopla')
                    return window.location.href = "/login";
                }
                catch (e) {
                    console.log(e)
                }
            }

            if (response.status === 404) {
                setError('Not found');
                return error;
            }

            const data = await response.json();
            setCart(data.userCart)
            setLoading(false);

        }
        catch (e) {
            console.log('Error fetching data')
        }
    }


    console.log(cart)


    return (
        <Layout>
            {loading ? null : (
                <>
                    <h1>Cart</h1>
                    <div>
                        {cart.map((item) => {
                            return (
                                <div className="cartitem" key={item._id}>
                                    <h2>{item.product.name}</h2>
                                    <img src={item.product.picture} alt={item.product.name} />
                                    <p>{item.product.price}</p>
                                    <p>{item.product.quantity}</p>
                                </div>
                            )
                        })}
                    </div>
                </>
            )}
        </Layout>
    )
}

export default Cart