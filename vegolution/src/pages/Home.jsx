import React, {useState, useEffect} from 'react'
import Layout from '../components/Layout'
import { Link } from 'react-router-dom';
import "../styles/Home.css";


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
    <p>{name}</p>
    <img src={imageSrc} alt={altText} />
  </Link>
);

const Home = () => {

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    //aquí el redireccionado
    console.log('Búsqueda realizada!');
  };

  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
    try {
      const stockedProducts = await fetch('http://localhost:3006/');
      const results = await stockedProducts.json()
      setProducts(results);
    } catch (error) {
      console.error('Error obteniendo lista de productos', error);
    }
  }

  
console.log(products)
  return (
    <Layout>
      <form onSubmit={handleSearchSubmit} className="search-bar">
        <input className="search-input" type="text" placeholder="Busca un producto" />
        <button type="submit" className="search-button">
          Buscar
        </button>
      </form>

      {/* <h5>Categorías</h5> */}

      <div className="category-buttons">
      <CategoryButton to="/Alimentacion" imageSrc="./public/images/buttons/alimentacion.png" categoryText="Alimentación" />

      <CategoryButton to="/Frescos" imageSrc="./public/images/buttons/frescos.png" categoryText="Frescos" />

      <CategoryButton to="/Bebidas" imageSrc="./public/images/buttons/bebidas.png" categoryText="Bebidas" />

      <CategoryButton to="/Preparados" imageSrc="./public/images/buttons/preparados.png" categoryText="Preparados" />

      <CategoryButton to="/Ofertas" imageSrc="./public/images/buttons/ofertas.png" categoryText="Ofertas" />
      </div>

      <h5>Novedades:</h5>
      <div className="grid-container novedades-grid-container">

        <div className="grid-item">
        <ProductLink
        to="/SingleProduct"
        imgSrc="https://www.foodnavigator.com/var/wrbm_gb_food_pharma/storage/images/media/images/150271_cerdo-chorizo-burgers-220g-rn___chilled-uk-bosh-1/15368172-1-eng-GB/150271_Cerdo-Chorizo-Burgers-220g-RN___chilled-UK-BOSH-1.png"
        altText="producto1"
        description="Short description"
        /> 
        </div>

        <div className="grid-item">
        <ProductLink
        to="/Product"
        imgSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY854EEPTd46tD73QLNJAV7KZLq1SIqe2jIVHPbKyOwYnhjUpWv1RtiaGNSUUWsI-NKqE&usqp=CAU" 
        altText="producto2"
        description="Short description"
        />
        </div>

        <div className="grid-item">
        <ProductLink
        to="/Product"
        imgSrc="https://d3gr7hv60ouvr1.cloudfront.net/CACHE/images/products/d23dd42a532a4348a589dbc823b4090b/d728cda87d0d0f35199980ead9511cac.jpg" altText="producto3"
        description="Short description"
        />
        </div>

        <div className="grid-item">
        <ProductLink
        to="/Product"
        imgSrc="https://apiumplanet.com/wp-content/uploads/2023/04/22046-800x560.jpg" 
        altText="producto4"
        description="Short description"
        />
        </div>
      </div>

      <h5>Nuestros productos</h5>
        <div className="grid-container products-grid-container">
          {products.map((product) => (
          <ProductLink
            key={product._id}
            to={`/product/${encodeURIComponent(product.name)}`}
            state={{from: product.name}}
            imgSrc={product.picture}
            altText={product.name}
            name={product.name}
            imageSrc={product.picture}
          />
            ))}
        </div>


    </Layout>
  )};
export default Home