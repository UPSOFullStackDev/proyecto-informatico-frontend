import React, { useState, useEffect } from "react";
import { fetchProducts } from "../controllers/functions.js";
import {
  BsPeopleFill,
  BsFillBellFill,
  BsGraphUpArrow,
  BsFillBarChartFill,
} from "react-icons/bs";

import Plotly from "react-plotly.js";
import Products from "./Products.jsx";

function Home() {
  const [products, setProducts] = useState([]);
  const user_id = localStorage.getItem("id");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await fetchProducts(user_id);
        setProducts(productsData);
      } catch (error) {
        console.error("Error al cargar datos de productos:", error);
      }
    };

    fetchData();
  }, [user_id]);

  // Data para los graficos obtenida desde products
  const dataForCharts = products
  .filter((product) => product.price > 20) // si usamos esto filtramos y agregamos los productos que su precio sea mayor a 100
  .slice(0, 5) // Limita a los primeros 5 productos, podriamos usar cualquier logica diferente aca
  .map((product) => ({
    name: product.name,
    price: product.stock,
    stock: product.price,
  }));
  
  return (
    <main className="main-container">
      <div className="main-title">
        <h3>DASHBOARD</h3>
      </div>

      <div className="main-cards">
        <div className="card">
          <div className="card-inner">
            <h4>Ventas Diarias</h4>
            <BsFillBarChartFill className="card_icon" />
          </div>
          <h2>$ 500.000</h2>
        </div>
        <div className="card">
          <div className="card-inner">
            <h4>Ventas Mensuales</h4>
            <BsGraphUpArrow className="card_icon" />
          </div>
          <h3>$ 12.970.000</h3>
        </div>
        <div className="card">
          <div className="card-inner">
            <h4>Nuevos Clientes</h4>
            <BsPeopleFill className="card_icon" />
          </div>
          <h3>33</h3>
        </div>
        <div className="card">
          <div className="card-inner">
            <h4>Alerta Stock</h4>
            <BsFillBellFill className="card_icon" />
          </div>
          <h3>5</h3>
        </div>
      </div>
      <Products />

      <div className="charts">
        <Plotly
          className="ploter"
          data={[
            {
              type: "bar",
              x: dataForCharts.map((item) => item.name),
              y: dataForCharts.map((item) => item.price),
              name: "Precio",
              marker: {
                color: 'rgb(143, 215, 239)',
              },
            },
            {
              type: "bar",
              x: dataForCharts.map((item) => item.name),
              y: dataForCharts.map((item) => item.stock),
              name: "Stock",
              marker: {
                color: 'rgb(250, 122, 144)',
              },
            },
          ]}
          layout={{
            title: "Gráfico de Barras",
            xaxis: { title: "Productos" },
            yaxis: { title: "Precio y Stock" },
            paper_bgcolor: "rgba(143, 215, 239, 0.1)",
            plot_bgcolor: "rgba(143, 215, 239, 0.1)",
            font: {
              family: "sans-serif",
              color: "rgba(255, 255, 255, 0.8)",
            },
          }}
        />

        <Plotly
          className="ploter"
          data={[
            {
              type: "scatter",
              x: dataForCharts.map((item) => item.name),
              y: dataForCharts.map((item) => item.price),
              mode: "lines+markers",
              name: "Precio",
              marker: {
                color: 'rgb(143, 215, 239)',
              },
            },
            {
              type: "scatter",
              x: dataForCharts.map((item) => item.name),
              y: dataForCharts.map((item) => item.stock),
              mode: "lines+markers",
              name: "STOCK",
              marker: {
                color: 'rgb(250, 122, 144)',
              },
            },
          ]}
          layout={{
            title: "Gráfico Lineal",
            xaxis: { title: "Productos" },
            yaxis: { title: "Precio y Stock" },
            paper_bgcolor: "rgba(143, 215, 239, 0.1)",
            plot_bgcolor: "rgba(143, 215, 239, 0.1)",
            font: {
              family: "sans-serif",
              color: "rgba(255, 255, 255, 0.8)",
            },
          }}
        />
      </div>
    </main>
  );
}

export default Home;
