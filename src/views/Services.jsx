import React, { useState, useEffect } from "react";
import {
  fetchServices,
  saveService,
  deleteService,
} from "../controllers/servicesFunctions.js";
import {getId} from "../controllers/localStorage.js";

import { BsPencilSquare, BsTrash, BsPlusLg, BsXLg } from "react-icons/bs";
import { Modal, Button } from "react-bootstrap";

function Services() {
  const [services, setServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] =
    useState(false);
  const [serviceToDeleteId, setServiceToDeleteId] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [currentService, setCurrentService] = useState({});
  const user_id = getId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const servicesData = await fetchServices(user_id);
        setServices(servicesData);
      } catch (error) {
        console.error("Error al cargar datos de servicios:", error);
      }
    };
    fetchData();
  }, [user_id]);

  ////////////////////////////////////////////// MODAL
  const openModal = (service) => {
    if (service) {
      setCurrentService({
        id: service.id,
        name: service.name,
        price: service.price,
        description: service.description || "",
      });
      setEditMode(true);
    } else {
      setCurrentService({
        name: "",
        price: 0,
        description: "",
      });
      setEditMode(false);
    }
    setShowModal(true);
  };
  
  const closeAndResetModal = () => {
    setShowModal(false);
    setCurrentService({ name: "", price: 0, description: "" });
    setEditMode(false);
  };

  ////////////////////////////////////////////// SAVE (CREATE/UPDATE)
  const handleSave = async () => {
    try {
      const { updatedService, updatedServices } = await saveService(
        user_id,
        currentService
      );

      setServices(updatedServices);

      if (editMode) {
        // Actualizar el producto en el estado
        const updatedServiceIndex = services.findIndex(
          (service) => service.id === updatedService.id
        );

        if (updatedServiceIndex !== -1) {
          const updatedServicesCopy = [...services];
          updatedServicesCopy[updatedServiceIndex] = updatedService;
          setServices(updatedServicesCopy);
        }
      }
    } catch (error) {
      console.error("Error al guardar el servicio:", error);
    }

    closeAndResetModal();
  };
  ////////////////////////////////////////////// DELETE BUTTON
  const handleDeleteService = (serviceId) => {
    setServiceToDeleteId(serviceId);
    setShowDeleteConfirmationModal(true);
  };

  const closeDeleteConfirmationModal = () => {
    setServiceToDeleteId(null);
    setShowDeleteConfirmationModal(false);
  };
  ////////////////////////////////////////////// DELETE CONFIRMATION
  const handleDeleteServiceConfirmed = async () => {
    try {
      const success = await deleteService(user_id, serviceToDeleteId);

      if (success) {
        const updatedServices = services.filter(
          (service) => service.id !== serviceToDeleteId
        );
        setServices(updatedServices);
      }
    } catch (error) {
      console.error("Error al eliminar el servicio:", error);
    }

    closeDeleteConfirmationModal();
  };

  return (
    <div className="table-container">
      <div className="tb">
        <h2>Servicios</h2>
        <button
          type="button"
          className="myButton"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          onClick={() => openModal()}
        >
          <BsPlusLg /> Agregar Servicio
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Servicio</th>
            <th>Precio</th>
            <th>Descripción</th>
            <th></th>
          </tr>
        </thead>
        <tbody id="service-table">
          {services.map((service) => (
            <tr key={service.id}>
              <td>{service.name}</td>
              <td>{service.price}</td>
              <td>{service.description}</td>
              <td>
                <BsPencilSquare
                  type="button"
                  className="icon icon-edit"
                  onClick={() => openModal(service)}
                />{" "}
                <BsTrash
                  type="button"
                  className="icon icon-delete"
                  onClick={() => handleDeleteService(service.id)}
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
            {editMode ? "Editar Servicio" : "Agregar Nuevo Servicio"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <form className="modal-form">
            <div className="form-group">
              <label>Nombre del Servicio:</label>
              <input
                className="modal-input"
                type="text"
                value={currentService.name}
                onChange={(e) =>
                  setCurrentService({ ...currentService, name: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>Precio:</label>
              <input
                className="modal-input"
                type="number"
                value={currentService.price}
                onChange={(e) =>
                  setCurrentService({
                    ...currentService,
                    price: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-group">
              <label>Descripción:</label>
              <input
                type="text"
                value={currentService.description}
                onChange={(e) =>
                  setCurrentService({
                    ...currentService,
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
          <Button
            className="myButton"
            variant="primary"
            onClick={handleSave}
          >
            {editMode ? "Guardar Cambios" : "Agregar Servicio"}
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
          ¿Estás seguro de que deseas eliminar este servicio?
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
            onClick={handleDeleteServiceConfirmed}
          >
            <BsTrash /> Eliminar Servicio
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Services;
