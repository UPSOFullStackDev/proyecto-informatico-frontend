import { getRequestOptions, deleteRequestOptions, fetchData } from "./utils.js";
import { token, user_id } from "./localStorage";
import { servicesUrl, billsUrl } from "./url.routes.js";

/**
 * Función asincrónica para obtener la lista de servicios.
 * @async
 * @function fetchServices
 * @throws {Error} Si hay un error al cargar la lista de servicios.
 * @returns {Promise<Array>} Lista de servicios.
 */
const fetchServices = async () => {
  try {
    return await fetchData(servicesUrl, getRequestOptions());
  } catch (error) {
    console.error("Error al cargar la lista de servicios:", error);
    return [];
  }
};

/**
 * Función asincrónica para obtener el ranking de servicios.
 * @async
 * @function fetchServicesRank
 * @throws {Error} Si hay un error al cargar el ranking de servicios.
 * @returns {Promise<Array>} Ranking de servicios.
 */
const fetchServicesRank = async () => {
  const servicesRankUrl = `${billsUrl}/services`;
  try {
    return await fetchData(servicesRankUrl, getRequestOptions());
  } catch (error) {
    console.error("Error al cargar la lista de ranking de servicios:", error);
    return [];
  }
};

/**
 * Función asincrónica para guardar un servicio en el servidor.
 * @async
 * @function saveService
 * @param {Object} service - Información del servicio a guardar.
 * @throws {Error} Si hay un error al guardar el servicio.
 * @returns {Promise<Object>} Objeto con la información del servicio guardado y la lista actualizada de servicios.
 */
const saveService = async (service) => {
  const url = service.id ? `${servicesUrl}/${service.id}` : servicesUrl;
  const method = service.id ? "PUT" : "POST";

  const requestOptions = {
    method,
    headers: {
      "Content-Type": "application/json",
      token: token,
      "user-id": user_id,
    },
    body: JSON.stringify(service),
  };

  try {
    const response = await fetch(url, requestOptions);

    if (response.status === 200) {
      const updatedService = await response.json();
      const updatedServices = await fetchServices(user_id); // Reutilizar la función existente
      return { updatedService, updatedServices };
    } else {
      console.error(
        `Error al ${service.id ? "actualizar" : "agregar"} el servicio`
      );
      throw new Error("Error en la solicitud");
    }
  } catch (error) {
    console.error(
      `Error al ${service.id ? "actualizar" : "agregar"} el servicio:`,
      error
    );
    throw error;
  }
};

/**
 * Función asincrónica para eliminar un servicio del servidor.
 * @async
 * @function deleteService
 * @param {number} serviceId - ID del servicio a eliminar.
 * @throws {Error} Si hay un error al eliminar el servicio.
 * @returns {Promise<boolean>} `true` si el servicio se eliminó correctamente.
 */
const deleteService = async (serviceId) => {
  const url = `${servicesUrl}/${serviceId}`;

  try {
    const response = await fetch(url, deleteRequestOptions());

    if (response.status === 200) {
      const updatedServices = await fetchServices(user_id); // Reutilizar la función existente
      return true;
    } else {
      console.error("Error al eliminar el servicio");
      throw new Error("Error en la solicitud");
    }
  } catch (error) {
    console.error("Error al eliminar el servicio:", error);
    throw error;
  }
};

export {
  fetchServices,
  saveService,
  deleteService,
  fetchServicesRank,}