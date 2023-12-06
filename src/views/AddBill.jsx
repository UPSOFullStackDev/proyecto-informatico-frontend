import React, { useState, useEffect } from "react";
import { BsPlusLg } from "react-icons/bs";
import { Button, Form } from "react-bootstrap";
import { fetchClients } from "../controllers/clientsFunctions.js";
import { fetchServices } from "../controllers/servicesFunctions.js";
import { fetchProducts } from "../controllers/productsFunctions.js";
import {
  addClient,
  addService,
  addProduct,
  removeItem,
  addBill,
  getButtonStyle,
} from "../controllers/billsFunctions.js";
import GridLoader from "react-spinners/GridLoader";
import { Toaster } from "sonner";

function AddBill() {
  const [selectedClient, setSelectedClient] = useState(""); // Estado para el cliente seleccionado
  const [selectedClientData, setSelectedClientData] = useState(null); // Estado para los datos del cliente seleccionado
  const [clientAdded, setClientAdded] = useState(false); // Estado para el cliente agregado
  const [selectedService, setSelectedService] = useState(""); // Estado para el servicio seleccionado
  const [selectedProduct, setSelectedProduct] = useState(""); // Estado para el producto seleccionado
  const [clients, setClients] = useState([]); // Estado para los clientes
  const [services, setServices] = useState([]); // Estado para los servicios
  const [products, setProducts] = useState([]); // Estado para los productos
  const [totalBill, setTotalBill] = useState(0); // Estado para el total de la factura
  const [billItems, setBillItems] = useState([]); // Estado para los items de la factura
  const [loading, setLoading] = useState(false); // Estado para el spinner

  // useEffect para obtener los datos por única vez al cargar la vista
  // Activa un spinner durante la obtención de datos de la API.
  useEffect(() => {
    setLoading(true);

    // Función asincrónica para obtener los datos de la API de clientes, servicios y productos.
    const fetchDataFromAPI = async () => {
      try {
        // Obtener datos de clientes, servicios y productos de la API.
        const clientsData = await fetchClients();
        const servicesData = await fetchServices();
        const productsData = await fetchProducts();

        // Guardar los datos obtenidos en los estados correspondientes.
        setClients(clientsData);
        setServices(servicesData);
        setProducts(productsData);
      } catch (error) {
        // Manejar error en la obtención de datos, mostrándolo en la consola.
        console.error("Error al cargar datos:", error);
      } finally {
        // Desactivar spinner independientemente de si la obtención de datos fue exitosa o no.
        setLoading(false);
      }
    };

    fetchDataFromAPI(); // Ejecutar la función para obtener los datos de la API.
  }, []);

  ///////////////////////////////////////////////////////// ADD CLIENT
  // La función 'handleAddClient' maneja la lógica asociada a la adición de un cliente. Invoca la función 'addClient',
  // proveniente de 'controllers/functions.js', y pasa los siguientes parámetros:
  // - clients: El estado actual de los clientes.
  // - selectedClient: El cliente seleccionado.
  // - clientAdded: El estado del cliente agregado.
  // - setBillItems: La función para establecer los elementos de la factura.
  // - setTotalBill: La función para establecer el total de la factura.
  // - setSelectedClientData: La función para establecer los datos del cliente seleccionado.
  const handleAddClient = () => {
    // Función para agregar un cliente
    addClient(
      clients,
      selectedClient,
      clientAdded,
      setBillItems,
      setTotalBill,
      setSelectedClientData
    );
  };

//////////////////////////////////////////// ADD SERVICE
  // La función 'handleAddService' maneja la lógica asociada a la adición de un servicio.
  // Invoca la función 'addService' proveniente de 'controllers/functions.js' y pasa los siguientes parámetros:
  //   - services: El estado actual de los servicios.
  //   - selectedService: El servicio seleccionado.
  //   - setBillItems: La función para establecer los elementos de la factura.
  //   - setTotalBill: La función para establecer el total de la factura.

  const handleAddService = () => {
    addService(services, selectedService, setBillItems, setTotalBill);
  };

//////////////////////////////////////////// ADD PRODUCT
  // La función 'handleAddProduct' maneja la lógica asociada a la adición de un producto.
  // Invoca la función 'addProduct' proveniente de 'controllers/functions.js' y pasa los siguientes parámetros:
  //   - products: El estado actual de los productos.
  //   - selectedProduct: El producto seleccionado.
  //   - setBillItems: La función para establecer los elementos de la factura.
  //   - setTotalBill: La función para establecer el total de la factura.

  const handleAddProduct = () => {
    addProduct(products, selectedProduct, setBillItems, setTotalBill);
  };
//////////////////////////////////////////// REMOVE ITEM
  // La función 'handleRemoveItem' maneja la lógica asociada a la eliminación de un elemento de la factura.
  // Invoca la función 'removeItem' proveniente de 'controllers/functions.js' y pasa los siguientes parámetros:
  //   - billItems: Los elementos actuales de la factura.
  //   - totalBill: El total actual de la factura.
  //   - setBillItems: La función para establecer los elementos de la factura.
  //   - setTotalBill: La función para establecer el total de la factura.
  //   - index: El índice del elemento a eliminar.

  const handleRemoveItem = (index) => {
    removeItem(billItems, totalBill, setBillItems, setTotalBill)(index);
  };

  //////////////////////////////////////// ADD BILL
  // La función 'handleAddBill' maneja la lógica asociada a la adición de una factura.
  // Invoca la función 'addBill' proveniente de 'controllers/functions.js' y pasa los siguientes parámetros:
  //   - selectedClientData: Los datos del cliente seleccionado.
  //   - billItems: Los elementos actuales de la factura.
  //   - totalBill: El total actual de la factura.

  const handleAddBill = () => {
    addBill(selectedClientData, billItems, totalBill);
    setBillItems([]); // Limpiar los items de la factura
    setClientAdded(false); // Setear el estado del cliente agregado a false
  };

  return (
    // Retornar el HTML
    <div className="table-container">
      <div className="tb">
        <h2>Generar Factura</h2>
      </div>
      <div className="bill-container">
        {loading ? ( // Si loading es true
          <GridLoader // Mostrar el spinner
            color={"rgba(143, 215, 239, 0.9)"}
            loading={loading}
            size={10}
            speedMultiplier={1}
            aria-label="Loading Spinner"
            data-testid="loader"
            cssOverride={{ marginLeft: "45%" }}
          />
        ) : (
          // Si loading es false
          <Form className="bill-form">
            {" "}
            {/* Mostrar formulario para agregar un cliente, servicio o producto */}
            <Form.Group className="bill-group">
              <Form.Select
                value={selectedClient} // Valor del cliente seleccionado
                onChange={(e) => setSelectedClient(e.target.value)} // Función para setear el cliente seleccionado
                className="bill-input"
              >
                <option value="" disabled>
                  Seleccionar cliente
                </option>
                {clients.map(
                  (
                    client // Recorrer los clientes
                  ) => (
                    <option key={client.id} value={client.id}>
                      {" "}
                      {/* Mostrar los clientes */}
                      {client.name} {client.surname}{" "}
                      {/* Mostrar el nombre y apellido del cliente */}
                    </option>
                  )
                )}
              </Form.Select>
              <Button
                variant="primary"
                className="bill-button"
                type="button"
                onClick={() => {
                  // Al hacer click en el botón
                  setClientAdded(true); // Setear el estado del cliente agregado a true
                  handleAddClient(); // Llamar a la función handleAddClient
                }}
                disabled={!selectedClient} // Deshabilitar el botón si no hay un cliente seleccionado
                style={getButtonStyle(!selectedClient)} // Obtener el estilo del botón
              >
                Agregar Cliente
              </Button>
            </Form.Group>
            <Form.Group className="bill-group">
              <Form.Select // Select para seleccionar un servicio
                value={selectedService} // Valor del servicio seleccionado
                onChange={(e) => setSelectedService(e.target.value)} // Función para setear el servicio seleccionado
                className="bill-input"
              >
                <option value="" disabled>
                  Seleccionar servicio
                </option>
                {services.map(
                  (
                    service // Recorrer los servicios
                  ) => (
                    <option key={service.id} value={service.id}>
                      {" "}
                      {/* Mostrar los servicios */}
                      {service.name} {/* Mostrar el nombre del servicio */}
                    </option>
                  )
                )}
              </Form.Select>
              <Button // Botón para agregar el servicio seleccionado
                variant="primary"
                className="bill-button"
                type="button"
                onClick={handleAddService} // Al hacer click en el botón llamar a la función handleAddService
                disabled={!clientAdded} // Deshabilita el botón si no hay un cliente agregado
                style={getButtonStyle(!clientAdded)} // Obtener el estilo del botón dependiendo si hay cliente agregado o no
              >
                Agregar Servicio
              </Button>
            </Form.Group>
            <Form.Group className="bill-group">
              <Form.Select // Select para seleccionar un producto
                value={selectedProduct} // Valor del producto seleccionado
                onChange={(e) => setSelectedProduct(e.target.value)} // Función para setear el producto seleccionado
                className="bill-input"
              >
                <option value="" disabled>
                  Seleccionar producto
                </option>
                {products.map(
                  (
                    product // Recorrer los productos
                  ) => (
                    <option key={product.id} value={product.id}>
                      {" "}
                      {/* Usamos los productos recorridos */}
                      {product.name} {/* Mostrar el nombre de cada producto */}
                    </option>
                  )
                )}
              </Form.Select>
              <Button // Botón para agregar el producto seleccionado
                variant="primary"
                className="bill-button"
                type="button"
                onClick={handleAddProduct} // Al hacer click en el botón llamar a la función handleAddProduct
                disabled={!clientAdded} // Deshabilita el botón si no hay un cliente agregado
                style={getButtonStyle(!clientAdded)} // Obtener el estilo del botón dependiendo si hay cliente agregado o no
              >
                Agregar Producto
              </Button>
            </Form.Group>
          </Form>
        )}

        <div className="bill-table">
          {" "}
          {/* Tabla para mostrar los items de la factura */}
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
              {billItems.map(
                (
                  item,
                  index // Recorrer los items de la factura
                ) => (
                  <tr key={index}>
                    {" "}
                    {/* Mostrar los items de la factura */}
                    <td>{item.type === "Cliente" ? item.name : ""}</td>{" "}
                    {/* Mostrar el nombre del cliente solo en la primera fila */}
                    <td>
                      {item.type === "Servicio" || item.type === "Producto" // Mostrar el nombre del producto o servicio
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
                      {item.type !== "Cliente" && ( // Mostrar el botón de eliminar solo en las filas que no sean del cliente
                        <a href="#" onClick={() => handleRemoveItem(index)}>
                          {" "}
                          {/* Al hacer click en el botón llamar a la función handleRemoveItem */}
                          Eliminar
                        </a>
                      )}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="tb tb-bill">
        <span> </span>
        <button // Botón para generar la factura
          type="button"
          className="myButton"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          disabled={!clientAdded} // Deshabilita el botón si no hay un cliente agregado
          style={getButtonStyle(!clientAdded)} // Obtener el estilo del botón dependiendo si hay cliente agregado o no
          onClick={handleAddBill} // Al hacer click en el botón llamar a la función handleAddBill
        >
          <BsPlusLg /> Generar Factura
        </button>
      </div>
      <Toaster position="top-right" duration={900} theme="dark" richColors />{" "}
      {/* Toaster  para cuando se esta generando la factura */}
    </div>
  );
}
export default AddBill;
