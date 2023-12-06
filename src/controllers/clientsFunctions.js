import { getRequestOptions, deleteRequestOptions, fetchData } from "./utils.js";
import { token, user_id } from "./localStorage";
import { clientsUrl, billsUrl } from "./url.routes.js";

/**
 * Función asíncrona que obtiene la lista de clientes del usuario actual.
 * @async
 * @function fetchClients
 * @returns {Promise<Array>} Una promesa que resuelve a un array de objetos representando los clientes.
 */
const fetchClients = async () => {
  try {
    return await fetchData(clientsUrl, getRequestOptions());
  } catch (error) {
    console.error("Error al cargar la lista de clientes:", error);
    return [];
  }
};

/**
 * Función asíncrona que obtiene la lista de clientes clasificados por ranking.
 * @async
 * @function fetchClientsRank
 * @returns {Promise<Array>} Una promesa que resuelve a un array de objetos representando los clientes clasificados.
 */
const fetchClientsRank = async () => {
  const clientsRankUrl = `${billsUrl}/clients`; 
  try {
    return await fetchData(clientsRankUrl, getRequestOptions());
  } catch (error) {
    console.error("Error al cargar la lista de clientes:", error);
    return [];
  }
};

/**
 * Función asíncrona que guarda o actualiza un cliente.
 * @async
 * @function saveClient
 * @param {Object} client - Objeto representando los datos del cliente a guardar o actualizar.
 * @returns {Promise<Object>} Una promesa que resuelve a un objeto con el cliente actualizado y la lista actualizada de clientes.
 * @throws {Error} Si hay un error en la solicitud.
 */
const saveClient = async (client) => {
  const url = client.id ? `${clientsUrl}/${client.id}` : clientsUrl;
  const method = client.id ? "PUT" : "POST";

  const requestOptions = {
    method,
    headers: {
      "Content-Type": "application/json",
      token: token,
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

/**
 * Función asíncrona que elimina un cliente.
 * @async
 * @function deleteClient
 * @param {number} clientId - El ID del cliente a eliminar.
 * @returns {Promise<boolean>} Una promesa que resuelve a `true` si la eliminación es exitosa.
 * @throws {Error} Si hay un error en la solicitud.
 */
const deleteClient = async (clientId) => {
  const url = `${clientsUrl}/${clientId}`;

  try {
    const response = await fetch(url, deleteRequestOptions());

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


export {
  fetchClients,
  saveClient,
  deleteClient,
  fetchClientsRank,}