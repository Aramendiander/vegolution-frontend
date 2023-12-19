import { React, useState, useEffect } from 'react'
import Layout from '../components/Layout'

const CartHistory = () => {
    const [cart, setCart] = useState([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)
    const [totalPrice, setTotalPrice] = useState(0)
    const [activeComponent, setActiveComponent] = useState('')


    useEffect(() => {
        fetchCart()
    }, [])


    const fetchCart = async () => {
        try {
            const response = await fetch(`http://localhost:3006/cart/history`, { credentials: 'include' });
            if (response.status === 401) {
                try {
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
            setCart(data)
            let priceCalc = 0
            data.userCart.map((item) => {
                let itemPrice = item.product.price * item.quantity
                priceCalc += itemPrice;
            })
            setTotalPrice(priceCalc)
            setLoading(false);
        }
        catch (e) {
            console.log('Error fetching data')
        }
    }

    const handleHistoryClick = (date) => {
        setActiveComponent(date)
    }









    return (
        <Layout>
            <h1>History as</h1>
            <div className="cart_history">
                <div className="single_cart_history">
                    {cart.map((item) => {
                        const totalPrice = item.products.reduce((total, product) => total + product.product.price * product.quantity, 0);
                        return (
                            <div key={item.date}>
                                <p onClick={() => { handleHistoryClick(item.date) }}>{item.date}</p>
                                {activeComponent === item.date &&
                                    <>
                                        {item.products.map((item, index) => {
                                            const product = item.product
                                            return (
                                                <div className='singlehistory' key={index}>
                                                    <img src={product.picture} alt={product.name} key={product.picture} />
                                                    <p key={product.name}>{product.name}</p>
                                                    <p key={product.price}>{product.price}€</p>
                                                    <p key={item.quantity}>{item.quantity}</p>
                                                </div>
                                            )
                                        })}
                                        <p>Total Price: {totalPrice}€</p>
                                    </>
                                }
                            </div>
                        )
                    })}
                </div>
            </div>
        </Layout>
    )
}

export default CartHistory