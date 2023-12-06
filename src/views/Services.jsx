// FUNCTIONS
import React, { useState, useEffect } from "react";
import {
  fetchServices,
  saveService,
  deleteService,
} from "../controllers/servicesFunctions.js";
// BOOTSTRAP, SONNER, REACT-SPINNERS, REACT-ICONS, COMPONENTS
import {
  BsPencilSquare,
  BsTrash,
  BsPlusCircleFill,
} from "react-icons/bs";
import CustomModal from "../components/CustomModal.jsx";
import { toast } from "sonner";
import GridLoader from "react-spinners/GridLoader";

function Services() {
  const [services, setServices] = useState([]); // Estado para los servicios
  const [showModal, setShowModal] = useState(false);  // Estado para el modal
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);  // Estado para el modal de confirmación de eliminación
  const [serviceToDeleteId, setServiceToDeleteId] = useState(null); // Estado para el id del servicio a eliminar
  const [editMode, setEditMode] = useState(false);  // Estado para el modo de edición
  const [currentService, setCurrentService] = useState({}); // Estado para el servicio actual
  const [loading, setLoading] = useState(false); // Estado para el spinner

//////////////////////////////////////// USE EFFECT - FETCH SERVICES
  // El hook useEffect se utiliza para realizar operaciones después de que la vista se ha renderizado.
  // En este caso, se activa un spinner ('setLoading(true)') para indicar la carga de datos.
  // La función 'fetchData' se encarga de realizar una solicitud asíncrona para obtener datos de servicios mediante 'fetchServices'.
  // Si la solicitud tiene éxito, actualiza el estado de servicios con los datos obtenidos.
  // En caso de error durante la solicitud, se muestra un mensaje de error en la consola.
  // Finalmente, se desactiva el spinner ('setLoading(false)').
    useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const servicesData = await fetchServices();
        setServices(servicesData);
      } catch (error) {
        console.error("Error al cargar datos de servicios:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

//////////////////////////////////////////////// MODAL
  // Estas funciones manejan la lógica asociada a la apertura y cierre de un modal en la interfaz de usuario.
  // La función 'openModal' recibe un objeto 'client' como parámetro y, si existe, actualiza el estado del cliente actual
  // con la información proporcionada. Luego, activa el modo de edición y muestra el modal. Si no hay un cliente, establece
  // valores predeterminados y desactiva el modo de edición antes de mostrar el modal.
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

//////////////////////////////////////////////// SAVE (CREATE/UPDATE)
  // La función 'handleSave' gestiona la lógica asociada al guardado de datos de servicios. Utiliza la función
  // 'saveService' para realizar la operación de guardado, esperando la respuesta asincrónica.
  // Si 'editMode' es verdadero, significa que se está editando un servicio existente. En este caso, busca el índice del servicio
  // actualizado en el estado de clientes y lo actualiza con la nueva información. Se muestra un mensaje de éxito y se actualiza
  // el estado de clientes con la copia actualizada.
  // Si 'editMode' es falso, indica que se está agregando un nuevo servicio. En este caso, se muestra un mensaje de éxito.
  // En caso de cualquier error durante el proceso de guardado, se maneja mostrando un mensaje de error en la consola.
  // Finalmente, se llama a la función 'closeAndResetModal' para ocultar el modal y restablecer los datos.
  const handleSave = async () => {
    try {
      const { updatedService, updatedServices } = await saveService(currentService);

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
          toast.success("Actualizado con exito");
        }
      } else {
        // Si editMode es false estamos agregando un nuevo servicio
        toast.success("Agregado con exito");
      }
    } catch (error) {
      console.error("Error al guardar el servicio:", error);
    }

    closeAndResetModal();
  };
////////////////////////////////////////////////// DELETE
  // 'handleDeleteClientConfirmed' se encarga de realizar la eliminación confirmada del servicio. Utiliza la función
  // 'deleteService' para llevar a cabo la operación y, si tiene éxito, actualiza el estado de clientes filtrando el servicio
  // eliminado. Se muestra un mensaje de éxito y, posteriormente, se cierra el modal de confirmación de eliminación.
  // La función 'handleDeleteClient' se utiliza para iniciar el proceso de eliminación al establecer el ID del servicio a eliminar y
  // mostrar el modal de confirmación de eliminación.
  // La función 'closeDeleteConfirmationModal' se encarga de restablecer el estado y cerrar el modal de confirmación de eliminación
  // sin llevar a cabo ninguna operación de eliminación.
  // Cualquier error durante el proceso de eliminación se maneja mostrando un mensaje en la consola.
  const handleDeleteService = (serviceId) => {
    setServiceToDeleteId(serviceId);
    setShowDeleteConfirmationModal(true);
  };

  const closeDeleteConfirmationModal = () => {
    setServiceToDeleteId(null);
    setShowDeleteConfirmationModal(false);
  };

  const handleDeleteServiceConfirmed = async () => {
    try {
      const success = await deleteService(serviceToDeleteId);

      if (success) {
        const updatedServices = services.filter(
          (service) => service.id !== serviceToDeleteId
        );
        setServices(updatedServices);
        toast.success("Eliminado con exito");
      }
    } catch (error) {
      console.error("Error al eliminar el servicio:", error);
    }

    closeDeleteConfirmationModal();
  };

  return (
  /*
    Este bloque de código representa la sección de la interfaz de usuario correspondiente a la gestión de productos.
    Se compone de un contenedor principal 'table-container' que contiene un encabezado, un botón para agregar un nuevo servicio,
    una tabla para mostrar la información de los productos, y dos modales personalizados ('CustomModal') para la edición y
    confirmación de eliminación de productos.
    La sección del encabezado incluye un título y un botón "Agregar Servicio" que desencadena la apertura del modal de edición
    cuando se hace clic.
    La tabla muestra la información básica de los productos en filas, con columnas para Nombre, Precio, Descripcion y acciones (editar y eliminar).
    Se utiliza un indicador de carga ('loading') para mostrar un spinner de carga mientras se obtienen los datos.
    Los modales personalizados ('CustomModal') contienen formularios para editar la información del servicio y una confirmación de eliminación.
    Cada campo del formulario está vinculado al estado 'currentService' y se actualiza dinámicamente a medida que el usuario ingresa datos.
    Se utilizan íconos de 'react-icons' (BsPlusCircleFill, BsPencilSquare, BsTrash) para representar gráficamente las acciones de agregar,
    editar y eliminar productos.
    La lógica para la manipulación del estado y las interacciones con el servidor se gestiona mediante funciones como 'openModal',
    'handleSave', 'handleDeleteProduct', 'handleDeleteProductConfirmed', 'closeAndResetModal', y 'closeDeleteConfirmationModal'.
  */
    <div className="table-container">
      <div className="tb">
        <h2></h2>
        <button
          type="button"
          className="myButton"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          onClick={() => openModal()}
        >
          <BsPlusCircleFill /> Agregar Servicio
        </button>
      </div>
      {loading ? (
        <GridLoader
          color={"rgba(143, 215, 239, 0.8)"}
          loading={loading}
          size={15}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
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
      )}

      <CustomModal
        showModal={showModal}
        closeModal={closeAndResetModal}
        title="Servicio"
        editMode={editMode}
        onSave={handleSave}
      >
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
      </CustomModal>
      <CustomModal
        showModal={showDeleteConfirmationModal}
        closeModal={closeDeleteConfirmationModal}
        title="Servicio"
        onDelete={() => handleDeleteServiceConfirmed()}
      >
        ¿Estás seguro de que deseas eliminar este servicio?
      </CustomModal>
    </div>
  );
}

export default Services;
