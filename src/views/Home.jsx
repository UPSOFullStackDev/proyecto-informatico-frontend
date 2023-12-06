// FUNCTIONS IMPORTS
import React, { useState, useEffect } from "react";
import {
  fetchProductsRank,
  fethcProductsLowStock,
} from "../controllers/productsFunctions.js";
import { fetchServicesRank } from "../controllers/servicesFunctions.js";
import { fetchClientsRank } from "../controllers/clientsFunctions.js";
import { getDataForCards } from "../controllers/homeFunctions.js";
// REACT ICONS, PLOTLY, SONNER, COMPONENTS IMPORTS
import {
  BsPeopleFill,
  BsFillBellFill,
  BsGraphUpArrow,
  BsFillBarChartFill,
} from "react-icons/bs";
import Plotly from "react-plotly.js";
import Loader from "../components/Loader.jsx";

import Products from "./Products.jsx";

function Home() {
  const [productsRank, setProductsRank] = useState([]); // Estado para almacenar los datos del ranking productos
  const [servicesRank, setServicesRank] = useState([]); // Estado para almacenar los datos del ranking servicios
  const [clientsRank, setClientsRank] = useState([]); // Estado para almacenar los datos del ranking clientes
  const [productsRankLowStock, setProductsRankLowStock] = useState([]); // Estado para almacenar los datos deproductos con stock bajo
  const [isLoading, setIsLoading] = useState(false);  // Estado para almacenar el estado de carga de los datos

//////////////////////////////////////// USE EFFECT - FETCH RANKING DATA
  // El hook useEffect se utiliza para realizar operaciones después de que la vista se ha renderizado.
  // Aquí se establece el estado de isLoading en true para indicar la carga de datos.
  // La función 'fetchData' se encarga de realizar múltiples solicitudes asíncronas para obtener datos de clasificación
  // de productos, servicios, clientes y productos con bajo stock mediante las funciones correspondientes.
  // Si todas las solicitudes tienen éxito, actualiza los estados correspondientes con los datos obtenidos.
  // En caso de error durante alguna de las solicitudes, se muestra el error en la consola.
  // Finalmente, se establece el estado de isLoading en false indicando la finalización de la carga.
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const productsRankData = await fetchProductsRank();
        const servicesRankData = await fetchServicesRank();
        const clientsRankData = await fetchClientsRank();
        const productsRankLowStockData = await fethcProductsLowStock();

        setProductsRank(productsRankData);
        setServicesRank(servicesRankData);
        setClientsRank(clientsRankData);
        setProductsRankLowStock(productsRankLowStockData);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);


////////////////////////////////////// DATA FOR CHARTS
  // Estos bloques de código generan datos específicos para los gráficos a partir de las clasificaciones de productos y servicios.
  // Utilizan la función 'Array.isArray' para verificar si los datos de clasificación están disponibles.
  // Si es así, se utiliza 'slice' para limitar los datos a los primeros 3 elementos, pero puedes ajustar el límite según tus necesidades.
  // Luego, el método 'map' se utiliza para transformar cada elemento de la clasificación en un objeto con propiedades específicas necesarias
  // para los gráficos, como 'name', 'sold_sum' y 'sold_count'. Los resultados se almacenan en las variables 'dataForCharts' y 'dataForChartsServices'.

  // La data para los gráficos es obtenida desde products que hace una consulta a la API
  const dataForCharts = Array.isArray(productsRank)
    ? productsRank
        .slice(0, 3) // Limita a los primeros 3 productos, puedes ajustar el límite según tus necesidades
        .map((product) => ({
          name: product.name,
          sold_sum: product.sold_sum,
          sold_count: product.sold_count,
        }))
    : [];

  // Data para los gráficos obtenida desde services que hace una consulta a la API
  const dataForChartsServices = Array.isArray(servicesRank)
    ? servicesRank
        .slice(0, 3) // Limita a los primeros 3 productos, puedes ajustar el límite según tus necesidades
        .map((product) => ({
          name: product.name,
          sold_sum: product.sold_sum,
          sold_count: product.sold_count,
        }))
    : [];
////////////////////////////////////// DATA FOR CARDS
  // Estos bloques de código generan datos para las tarjetas a partir de las clasificaciones de productos, servicios, clientes y productos con bajo stock.
  // Utilizan la función 'getDataForCards' para procesar los datos y obtener la información necesaria para las tarjetas.
  // Los resultados se almacenan en las variables 'dataForCardsProduct', 'dataForCardsService', 'dataForCardsClient' y 'dataForCardsProductLowStock'.

  const dataForCardsProduct = getDataForCards(productsRank);
  const dataForCardsService = getDataForCards(servicesRank);
  const dataForCardsClient = getDataForCards(clientsRank);
  const dataForCardsProductLowStock = getDataForCards(productsRankLowStock);

