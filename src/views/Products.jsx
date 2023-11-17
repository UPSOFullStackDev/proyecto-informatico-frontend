//FUNCTIONS
import React, { useState, useEffect } from "react";
import {
  fetchProducts,
  saveProduct,
  deleteProduct,
} from "../controllers/productsFunctions.js";
//CSS & BOOTSTRAP
import "../css/products.css";
import {BsPencilSquare, BsTrash, BsPlusLg, BsXLg, BsExclamationOctagonFill } from "react-icons/bs";
import { Modal, Button } from "react-bootstrap";


function Products() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] =
    useState(false);
  const [productToDeleteId, setProductToDeleteId] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});
  const [underStock, setUnderStock] = useState(false); // Estado para el checkbox
  const user_id = localStorage.getItem("id");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await fetchProducts(user_id);
        setProducts(productsData);
      } catch (error) {
        console.error("Error al cargar datos de productos:", error);
      }
    };

    fetchData();
  }, [user_id]);

  // Función para filtrar productos según el estado del checkbox
  const filteredProducts = underStock
    ? products.filter((product) => product.stock < 3)
    : products;

  ////////////////////////////////////////////// MODAL
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
  ////////////////////////////////////////////// SAVE
  const handleSave = async () => {
    try {
      const { updatedProduct, updatedProducts } = await saveProduct(
        user_id,
        currentProduct
      );

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
        }
      }
    } catch (error) {
      console.error("Error al guardar el producto:", error);
    }

    closeAndResetModal();
  };

  ////////////////////////////////////////////// DELETE
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
      const success = await deleteProduct(user_id, productToDeleteId);

      if (success) {
        const updatedProducts = products.filter(
          (product) => product.id !== productToDeleteId
        );
        setProducts(updatedProducts);
      }
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }

    closeDeleteConfirmationModal();
  };

  return (
    <div className="table-container">
      <div className="tb">
        <h2>Productos</h2>
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
          <BsPlusLg /> Agregar Producto
        </button>
      </div>
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
      <Modal
        show={showModal}
        onHide={closeAndResetModal}
        className="modal-container"
      >
        <Modal.Header closeButton className="modal-header">
          <Modal.Title className="modal-title">
            {editMode ? "Editar Producto" : "Agregar Nuevo Producto"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <form className="modal-form">
            <div className="form-group">
              <label>Nombre del Producto:</label>
              <input
                className="modal-input"
                type="text"
                value={currentProduct.name}
                onChange={(e) =>
                  setCurrentProduct({ ...currentProduct, name: e.target.value })
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
        </Modal.Body>
        <Modal.Footer className="modal-footer">
          <Button
            className="myButton"
            variant="secondary"
            onClick={closeAndResetModal}
          >
            <BsXLg /> Cancelar
          </Button>
          <Button className="myButton" variant="primary" onClick={handleSave}>
            {editMode ? "Guardar Cambios" : "Agregar Producto"}
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showDeleteConfirmationModal}
        onHide={closeDeleteConfirmationModal}
        className="modal-container"
      >
        <Modal.Header closeButton className="modal-header">
          <Modal.Title className="modal-title">
            Confirmar Eliminación
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          ¿Estás seguro de que deseas eliminar este producto?
        </Modal.Body>
        <Modal.Footer className="modal-footer">
          <Button
            className="myButton"
            variant="secondary"
            onClick={closeDeleteConfirmationModal}
          >
            <BsXLg /> Cancelar
          </Button>
          <Button
            className="myButton"
            variant="danger"
            onClick={handleDeleteProductConfirmed}
          >
            <BsTrash /> Eliminar Producto
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default Products;
