import { getRequestOptions, fetchData } from "./utils.js";

const token = localStorage.getItem("token");

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

export const saveClient = async (user_id, client) => {
  const url = client.id
    ? `https://proyecto-informatico-backend.onrender.com/user/${user_id}/clients/${client.id}`
    : `https://proyecto-informatico-backend.onrender.com/user/${user_id}/clients`;
  const method = client.id ? "PUT" : "POST";

  const requestOptions = {
    method,
    headers: {
      "Content-Type": "application/json",
      token,
      "user-id": user_id,
    },
    body: JSON.stringify(client),
  };

  try {
    const response = await fetch(url, requestOptions);

    if (response.status === 200) {
      const updatedClient = await response.json();
      const updatedClients = await fetchClients(user_id); // Reutilizar la función existente
      return { updatedClient, updatedClients };
    } else {
      console.error(
        `Error al ${client.id ? "actualizar" : "agregar"} el cliente`
      );
      throw new Error("Error en la solicitud");
    }
  } catch (error) {
    console.error(
      `Error al ${client.id ? "actualizar" : "agregar"} el cliente:`,
      error
    );
    throw error;
  }
};

export const deleteClient = async (user_id, clientId) => {
  const url = `https://proyecto-informatico-backend.onrender.com/user/${user_id}/clients/${clientId}`;

  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      token,
      "user-id": user_id,
    },
  };

  try {
    const response = await fetch(url, requestOptions);

    if (response.status === 200) {
      const updatedClients = await fetchClients(user_id); // Reutilizar la función existente
      return true;
    } else {
      console.error("Error al eliminar el producto");
      throw new Error("Error en la solicitud");
    }
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    throw error;
  }
};