////////////////////////////////////// RENDERIZACIÓN DE LA VISTA PRINCIPAL
  // Este bloque de código representa la renderización de la vista principal de la aplicación.
  // Contiene secciones para mostrar tarjetas con información relevante, gráficos y la sección de productos (Products.jsx).
  return (
    <main className="main-container">
      <div className="main-title">
        <h3></h3>
      </div>

      <div className="main-cards">
        <div className="card">
          <div className="card-inner">
            <h4>Producto más vendido</h4>
            <BsFillBarChartFill className="card_icon" />
          </div>
          {isLoading ? (
            <Loader />
          ) : (
            <div>
              <h3>{dataForCardsProduct.name}</h3>{" "}
              <h4>Ingresos generados $ {dataForCardsProduct.sold_sum}</h4>
            </div>
          )}
        </div>
        <div className="card">
          <div className="card-inner">
            <h4>Servicio más vendido</h4>
            <BsGraphUpArrow className="card_icon" />
          </div>
          {isLoading ? (
            <Loader />
          ) : (
            <div>
              {" "}
              <h3>{dataForCardsService.name}</h3>{" "}
              <h4>Ingresos generados $ {dataForCardsService.sold_sum}</h4>
            </div>
          )}
        </div>
        <div className="card">
          <div className="card-inner">
            <h4>Cliente del mes</h4>
            <BsPeopleFill className="card_icon" />
          </div>
          {isLoading ? <Loader /> : <h2>{dataForCardsClient.name}</h2>}
        </div>
        <div className="card">
          <div className="card-inner">
            <h4>Alerta Stock</h4>
            <BsFillBellFill className="card_icon" />
          </div>
          {isLoading ? (
            <Loader />
          ) : (
            <div>
              {" "}
              <h3>{dataForCardsProductLowStock.name}</h3>{" "}
              <h4>Stock: {dataForCardsProductLowStock.stock}</h4>
            </div>
          )}
        </div>
      </div>
      <Products />

      <div className="charts">
        {dataForCharts.length > 0 && (
          <Plotly
            className="ploter"
            data={[
              {
                type: "bar",
                x: dataForCharts.map((item) => item.name),
                y: dataForCharts.map((item) => item.sold_sum),
                name: "Ingreso total generado",
                marker: {
                  color: "rgba(255, 255, 255, 0.7)",
                },
              },
              {
                type: "bar",
                x: dataForCharts.map((item) => item.name),
                y: dataForCharts.map((item) => item.sold_count),
                name: "Unidades vendidas",
                marker: {
                  color: "rgb(250, 122, 144)",
                },
              },
            ]}
            layout={{
              title: "Ranking de Productos",
              xaxis: { title: "Productos" },
              yaxis: { title: "Ingreso Total" },
              paper_bgcolor: "rgba(143, 215, 239, 0.1)",
              plot_bgcolor: "rgba(143, 215, 239, 0.1)",
              font: {
                family: "sans-serif",
                color: "rgba(255, 255, 255, 0.8)",
              },
            }}
          />
        )}
        {dataForCharts.length > 0 && (
          <Plotly
            className="ploter"
            data={[
              {
                type: "bar",
                x: dataForChartsServices.map((item) => item.name),
                y: dataForChartsServices.map((item) => item.sold_sum),
                mode: "lines+markers",
                name: "Ingreso generado",
                marker: {
                  color: "rgba(255, 255, 255, 0.7)",
                },
              },

              {
                type: "bar",
                x: dataForChartsServices.map((item) => item.name),
                y: dataForChartsServices.map((item) => item.sold_count),
                name: "Unidades vendidas",
                marker: {
                  color: "rgb(250, 122, 144)",
                },
              },
              {
                type: "scatter",
                x: dataForChartsServices.map((item) => item.name),
                y: dataForChartsServices.map((item) => item.sold_sum),
                mode: "lines+markers",
                name: "Ingreso Máximo",
                marker: {
                  color: "rgba(255, 255, 255, 0.7)",
                  size: 8, // Ajusta el tamaño de los puntos
                },
              },
            ]}
            layout={{
              title: "Ranking de Servicios",
              xaxis: { title: "Servicios" },
              yaxis: { title: "Ingreso Total" },
              paper_bgcolor: "rgba(143, 215, 239, 0.1)",
              plot_bgcolor: "rgba(143, 215, 239, 0.1)",
              font: {
                family: "sans-serif",
                color: "rgba(255, 255, 255, 0.8)",
              },
            }}
          />
        )}
      </div>
    </main>
  );
}

export default Home;
