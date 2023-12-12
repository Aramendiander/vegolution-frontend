import { useState, useEffect } from "react";

const SingleProduct = () => {
    const [data, setData] = useState({});

    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async () => {
        try {
            const response = await fetch("http://localhost:3006/product/Heura%20palitos%20de%20no%20pescado");
            const productData = await response.json();
            console.log("Datos del producto:", productData);
            setData(productData);
        } catch (err) {
            console.error("Error obteniendo información del producto", err);
        }
    };

    return (
        <div>
            <p>Mostrando información de producto...</p>
            <p>{JSON.stringify(data)}</p>
        </div>
    );
};



export default SingleProduct;