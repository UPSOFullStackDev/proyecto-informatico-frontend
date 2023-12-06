// FUNCTIONS
import React, { useState, useEffect } from "react";
import {
  fetchProducts,
  saveProduct,
  deleteProduct,
} from "../controllers/productsFunctions.js";
// BOOTSTRAP, SONNER, REACT-SPINNERS, REACT-ICONS, COMPONENTS
import {
  BsPencilSquare,
  BsTrash,
  BsExclamationOctagonFill,
  BsPlusCircleFill,
} from "react-icons/bs";
import CustomModal from "../components/CustomModal.jsx";
import { toast } from "sonner";
import GridLoader from "react-spinners/GridLoader";

function Products() {
  const [products, setProducts] = useState([]); // Estado para los productos
  const [showModal, setShowModal] = useState(false);  // Estado para el modal
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);  // Estado para el modal de confirmación de eliminación
  const [productToDeleteId, setProductToDeleteId] = useState(null); // Estado para el id del producto a eliminar
  const [editMode, setEditMode] = useState(false);  // Estado para el modo de edición
  const [currentProduct, setCurrentProduct] = useState({}); // Estado para el id del producto actual
  const [underStock, setUnderStock] = useState(false); // Estado para el boton stock
  const [loading, setLoading] = useState(false); // Estado para el spinner

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const productsData = await fetchProducts();
        setProducts(productsData);
      } catch (error) {
        console.error("Error al cargar datos de productos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Función constante para filtrar productos según el estado del boton bajo stock
  const filteredProducts = underStock
    ? products.filter((product) => product.stock < 10)
    : products;

//////////////////////////////////////////////// MODAL
  // Estas funciones manejan la lógica asociada a la apertura y cierre de un modal en la interfaz de usuario.
  // La función 'openModal' recibe un objeto 'client' como parámetro y, si existe, actualiza el estado del cliente actual
  // con la información proporcionada. Luego, activa el modo de edición y muestra el modal. Si no hay un cliente, establece
  // valores predeterminados y desactiva el modo de edición antes de mostrar el modal.
  const openModal = (product) => {
    if (product) {
      setCurrentProduct({
        id: product.id,
        name: product.name,
        price: product.price,
        stock: product.stock,
        description: product.description || "",
      });
      setEditMode(true);
    } else {
      setCurrentProduct({
        name: "",
        price: 0,
        stock: 0,
        description: "",
      });
      setEditMode(false);
    }
    setShowModal(true);
  };

  const closeAndResetModal = () => {
    setShowModal(false);
    setCurrentProduct({
      name: "",
      price: 0,
      stock: 0,
      description: "",
    });
    setEditMode(false);
  };
///////////////////////////////////////////////// SAVE
  // La función 'handleSave' gestiona la lógica asociada al guardado de datos de productos. Utiliza la función
  // 'saveProduct' para realizar la operación de guardado, esperando la respuesta asincrónica.
  // Si 'editMode' es verdadero, significa que se está editando un producto existente. En este caso, busca el índice del producto
  // actualizado en el estado de clientes y lo actualiza con la nueva información. Se muestra un mensaje de éxito y se actualiza
  // el estado de clientes con la copia actualizada.
  // Si 'editMode' es falso, indica que se está agregando un nuevo producto. En este caso, se muestra un mensaje de éxito.
  // En caso de cualquier error durante el proceso de guardado, se maneja mostrando un mensaje de error en la consola.
  // Finalmente, se llama a la función 'closeAndResetModal' para ocultar el modal y restablecer los datos.
  const handleSave = async () => {
    try {
      const { updatedProduct, updatedProducts } = await saveProduct(currentProduct);
      setProducts(updatedProducts);

      if (editMode) {
        // Actualizar el producto en el estado
        const updatedProductIndex = products.findIndex(
          (product) => product.id === updatedProduct.id
        );

        if (updatedProductIndex !== -1) {
          const updatedProductsCopy = [...products];
          updatedProductsCopy[updatedProductIndex] = updatedProduct;
          setProducts(updatedProductsCopy);
          toast.success("Actualizado con exito");
        }
      } else {
        // Si editMode es false estamos agregando un nuevo servicio
        toast.success("Agregado con exito");
      }
    } catch (error) {
      console.error("Error al guardar el producto:", error);
    }

    closeAndResetModal();
  };
///////////////////////////////////////////////// DELETE
  // 'handleDeleteClientConfirmed' se encarga de realizar la eliminación confirmada del producto. Utiliza la función
  // 'deleteProduct' para llevar a cabo la operación y, si tiene éxito, actualiza el estado de clientes filtrando el producto
  // eliminado. Se muestra un mensaje de éxito y, posteriormente, se cierra el modal de confirmación de eliminación.
  // La función 'handleDeleteClient' se utiliza para iniciar el proceso de eliminación al establecer el ID del producto a eliminar y
  // mostrar el modal de confirmación de eliminación.
  // La función 'closeDeleteConfirmationModal' se encarga de restablecer el estado y cerrar el modal de confirmación de eliminación
  // sin llevar a cabo ninguna operación de eliminación.
  // Cualquier error durante el proceso de eliminación se maneja mostrando un mensaje en la consola.
  const handleDeleteProduct = (productId) => {
    setProductToDeleteId(productId);
    setShowDeleteConfirmationModal(true);
  };

  const closeDeleteConfirmationModal = () => {
    setProductToDeleteId(null);
    setShowDeleteConfirmationModal(false);
  };
  const handleDeleteProductConfirmed = async () => {
    try {
      const success = await deleteProduct( productToDeleteId);
      if (success) {
        const updatedProducts = products.filter(
          (product) => product.id !== productToDeleteId
        );
        setProducts(updatedProducts);
        toast.success("Eliminado con exito");
      }
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
    closeDeleteConfirmationModal();
  };

  return (
  /*
    Este bloque de código representa la sección de la interfaz de usuario correspondiente a la gestión de productos.
    Se compone de un contenedor principal 'table-container' que contiene un encabezado, un botón para agregar un nuevo producto,
    una tabla para mostrar la información de los productos, y dos modales personalizados ('CustomModal') para la edición y
    confirmación de eliminación de productos.
    La sección del encabezado incluye un título y un botón "Agregar Producto" que desencadena la apertura del modal de edición
    cuando se hace clic.
    La tabla muestra la información básica de los productos en filas, con columnas para Nombre, Precio, Stock y acciones (editar y eliminar).
    Se utiliza un indicador de carga ('loading') para mostrar un spinner de carga mientras se obtienen los datos.
    Los modales personalizados ('CustomModal') contienen formularios para editar la información del producto y una confirmación de eliminación.
    Cada campo del formulario está vinculado al estado 'currentProduct' y se actualiza dinámicamente a medida que el usuario ingresa datos.
    Se utilizan íconos de 'react-icons' (BsPlusCircleFill, BsPencilSquare, BsTrash) para representar gráficamente las acciones de agregar,
    editar y eliminar productos.
    La lógica para la manipulación del estado y las interacciones con el servidor se gestiona mediante funciones como 'openModal',
    'handleSave', 'handleDeleteProduct', 'handleDeleteProductConfirmed', 'closeAndResetModal', y 'closeDeleteConfirmationModal'.
  */
    <div className="table-container">
      <div className="tb">
        <h2></h2>
        <div>
          <button
            type="button"
            className="myButton-stock"
            checked={underStock}
            onClick={() => setUnderStock(!underStock)}
          >
            <BsExclamationOctagonFill /> Bajo Stock
          </button>
          <button
            type="button"
            className="myButton"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            onClick={() => openModal()}
          >
            <BsPlusCircleFill /> Agregar Producto
          </button>
        </div>
      </div>
      {loading ? (
        <GridLoader
          color={"rgba(143, 215, 239, 0.9)"}
          loading={loading}
          size={15}
          speedMultiplier={1}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <table>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Precio</th>
              <th>Stock</th>
              <th></th>
            </tr>
          </thead>
          <tbody id="product-table">
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
                <td>
                  <BsPencilSquare
                    type="button"
                    className="icon icon-edit"
                    onClick={() => openModal(product)}
                  />{" "}
                  <BsTrash
                    type="button"
                    className="icon icon-delete"
                    onClick={() => handleDeleteProduct(product.id)}
                  />{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <CustomModal
        showModal={showModal}
        closeModal={closeAndResetModal}
        title="Producto"
        editMode={editMode}
        onSave={handleSave}
      >
        {/* Contenido específico del modal */}
        <form className="modal-form">
          <div className="form-group">
            <label>Nombre del Producto:</label>
            <input
              className="modal-input"
              type="text"
              value={currentProduct.name}
              onChange={(e) =>
                setCurrentProduct({
                  ...currentProduct,
                  name: e.target.value,
                })
              }
            />
          </div>
          <div className="form-group">
            <label>Precio:</label>
            <input
              className="modal-input"
              type="number"
              value={currentProduct.price}
              onChange={(e) =>
                setCurrentProduct({
                  ...currentProduct,
                  price: e.target.value,
                })
              }
            />
          </div>
          <div className="form-group">
            <label>Stock:</label>
            <input
              type="number"
              value={currentProduct.stock}
              onChange={(e) =>
                setCurrentProduct({
                  ...currentProduct,
                  stock: e.target.value,
                })
              }
            />
          </div>
          <div className="form-group">
            <label>Descripción:</label>
            <input
              type="text"
              value={currentProduct.description}
              onChange={(e) =>
                setCurrentProduct({
                  ...currentProduct,
                  description: e.target.value,
                })
              }
            />
          </div>
        </form>
      </CustomModal>
      <CustomModal
        showModal={showDeleteConfirmationModal}
        closeModal={closeDeleteConfirmationModal}
        title="Producto"
        onDelete={handleDeleteProductConfirmed}
      >
        <p>¿Estás seguro de que deseas eliminar este producto?</p>
      </CustomModal>
    </div>
  );
}
export default Products;
