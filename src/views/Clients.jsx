//FUNCTIONS
import React, { useState, useEffect } from "react";
import { getId } from "../controllers/localStorage.js";
import {
  fetchClients,
  saveClient,
  deleteClient,
} from "../controllers/clientsFunctions.js";
// BOOTSTRAP
import { BsPencilSquare, BsTrash, BsPlusLg, BsXLg } from "react-icons/bs";
import { Modal, Button } from "react-bootstrap";


function Clients() {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] =
    useState(false);
  const [clientToDeleteId, setClientToDeleteId] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [currentClient, setCurrentClient] = useState({});
  const user_id = getId;

  // USEEFFECT PARA CARGAR LOS DATOS DE LOS CLIENTES
  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientsData = await fetchClients(user_id);
        setData(clientsData);
      } catch (error) {
        console.error("Error al cargar datos de productos:", error);
      }
    };

    fetchData();
  }, [user_id]);

  //////////////////////////////// MODAL
  const openModal = (client) => {
    if (client) {
      setCurrentClient({
        id: client.id,
        name: client.name,
        surname: client.surname,
        address: client.address,
        email: client.email,
      });
      setEditMode(true);
    } else {
      setCurrentClient({
        name: "",
        surname: "",
        address: "",
        email: "",
      });
      setEditMode(false);
    }
    setShowModal(true);
  };

  const closeAndResetModal = () => {
    setShowModal(false);
    setCurrentClient({
      name: "",
      surname: "",
      address: "",
      email: "",
    });
    setEditMode(false);
  };
  //////////////////////////////// ADD / SAVE
  const handleSave = async () => {
    try {
      const { updatedClient, updatedClients } = await saveClient(
        user_id,
        currentClient
      );

      setData(updatedClients);

      if (editMode) {
        // Actualizar el producto en el estado
        const updatedClientIndex = data.findIndex(
          (client) => client.id === updatedClient.id
        );

        if (updatedClientIndex !== -1) {
          const updatedClientsCopy = [...data];
          updatedClientsCopy[updatedClientIndex] = updatedClient;
          setProducts(updatedClientsCopy);
        }
      }
    } catch (error) {
      console.error("Error al guardar el producto:", error);
    }

    closeAndResetModal();
  };

  //////////////////////////////// DELETE
  const handleDeleteClientConfirmed = async () => {
    try {
      const success = await deleteClient(user_id, clientToDeleteId);

      if (success) {
        const updatedClients = data.filter(
          (client) => client.id !== clientToDeleteId
        );
        setData(updatedClients);
      }
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }

    closeDeleteConfirmationModal();
  };
  const handleDeleteClient = (clientId) => {
    setClientToDeleteId(clientId);
    setShowDeleteConfirmationModal(true);
  };

  const closeDeleteConfirmationModal = () => {
    setClientToDeleteId(null);
    setShowDeleteConfirmationModal(false);
  };

  return (
    <div className="table-container">
      <div className="tb">
        <h2>Clientes</h2>
        <button
          type="button"
          className="myButton"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          onClick={() => openModal()}
        >
          <BsPlusLg /> Agregar Cliente
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody id="user-table">
          {data.map((client) => (
            <tr key={client.id}>
              <td>{client.name}</td>
              <td>{client.surname}</td>
              <td>{client.email}</td>
              <td>
                <BsPencilSquare
                  type="button"
                  className="icon icon-edit"
                  onClick={() => openModal(client)}
                />{" "}
                <BsTrash
                  type="button"
                  className="icon icon-delete"
                  onClick={() => handleDeleteClient(client.id)}
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
            {editMode ? "Editar Cliente" : "Agregar Nuevo Cliente"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <form className="modal-form">
            <div className="form-group">
              <label>Nombre: </label>
              <input
                className="modal-input"
                type="text"
                value={currentClient.name}
                onChange={(e) =>
                  setCurrentClient({ ...currentClient, name: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>Apellido: </label>
              <input
                className="modal-input"
                type="text"
                value={currentClient.surname}
                onChange={(e) =>
                  setCurrentClient({
                    ...currentClient,
                    surname: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-group">
              <label>Dirección: </label>
              <input
                type="text"
                value={currentClient.address}
                onChange={(e) =>
                  setCurrentClient({
                    ...currentClient,
                    address: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="text"
                value={currentClient.email}
                onChange={(e) =>
                  setCurrentClient({ ...currentClient, email: e.target.value })
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
          <Button
            className="myButton"
            variant="primary"
            onClick={handleSave}
          >
            {editMode ? "Guardar Cambios" : "Agregar Cliente"}
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
          ¿Estás seguro de que deseas eliminar este cliente?
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
            onClick={handleDeleteClientConfirmed}
          >
            <BsTrash /> Eliminar Cliente
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Clients;
