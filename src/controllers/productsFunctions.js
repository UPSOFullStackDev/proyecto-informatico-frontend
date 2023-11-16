import { getRequestOptions, fetchData } from "./utils.js";

const token = localStorage.getItem("token");

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

export const saveProduct = async (user_id, product) => {
  const url = product.id
    ? `https://proyecto-informatico-backend.onrender.com/user/${user_id}/products/${product.id}`
    : `https://proyecto-informatico-backend.onrender.com/user/${user_id}/products`;
  const method = product.id ? "PUT" : "POST";

  const requestOptions = {
    method,
    headers: {
      "Content-Type": "application/json",
      token,
      "user-id": user_id,
    },
    body: JSON.stringify(product),
  };

  try {
    const response = await fetch(url, requestOptions);

    if (response.status === 200) {
      const updatedProduct = await response.json();
      const updatedProducts = await fetchProducts(user_id); // Reutilizar la función existente
      return { updatedProduct, updatedProducts };
    } else {
      console.error(
        `Error al ${product.id ? "actualizar" : "agregar"} el producto`
      );
      throw new Error("Error en la solicitud");
    }
  } catch (error) {
    console.error(
      `Error al ${product.id ? "actualizar" : "agregar"} el producto:`,
      error
    );
    throw error;
  }
};

export const deleteProduct = async (user_id, productId) => {
  const url = `https://proyecto-informatico-backend.onrender.com/user/${user_id}/products/${productId}`;

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
      const updatedProducts = await fetchProducts(user_id); // Reutilizar la función existente
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


