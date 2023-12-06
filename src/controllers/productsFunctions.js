import { getRequestOptions, deleteRequestOptions, fetchData } from "./utils.js";
import { token, user_id } from "./localStorage";
import { productsUrl, billsUrl } from "./url.routes.js";

/**
 * Función asincrónica para obtener la lista de productos.
 * @async
 * @function fetchProducts
 * @throws {Error} Si hay un error al cargar la lista de productos.
 * @returns {Promise<Array>} Lista de productos.
 */
const fetchProducts = async () => {
  try {
    return await fetchData(productsUrl, getRequestOptions());
  } catch (error) {
    console.error("Error al cargar la lista de productos:", error);
    throw error;
  }
};

/**
 * Función asincrónica para obtener el ranking de productos.
 * @async
 * @function fetchProductsRank
 * @throws {Error} Si hay un error al cargar el ranking de productos.
 * @returns {Promise<Array>} Ranking de productos.
 */
const fetchProductsRank = async () => {
  const productsRankUrl = `${billsUrl}/products`;
  try {
    return await fetchData(productsRankUrl, getRequestOptions());
  } catch (error) {
    console.error("Error al cargar la lista de productos:", error);
    return [];
  }
};

/**
 * Función asincrónica para obtener la lista de productos con bajo stock.
 * @async
 * @function fethcProductsLowStock
 * @throws {Error} Si hay un error al cargar la lista de productos con bajo stock.
 * @returns {Promise<Array>} Lista de productos con bajo stock.
 */
const fethcProductsLowStock = async () => {
  const productsStockUrl = `${productsUrl}/stock`;
  try {
    return await fetchData(productsStockUrl, getRequestOptions());
  } catch (error) {
    console.error("Error al cargar la lista de productos:", error);
    return [];
  }
};

/**
 * Función asincrónica para guardar un producto en el servidor.
 * @async
 * @function saveProduct
 * @param {Object} product - Información del producto a guardar.
 * @throws {Error} Si hay un error al guardar el producto.
 * @returns {Promise<Object>} Objeto con la información del producto guardado y la lista actualizada de productos.
 */
const saveProduct = async (product) => {
  const url = product.id
    ? `${productsUrl}/${product.id}`
    : productsUrl;
  const method = product.id ? "PUT" : "POST";

  const requestOptions = {
    method,
    headers: {
      "Content-Type": "application/json",
      token: token,
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

/**
 * Función asincrónica para eliminar un producto del servidor.
 * @async
 * @function deleteProduct
 * @param {number} productId - ID del producto a eliminar.
 * @throws {Error} Si hay un error al eliminar el producto.
 * @returns {Promise<boolean>} `true` si el producto se eliminó correctamente.
 */
const deleteProduct = async (productId) => {
  const url = `${productsUrl}/${productId}`;
  try {
    const response = await fetch(url, deleteRequestOptions());

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

export{
  fetchProductsRank,
  fetchProducts,
  saveProduct,
  deleteProduct,
  fethcProductsLowStock,
}