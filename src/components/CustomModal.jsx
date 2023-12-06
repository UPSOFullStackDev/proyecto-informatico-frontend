import React from "react";
import { Modal, Button } from "react-bootstrap";
import {
  BsPencilSquare,
  BsTrash,
  BsXLg,
  BsPlusCircleFill,
} from "react-icons/bs";
import { Toaster, toast } from "sonner";

////////////////////////////////////////////////////////// COMPONENTE DE MODAL PERSONALIZADO
  // Este componente de modal personalizado puede ser utilizado para editar, agregar o eliminar elementos.
const CustomModal = ({
  showModal,      // Booleano que indica si el modal debe mostrarse o no
  closeModal,      // Función para cerrar el modal
  title,           // Título del modal
  editMode,        // Booleano que indica si el modal está en modo de edición
  onSave,          // Función a ejecutar al guardar/agregar
  onDelete,        // Función a ejecutar al eliminar (opcional)
  children,        // Contenido del cuerpo del modal propio del componente que lo utiliza
}) => {
  return (
    <>
      <Modal show={showModal} onHide={closeModal} className="modal-container">
        <Modal.Header closeButton className="modal-header">
          <Modal.Title className="modal-title">
            {editMode ? `Editar ${title}` : `Agregar Nuevo ${title}`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">{children}</Modal.Body>
        <Modal.Footer className="modal-footer">
          <Button className="myButton" variant="secondary" onClick={closeModal}>
            <BsXLg />
            Cancelar
          </Button>
          {editMode ? (
            <>
              <Button
                className="myButton"
                variant="primary"
                onClick={() => {
                  toast.promise(onSave, { loading: `Actualizando ${title}` });
                }}
              >
                <BsPencilSquare /> Guardar Cambios
              </Button>
            </>
          ) : (
            <Button
              className="myButton"
              variant="primary"
              onClick={() => {
                toast.promise(onSave, { loading: `Agregando ${title}` });
              }}
            >
              <BsPlusCircleFill /> Agregar {title}
            </Button>
          )}
        </Modal.Footer>
      </Modal>
      {onDelete && (
        <Modal show={showModal} onHide={closeModal} className="modal-container">
          <Modal.Header closeButton className="modal-header">
            <Modal.Title className="modal-title">
              {`Eliminar ${title}`}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-body">
            {`¿Estás seguro de que deseas eliminar este ${title.toLowerCase()}?`}
          </Modal.Body>
          <Modal.Footer className="modal-footer">
            <Button
              className="myButton"
              variant="secondary"
              onClick={closeModal}
            >
              <BsXLg />
              Cancelar
            </Button>
            <Button
              className="myButton"
              variant="danger"
              onClick={() => {
                toast.promise(onDelete, { loading: `Eliminando ${title}` });
              }}
            >
              <BsTrash /> Eliminar {title}
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      <Toaster position="top-right" duration={900} theme="dark" richColors />
    </>
  );
};

export default CustomModal;
