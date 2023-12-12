import React from 'react'
import Layout from '../components/Layout'
import "../styles/Home.css"

const Home = () => {
  return (
    <Layout>
      <div className="search-bar">
        <input className="search-input" type="text" placeholder="Busca un producto" />
        <button className="search-button">Buscar</button>
      </div>
      <div className="grid-container">
        <h1>Categorías</h1>
      </div>
    </Layout>
  );
};

export default Home