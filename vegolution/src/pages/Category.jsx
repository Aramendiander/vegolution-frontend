import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { Link } from 'react-router-dom';
import "../Styles/Home.css";


const CategoryButton = ({ to, imageSrc, categoryText }) => (
    <Link to={to} className="category-button">
        <div>
            <img src={imageSrc} alt="Category Icon" width="100" height="100" />
            <p>{categoryText}</p>
        </div>
    </Link>
);

const ProductLink = ({ to, imageSrc, altText, name, productData }) => (
    <Link to={{ pathname: to, state: { productData } }} className="grid-item">
        <img src={imageSrc} alt={altText} />
        <p>{name}</p>
    </Link>
);

const Category = () => {


    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const stockedProducts = await fetch('http://localhost:3006/category/heura');
            const results = await stockedProducts.json()
            setProducts(results);
        } catch (error) {
            console.error('Error obteniendo lista de productos', error);
        }
    }

    const ProductLink = ({ to, imageSrc, altText, name, productData }) => (
        <Link to={{ pathname: to, state: { productData } }} className="grid-item">
            <img src={imageSrc} alt={altText} />
            <p>{name}</p>
        </Link>
    );

    console.log(products)

    return (
        <Layout>
            <div className="category-buttons">
                <CategoryButton to="/Alimentacion" imageSrc="/images/buttons/alimentacion.png" categoryText="Alimentación" />
                <CategoryButton to="/Frescos" imageSrc="/images/buttons/frescos.png" categoryText="Frescos" />
                <CategoryButton to="/Bebidas" imageSrc="/images/buttons/bebidas.png" categoryText="Bebidas" />
                <CategoryButton to="/Preparados" imageSrc="/images/buttons/preparados.png" categoryText="Preparados" />
                <CategoryButton to="/Ofertas" imageSrc="/images/buttons/ofertas.png" categoryText="Ofertas" />
            </div>
            <h1>Category</h1>
            <div className="grid-container products-grid-container">
                {products.map((product) => (
                    <ProductLink
                        key={product._id}
                        to={`/product/${encodeURIComponent(product.name)}`}
                        state={{ from: product.name }}
                        imgSrc={product.picture}
                        altText={product.name}
                        name={product.name}
                        imageSrc={product.picture}
                    />
                ))}
            </div>
        </Layout>
    )
};
export default Category