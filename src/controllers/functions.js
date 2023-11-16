import { fetchData, getRequestOptions } from "./utils.js";

export const fetchClients = async (user_id) => {
  const clientsUrl = `https://proyecto-informatico-backend.onrender.com/user/${user_id}/clients`;
  const requestOptions = getRequestOptions();
  try {
    return await fetchData(clientsUrl, requestOptions);
  } catch (error) {
    console.error("Error al cargar la lista de clientes:", error);
    throw error;
  }
};

export const fetchServices = async (user_id) => {
  const servicesUrl = `https://proyecto-informatico-backend.onrender.com/user/${user_id}/services`;
  const requestOptions = getRequestOptions();
  try {
    return await fetchData(servicesUrl, requestOptions);
  } catch (error) {
    console.error("Error al cargar la lista de servicios:", error);
    throw error;
  }
};

export const fetchProducts = async (user_id) => {
  const productsUrl = `https://proyecto-informatico-backend.onrender.com/user/${user_id}/products`;
  const requestOptions = getRequestOptions();
  try {
    return await fetchData(productsUrl, requestOptions);
  } catch (error) {
    console.error("Error al cargar la lista de productos:", error);
    throw error;
  }
};

export const addClient = (
  clients,
  selectedClient,
  clientAdded,
  setBillItems,
  setTotalBill,
  setSelectedClientData,
) => {
  if (!selectedClient) {
    alert("Por favor, seleccione un cliente antes de agregarlo.");
    return;
  }

  if (clientAdded) {
    alert("Ya se ha agregado un cliente a esta factura.");
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
    alert("No se encontraron datos para el cliente seleccionado.");
  }
};

export const addService = (
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

// Función para agregar un producto
export const addProduct = (
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

export const removeItem =
  (billItems, totalBill, setBillItems, setTotalBill, setClientAdded) =>
  (index) => {
    const updatedItems = [...billItems];
    const itemToRemove = billItems[index];

    updatedItems.splice(index, 1);
    setBillItems(updatedItems);

    if (itemToRemove.type === "Servicio" || itemToRemove.type === "Producto") {
      const updatedTotal = totalBill - itemToRemove.price;
      setTotalBill(updatedTotal);
    }

    const clientStillAdded = updatedItems.some(
      (item) => item.type === "Cliente"
    );

    setClientAdded(clientStillAdded);
  };

export const addBill = (selectedClient, billItems, totalBill) => {
  if (!selectedClient || billItems.length === 0 || totalBill === 0) {
    alert("Por favor, complete los datos de la factura.");
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
  const token = localStorage.getItem("token");
  const user_id = localStorage.getItem("id");

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
  console.log(billData);

  fetch(`https://proyecto-informatico-backend.onrender.com/user/${user_id}/sales`, addBillRequestOptions)
    .then((response) => {
      if (response.status === 200) {
        alert("Factura generada con éxito.");
      } else if (response.status === 400) {
        alert("Error al generar la factura.");
      }
    })
    .catch((error) => {
      console.error("Error al agregar la factura:", error);
    });
};
