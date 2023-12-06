import React from "react";
import { Modal, Button } from "react-bootstrap";

////////////////////////////////////////////////////////// COMPONENTE DE MODAL DE FACTURA
  // Este componente representa un modal utilizado para mostrar detalles de una factura seleccionada.

const BillModal = ({ showModal, closeModal, title, billDetails, onClose }) => {
  return (
    <Modal show={showModal} onHide={closeModal} className="modal-container">
      <Modal.Header closeButton className="modal-header">
        <Modal.Title className="modal-title">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        {/* Contenido para mostrar detalles de la factura seleccionada */}
        <p>Fecha: {billDetails.date}</p>
        <p>
          Nombre y Apellido: {billDetails.client?.name}{" "}
          {billDetails.client?.surname}
        </p>

        {/* Detalles de productos en la factura */}
        {Array.isArray(billDetails.products) &&
          billDetails.products.length > 0 && (
            <>
              <h3>Productos:</h3>
              <ul>
                {billDetails.products.map((product, index) => (
                  <li key={index}>
                    <h5>
                      {product.name} ${product.price}
                    </h5>
                  </li>
                ))}
              </ul>
            </>
          )}

        {/* Detalles de servicios de la factura*/}
        {Array.isArray(billDetails.services) &&
          billDetails.services.length > 0 && (
            <>
              <h3>Servicios:</h3>
              <ul>
                {billDetails.services.map((service, index) => (
                  <li key={index}>
                    <h5>
                      {service.name} ${service.price}
                    </h5>
                  </li>
                ))}
              </ul>
            </>
          )}

        <p>Total: $ {billDetails.price}</p>
      </Modal.Body>
      <Modal.Footer className="modal-footer">
        <Button className="myButton" variant="secondary" onClick={onClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BillModal;
