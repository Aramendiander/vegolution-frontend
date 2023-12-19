import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import "../Styles/SingleProduct.css";


const SingleProduct = () => {
  const [data, setData] = useState({});
  const { name } = useParams()

  const navigate = useNavigate();


  const CategoryButton = ({ to, imageSrc, categoryText }) => (
    <Link to={to} className="category-button">
      <div>
        <img src={imageSrc} alt="Category Icon" width="100" height="100" />
        <p>{categoryText}</p>
      </div>
    </Link>
  );

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3006/product/${encodeURIComponent(name)}`);
        const productData = await response.json();
        setData(productData);
      } catch (err) {
        console.error("Error obteniendo información del producto", err);
      }
    };

    fetchProduct();
  }, [name]);



  const handleAddToCart = async () => {
    try {
      const productId = data._id;
      const response = await fetch('http://localhost:3006/cart/add-to-cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId: productId, quantity: 1, }),
        credentials: 'include',
      });

      if (response.status === 401) {
            navigate('/login');
      }
      
      if (!response.ok) {
        throw new Error('Error adding product to cart');
      }

      alert('Producto añadido al carrito');

    }
    catch(e){
      console.error('Error:', e);
    }
  };



  return (
    <Layout>
      <div className="search-bar">
        <input className="search-input" type="text" placeholder="Busca un producto" />
        <button type="submit" className="search-button">
          Buscar
        </button>
      </div>

      <div className="category-buttons">
        <CategoryButton to="/Alimentacion" imageSrc="/images/buttons/alimentacion.png" categoryText="Alimentación" />
        <CategoryButton to="/Frescos" imageSrc="/images/buttons/frescos.png" categoryText="Frescos" />
        <CategoryButton to="/Bebidas" imageSrc="/images/buttons/bebidas.png" categoryText="Bebidas" />
        <CategoryButton to="/Preparados" imageSrc="/images/buttons/preparados.png" categoryText="Preparados" />
        <CategoryButton to="/Ofertas" imageSrc="/images/buttons/ofertas.png" categoryText="Ofertas" />
      </div>

      <div className="single-product-container">
        <h2>{data.name}</h2>
        <div className="product-details">
          <div className="product-main-info">
            <img src={data.picture} alt={data.name} className="product-image" />
            <div className="product-info">
              <p className="short-description">{data.shortdescription}</p>
              <p className="price"><strong>Precio: </strong>{data.price}€</p>
              <button onClick={handleAddToCart} className="add-to-cart-button">
                Añadir al carrito
              </button>
            </div>
          </div>
          <div className="product-description">
            <strong>Descripción:</strong> {data.longdescription}
          </div>
        </div>
      </div>
    </Layout>
  );
}



export default SingleProduct;