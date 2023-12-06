// FUNCTIONS
import React, { useState, useEffect } from "react";
import {
  fetchClients,
  saveClient,
  deleteClient,
} from "../controllers/clientsFunctions.js";
// BOOTSTRAP, SONNER, REACT-ICONS, REACT-SPINNERS, COMPONENTS
import { BsPencilSquare, BsTrash, BsPlusCircleFill } from "react-icons/bs";
import { toast } from "sonner";
import GridLoader from "react-spinners/GridLoader";
import CustomModal from "../components/CustomModal.jsx";

function Clients() {  
  const [clients, setClients] = useState([]);   // Estado para los clientes
  const [showModal, setShowModal] = useState(false);  // Estado para el modal
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);  // Estado para el modal de confirmación de eliminación
  const [clientToDeleteId, setClientToDeleteId] = useState(null); // Estado para el id del cliente a eliminar
  const [editMode, setEditMode] = useState(false);  // Estado para el modo de edición
  const [currentClient, setCurrentClient] = useState({}); // Estado para el id del cliente actual
  const [loading, setLoading] = useState(false); // Estado para el spinner

  // USEEFFECT PARA CARGAR LOS DATOS DE LOS CLIENTES
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const clientsData = await fetchClients();
        setClients(clientsData);
      } catch (error) {
        console.error("Error al cargar datos de clientes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

//////////////////////////////////// MODAL
  // Estas funciones manejan la lógica asociada a la apertura y cierre de un modal en la interfaz de usuario.
  // La función 'openModal' recibe un objeto 'client' como parámetro y, si existe, actualiza el estado del cliente actual
  // con la información proporcionada. Luego, activa el modo de edición y muestra el modal. Si no hay un cliente, establece
  // valores predeterminados y desactiva el modo de edición antes de mostrar el modal.
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
//////////////////////////////////////// ADD / SAVE
  // La función 'handleSave' gestiona la lógica asociada al guardado de datos de cliente. Utiliza la función
  // 'saveClient' para realizar la operación de guardado, esperando la respuesta asincrónica.
  // Si 'editMode' es verdadero, significa que se está editando un cliente existente. En este caso, busca el índice del cliente
  // actualizado en el estado de clientes y lo actualiza con la nueva información. Se muestra un mensaje de éxito y se actualiza
  // el estado de clientes con la copia actualizada.
  // Si 'editMode' es falso, indica que se está agregando un nuevo cliente. En este caso, se muestra un mensaje de éxito.
  // En caso de cualquier error durante el proceso de guardado, se maneja mostrando un mensaje de error en la consola.
  // Finalmente, se llama a la función 'closeAndResetModal' para ocultar el modal y restablecer los datos.

  const handleSave = async () => {
    try {
      const { updatedClient, updatedClients } = await saveClient(
        currentClient
      );

      setClients(updatedClients);

      if (editMode) {
        const updatedClientIndex = clients.findIndex(
          (client) => client.id === updatedClient.id
        );

        if (updatedClientIndex !== -1) {
          const updatedClientsCopy = [...clients];
          updatedClientsCopy[updatedClientIndex] = updatedClient;
          toast.success("Actualizado con exito");
          setClients(updatedClientsCopy);
        }
      } else {
        toast.success("Agregado con exito");
      }
    } catch (error) {
      console.error("Error al guardar el cliente:", error);
    }

    closeAndResetModal();
  };

////////////////////////////////////// DELETE
  // 'handleDeleteClientConfirmed' se encarga de realizar la eliminación confirmada del cliente. Utiliza la función
  // 'deleteClient' para llevar a cabo la operación y, si tiene éxito, actualiza el estado de clientes filtrando el cliente
  // eliminado. Se muestra un mensaje de éxito y, posteriormente, se cierra el modal de confirmación de eliminación.
  // La función 'handleDeleteClient' se utiliza para iniciar el proceso de eliminación al establecer el ID del cliente a eliminar y
  // mostrar el modal de confirmación de eliminación.
  // La función 'closeDeleteConfirmationModal' se encarga de restablecer el estado y cerrar el modal de confirmación de eliminación
  // sin llevar a cabo ninguna operación de eliminación.
  // Cualquier error durante el proceso de eliminación se maneja mostrando un mensaje en la consola.

  const handleDeleteClientConfirmed = async () => {
    try {
      const success = await deleteClient(clientToDeleteId);

      if (success) {
        const updatedClients = clients.filter(
          (client) => client.id !== clientToDeleteId
        );
        setClients(updatedClients);
        toast.success("Eliminado con exito");
      }
    } catch (error) {
      console.error("Error al eliminar el cliente:", error);
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
  /*
    Este bloque de código representa la sección de la interfaz de usuario correspondiente a la gestión de clientes.
    Se compone de un contenedor principal 'table-container' que contiene un encabezado, un botón para agregar un nuevo cliente,
    una tabla para mostrar la información de los clientes, y dos modales personalizados ('CustomModal') para la edición y
    confirmación de eliminación de clientes.
    La sección del encabezado incluye un título y un botón "Agregar Cliente" que desencadena la apertura del modal de edición
    cuando se hace clic.
    La tabla muestra la información básica de los clientes en filas, con columnas para Nombre, Apellido, Email y acciones (editar y eliminar).
    Se utiliza un indicador de carga ('loading') para mostrar un spinner de carga mientras se obtienen los datos.
    Los modales personalizados ('CustomModal') contienen formularios para editar la información del cliente y una confirmación de eliminación.
    Cada campo del formulario está vinculado al estado 'currentClient' y se actualiza dinámicamente a medida que el usuario ingresa datos.
    Se utilizan íconos de 'react-icons' (BsPlusCircleFill, BsPencilSquare, BsTrash) para representar gráficamente las acciones de agregar,
    editar y eliminar clientes.
    La lógica para la manipulación del estado y las interacciones con el servidor se gestiona mediante funciones como 'openModal',
    'handleSave', 'handleDeleteClient', 'handleDeleteClientConfirmed', 'closeAndResetModal', y 'closeDeleteConfirmationModal'.
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
          <BsPlusCircleFill /> Agregar Cliente
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
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody id="user-table">
            {clients.map((client) => (
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
      )}

      <CustomModal
        showModal={showModal}
        closeModal={closeAndResetModal}
        title="Cliente"
        editMode={editMode}
        onSave={handleSave}
      >
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
      </CustomModal>
      <CustomModal
        showModal={showDeleteConfirmationModal}
        closeModal={closeDeleteConfirmationModal}
        title="Cliente"
        onDelete={handleDeleteClientConfirmed}
      >
        ¿Estás seguro de que deseas eliminar este cliente?
      </CustomModal>
    </div>
  );
}

export default Clients;
