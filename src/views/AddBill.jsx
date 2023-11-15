import React, { useState, useEffect } from "react";
import { BsPlusLg } from "react-icons/bs";
import { Button, Form } from "react-bootstrap";
import {
  addClient,
  addService,
  addProduct,
  removeItem,
  addBill,
  fetchClients,
  fetchServices,
  fetchProducts,
} from "../controllers/functions.js";

function AddBill() {
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedClientData, setSelectedClientData] = useState(null);
  const [selectedService, setSelectedService] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [clients, setClients] = useState([]);
  const [services, setServices] = useState([]);
  const [products, setProducts] = useState([]);
  const [totalBill, setTotalBill] = useState(0);
  const [clientAdded, setClientAdded] = useState(false);
  const [billItems, setBillItems] = useState([]);
  const [billId, setBillId] = useState(0);

  const user_id = localStorage.getItem("id");

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        const clientsData = await fetchClients(user_id);
        const servicesData = await fetchServices(user_id);
        const productsData = await fetchProducts(user_id);

        setClients(clientsData);
        setServices(servicesData);
        setProducts(productsData);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };

    fetchDataFromAPI();
  }, [user_id]);

  ////////////////////////////////////////////////////// ADD CLIENT
  const handleAddClient = () => {
    addClient(
      clients,
      selectedClient,
      clientAdded,
      setBillItems,
      setTotalBill,
      setSelectedClientData,
      setBillId
    );
    setClientAdded(true);
  };

  ////////////////////////////////////////////////////// ADD SERVICE
  const handleAddService = () => {
    addService(services, selectedService, setBillItems, setTotalBill);
  };

  ////////////////////////////////////////////////////// ADD PRODUCT
  const handleAddProduct = () => {
    addProduct(products, selectedProduct, setBillItems, setTotalBill);
  };

  ////////////////////////////////////////////////////// REMOVE ITEM
  const handleRemoveItem = (index) => {
    removeItem(
      billItems,
      totalBill,
      setBillItems,
      setTotalBill,
      setClientAdded
    )(index);
  };
  ////////////////////////////////////////////////////// ADD BILL
  const handleAddBill = () => {
    addBill(selectedClient, billItems, totalBill);
  };

  return (
    <div className="table-container">
      <div className="tb">
        <h2>Generar Factura</h2>
      </div>

      <div className="bill-container">
        <Form className="bill-form">
          <Form.Group className="bill-group">
            <Form.Select
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value)}
              className="bill-input"
            >
              <option value="" disabled>
                Seleccionar cliente
              </option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </Form.Select>
            <Button
              variant="primary"
              className="bill-button"
              type="button"
              onClick={() => {
                handleAddClient();
                setClientAdded(true);
              }}
            >
              Agregar Cliente
            </Button>
          </Form.Group>

          <Form.Group className="bill-group">
            <Form.Select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="bill-input"
            >
              <option value="" disabled>
                Seleccionar servicio
              </option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name}
                </option>
              ))}
            </Form.Select>
            <Button
              variant="primary"
              className="bill-button"
              type="button"
              onClick={handleAddService}
              disabled={!clientAdded}
              style={
                !clientAdded
                  ? {
                      backgroundColor: "var(--color1)",
                      border: "1px solid var(--color2)",
                      opacity: 0.5,
                      cursor: "not-allowed",
                    }
                  : {}
              }
            >
              Agregar Servicio
            </Button>
          </Form.Group>

          <Form.Group className="bill-group">
            <Form.Select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="bill-input"
            >
              <option value="" disabled>
                Seleccionar producto
              </option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </Form.Select>
            <Button
              variant="primary"
              className={`bill-button ${
                !selectedClientData ? "disabled-button" : ""
              }`}
              type="button"
              onClick={handleAddProduct}
              disabled={!clientAdded}
              style={
                !clientAdded
                  ? {
                      backgroundColor: "var(--color1)",
                      border: "1px solid var(--color2)",
                      opacity: 0.5,
                      cursor: "not-allowed",
                    }
                  : {}
              }
            >
              Agregar Producto
            </Button>
          </Form.Group>
        </Form>
        <div className="bill-table">
          <table>
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Producto / Servicio</th>
                <th>Precio U.</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody id="bill-table">
              {billItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.type === "Cliente" ? item.name : ""}</td>
                  <td>
                    {item.type === "Servicio" || item.type === "Producto"
                      ? item.name
                      : ""}
                  </td>
                  <td>{item.price}</td>
                  {/* Mostrar el precio total solo en la última fila */}
                  <td>
                    {item.type !== "Cliente" && index === billItems.length - 1
                      ? totalBill
                      : ""}
                  </td>
                  <td>
                    <a href="#" onClick={() => handleRemoveItem(index)}>
                      Eliminar
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="tb tb-bill">
        <span> </span>
        <button
          type="button"
          className="myButton"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          onClick={handleAddBill}
        >
          <BsPlusLg /> Generar Factura
        </button>
      </div>
    </div>
  );
}
export default AddBill;
