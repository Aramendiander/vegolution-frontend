import { React, useEffect, useState } from 'react'
import { Navigate, Link, useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'

const Cart = () => {
    const [userId, setUserId] = useState('')
    const [cart, setCart] = useState([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)
    const [totalPrice, setTotalPrice] = useState(0)

    const navigate = useNavigate();

    useEffect(() => {
        fetchCart()
        const body = document.querySelector('body');
        body.classList.add('cart_page');
    }, [])



    const fetchCart = async () => {
        try {
            const response = await fetch(`http://localhost:3006/cart/`, { credentials: 'include' });
            if (response.status === 401) {
                    navigate('/login');
            }

            if (response.status === 404) {
                setError('Not found');
                return error;
            }

            const data = await response.json();
            setCart(data.userCart)
            console.log(data.userCart)
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


    const deleteFromCart = async (productId) => {
        try {
            const response = await fetch('http://localhost:3006/cart/delete-from-cart', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productId }),
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Error deleting product from cart');
            }
            fetchCart();
        } catch (error) {
            console.error('Error:', error);
        }
    };


    const purchaseCart = async () => {
        try {
            const response = await fetch('http://localhost:3006/cart/purchase', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Error purchasing cart');
            }
            fetchCart();
        } catch (error) {
            console.error('Error:', error);
        }
    }


    return (
        <Layout>
            {loading ? null : (
                <>
                    <Link to='/cart/history'>History</Link>
                    <div className='cart'>
                        <div className='cartitems'>
                            <h2>Cart</h2>
                            {cart.map((item) => {
                                let itemPrice = item.product.price * item.quantity
                                return (

                                    <div className="cartitem" key={item._id}>
                                        <img src={item.product.picture} alt={item.product.name} />
                                        <div className="cartitem_name">
                                            <p>Product:</p>
                                            <p>{item.product.name}</p>
                                        </div>
                                        <div>
                                            <p>Total price:</p>
                                            <p>{item.product.price}€</p>

                                        </div>
                                        <div>
                                            <p>Quantity</p>
                                            <p>{item.quantity}</p>
                                        </div>
                                        <div>
                                            <button onClick={() => deleteFromCart(item.product._id)}>Delete</button>
                                        </div>
                                    </div>

                                )
                            })}
                        </div>
                        <div className='checkout'>
                            <h2>Checkout</h2>
                            <p>Total:</p>
                            <p>{totalPrice}€</p>
                            <button onClick={() => purchaseCart()}>Purchase</button>
                        </div>
                    </div>
                </>
            )}
        </Layout>
    )
}

export default Cart