import { fetchData, getRequestOptions } from "./utils.js";
import { user_id, token } from "./localStorage"
import { toast } from "sonner";
import { billsUrl } from "./url.routes.js";
/**
 * Módulo que contiene funciones relacionadas con la gestión de facturas, clientes y productos.
 * @module billsFunctions
*/

/**
 * Función que obtiene la lista de todas las facturas del usuario actual.
 * @async
 * @function getBills
 * @returns {Promise<Array>} Una promesa que resuelve a un array de objetos representando las facturas.
 */
function getBills(){
    return fetchData(billsUrl, getRequestOptions())
      .then((data) => {
        return data
      })
      .catch((error) => {
        console.error("Error al cargar las facturas:", error);
        return [];
      });
};

/**
 * Función que obtiene los detalles de una factura específica.
 * @async
 * @function getBill
 * @param {number} id - El ID de la factura.
 * @returns {Promise<Object>} Una promesa que resuelve a un objeto representando los detalles de la factura.
 */
function getBill(id){
  return fetchData(`${billsUrl}/${id}`, getRequestOptions())
    .then((data) => {
      return data
    })
    .catch((error) => {
      console.error("Error al cargar la factura:", error);
      return [];
    });
};

/**
 * Función que agrega un cliente a la lista de elementos de la factura.
 * @function addClient
 * @param {Array} clients - La lista de clientes disponibles.
 * @param {number} selectedClient - El ID del cliente seleccionado.
 * @param {boolean} clientAdded - Indica si ya se ha agregado un cliente a la factura.
 * @param {function} setBillItems - Función para actualizar los elementos de la factura.
 * @param {function} setTotalBill - Función para actualizar el total de la factura.
 * @param {function} setSelectedClientData - Función para actualizar los datos del cliente seleccionado.
 */
const addClient = (
  clients,
  selectedClient,
  clientAdded,
  setBillItems,
  setTotalBill,
  setSelectedClientData,
) => {
  if (!selectedClient) {
    toast.error("Por favor, seleccione un cliente antes de agregarlo.");
    return;
  }

  if (clientAdded) {
    toast.error("Ya se ha agregado un cliente a esta factura.");
    return;
  }

  const selectedClientData = clients.find(
    (client) => client.id === Number(selectedClient)
  );

  if (selectedClientData) {
    setBillItems((prevItems) => [
      ...prevItems,
      {
        id: selectedClientData.id,
        name: selectedClientData.name,
        type: "Cliente",
        price: "",
      },
    ]);

    setTotalBill(0);
    setSelectedClientData(selectedClientData);
  } else {
    toast.error("No se encontraron datos para el cliente seleccionado.");
  }
};

/**
 * Función que agrega un servicio a la lista de elementos de la factura.
 * @function addService
 * @param {Array} services - La lista de servicios disponibles.
 * @param {number} selectedService - El ID del servicio seleccionado.
 * @param {function} setBillItems - Función para actualizar los elementos de la factura.
 * @param {function} setTotalBill - Función para actualizar el total de la factura.
 */
const addService = (
  services,
  selectedService,
  setBillItems,
  setTotalBill
) => {
  const service = services.find(
    (item) => item.id === parseInt(selectedService, 10)
  );

  if (service) {
    setBillItems((prevItems) => [
      ...prevItems,
      {
        id: service.id,
        type: "Servicio",
        name: service.name,
        price: service.price,
      },
    ]);

    setTotalBill((prevTotal) => prevTotal + service.price);
  }
};

/**
 * Función que agrega un producto a la lista de elementos de la factura.
 * @function addProduct
 * @param {Array} products - La lista de productos disponibles.
 * @param {number} selectedProduct - El ID del producto seleccionado.
 * @param {function} setBillItems - Función para actualizar los elementos de la factura.
 * @param {function} setTotalBill - Función para actualizar el total de la factura.
 */
const addProduct = (
  products,
  selectedProduct,
  setBillItems,
  setTotalBill
) => {
  const product = products.find(
    (item) => item.id === parseInt(selectedProduct, 10)
  );

  if (product) {
    setBillItems((prevItems) => [
      ...prevItems,
      {
        id: product.id,
        type: "Producto",
        name: product.name,
        price: product.price,
      },
    ]);

    setTotalBill((prevTotal) => prevTotal + product.price);
  }
};

const removeItem = (billItems, totalBill, setBillItems, setTotalBill) => (index) => {
  const updatedItems = [...billItems];
  const itemToRemove = billItems[index];

  updatedItems.splice(index, 1);
  setBillItems(updatedItems);

  if (itemToRemove.type === "Servicio" || itemToRemove.type === "Producto") {
    const updatedTotal = totalBill - itemToRemove.price;
    setTotalBill(updatedTotal);
  }
};


const addBill = (selectedClient, billItems, totalBill) => {
  if (!selectedClient || billItems.length === 0 || totalBill === 0) {
    toast.error("Por favor, complete los datos de la factura.");
    return;
  }

  // Crear una estructura de datos con la información necesaria
  const billData = {
    client_id: null,
    products: [],
    services: [],
  };

  // Separar productos y servicios
  billItems.forEach((item) => {
    if (item.type === "Cliente") {
      billData.client_id = Number(item.id);
    } else if (item.type === "Producto") {
      billData.products.push(Number(item.id));
    } else if (item.type === "Servicio") {
      billData.services.push(Number(item.id));
    }
  });

  // Luego pasamos los datos al backend

  const addBillRequestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: token,
      "user-id": user_id,
    },
    body: JSON.stringify({
      client_id: billData.client_id,
      products: billData.products,
      services: billData.services,
    }),
  };
  toast.loading("Generando factura...");
  fetch(billsUrl, addBillRequestOptions)
    .then((response) => {
      if (response.status === 200) { 
        return response.json();
        
      } else if (response.status === 400) {
        toast.error("Error al generar la factura.");   
      }
    })
    .then(data => {
      toast.success(`Factura ${data.id} generada con éxito.`);
    })
    .catch((error) => {
      toast.error("Error al agregar la factura.");
      console.error("Error al agregar la factura:", error);
    });
};
const getButtonStyle = (disabled) => {
  return disabled
    ? {
        backgroundColor: "var(--color1)",
        border: "1px solid var(--color2)",
        opacity: 0.5,
        cursor: "not-allowed",
      }
    : {};
};
export{
  addClient,
  addService,
  addProduct,
  removeItem,
  addBill,
  getButtonStyle,
  getBill,
  getBills,
}
