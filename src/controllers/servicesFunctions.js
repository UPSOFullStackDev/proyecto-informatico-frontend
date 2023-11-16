import { getRequestOptions, fetchData } from "./utils.js";

const token = localStorage.getItem("token");

const fetchServices = async (user_id) => {
  const servicesUrl = `https://proyecto-informatico-backend.onrender.com/user/${user_id}/services`;
  const requestOptions = getRequestOptions();
  try {
    return await fetchData(servicesUrl, requestOptions);
  } catch (error) {
    console.error("Error al cargar la lista de servicios:", error);
    throw error;
  }
};

const saveService = async (user_id, service) => {
  const url = service.id
    ? `https://proyecto-informatico-backend.onrender.com/user/${user_id}/services/${service.id}`
    : `https://proyecto-informatico-backend.onrender.com/user/${user_id}/services`;
  const method = service.id ? "PUT" : "POST";

  const requestOptions = {
    method,
    headers: {
      "Content-Type": "application/json",
      token,
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

const deleteService = async (user_id, productId) => {
  const url = `https://proyecto-informatico-backend.onrender.com/user/${user_id}/services/${productId}`;

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
  deleteService}