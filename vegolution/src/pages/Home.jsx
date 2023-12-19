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

      <h5>Descubre nuestras novedades:</h5>
      <div className="grid-container novedades-grid-container">

      <div className="grid-item">
        <Link to="/product/Producto1">
          <img
            src="https://images.ctfassets.net/uexfe9h31g3m/2vP66kV9AoqwuI4AGUuAWI/502d349f1e96229d0ea05c9e2b6f2f35/VSH.png?w=300&h=300&fm=webp&fit=thumb&q=100"
            alt="producto1"
            style={{ width: '300px', height: '500px' }}
          />
        </Link>
      </div>

        <div className="grid-item">
        <Link to="/Product/Producto2">
        <img
        src="https://www.vegansisters.org/wp-content/uploads/2020/12/Richmond-Bacon-768x768.jpeg" 
        alt="producto2"
        style={{ width: '300px', height: '500px' }}
        />
        </Link>
        </div>

        <div className="grid-item">
        <Link to="/Product/Producto3">
        <img
        src="https://www.velivery.com/media/image/cf/fc/ea/A007490_600x600.png" 
        alt="producto3"
        style={{ width: '300px', height: '500px' }}
        />
        </Link>
        </div>

        <div className="grid-item">
        <Link to="/Product/Producto4">
        <img
        src="https://images.kglobalservices.com/www.morningstarfarms.com/en_us/product/product_9215065/prod_img-10029097_chikn_tenders_sm.png" 
        alt="producto4"
        style={{ width: '300px', height: '500px' }}
        />
        </Link>      
        </div>
      </div>

      <h5>Lo que no nos puede faltar: </h5>
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