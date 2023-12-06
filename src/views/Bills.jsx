import React, { useState, useEffect } from "react";
import { BsPass } from "react-icons/bs";
import { getBills, getBill } from "../controllers/billsFunctions.js";
import GridLoader from "react-spinners/GridLoader";
import BillModal from "../components/BillModal.jsx";
import { Toaster, toast } from "sonner";

function Bills() {
  const [bills, setBills] = useState([]); // Estado para las facturas
  const [showDetailModal, setShowDetailModal] = useState(false); // Estado para el modal de detalles de la factura
  const [selectedBillDetails, setSelectedBillDetails] = useState({}); // Estado para los detalles de la factura seleccionada
  const [loading, setLoading] = useState(false); // Estado para el spinner
  
  // useEffect para cargar las facturas al cargar la vista
  useEffect(() => { 
    setLoading(true); // Seteamos el estado del spinner a true
    const fetchData = async () => { // Función para cargar las facturas
      try { 
        const billsData = await getBills(); // Obtenemos las facturas
        setBills(billsData);  // Seteamos el estado de las facturas
      } catch (error) { // Si hay un error
        console.error("Error al cargar las facturas:", error);  // Mostramos el error en consola
      } finally { // Finalmente
        setLoading(false);  // Seteamos el estado del spinner a false
      }
    };
    fetchData();  // Ejecutamos la función para cargar las facturas
  }, []);

  //////////////////////////////// MODAL
  const openDetailModal = async (billId) => { // Función para abrir el modal de detalles de la factura
    try { 
      const billDetails = await getBill(billId);  // Obtenemos los detalles de la factura
      setSelectedBillDetails(billDetails);  // Seteamos el estado de los detalles de la factura
      setShowDetailModal(true); // Seteamos el estado del modal a true para mostrar la factura
    } catch (error) { // Si hay un error
      console.error("Error al cargar los detalles de la factura:", error);  // Mostramos el error en consola
    }
  };

  const closeDetailModal = () => {  // Función para cerrar el modal de detalles de la factura
    setShowDetailModal(false);  // Seteamos el estado del modal a false para ocultar la factura
    setSelectedBillDetails({}); // Seteamos el estado de los detalles de la factura a vacio
  };

  return (  // Retornamos el componente
    <div className="table-container">
      <div className="tb">
        <h2>Historial de ventas</h2>
      </div>
      {loading ? (  // Si el estado del spinner es true
        <GridLoader // Mostramos el spinner
          color={"rgba(143, 215, 239, 0.8)"}
          loading={loading}
          size={15}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : ( // Si el estado del spinner es false mostramos la tabla
        <table> 
          <thead>
            <tr>
              <th>N° Factura</th>
              <th>Cliente</th>
              <th>Fecha</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody id="user-table">
            {bills.map((bill) => (  // Mapeamos las facturas y mostramos la info de cada una
              <tr key={bill.id}>  
                <td>{bill.id}</td>  
                <td>{bill.full_name}</td>
                <td>{bill.date}</td>
                <td>{bill.price}</td>
                <td>
                  <BsPass // Boton para ver los detalles de la factura
                    type="button"
                    className="icon icon-edit"
                    onClick={() => toast.promise(openDetailModal(bill.id), {loading:'Cargando detalles'})}  // Al hacer click en el boton mostramos el modal de detalles de la factura y el toaster de cargando
                  />{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {/* Aca esta el modal para detalle de la factura */}
      <BillModal  
        showModal={showDetailModal}
        closeModal={closeDetailModal}
        title={`Detalles de la Factura #${selectedBillDetails.id}`}
        billDetails={selectedBillDetails}
        onClose={closeDetailModal}
      />
      <Toaster position="top-right" duration={900} theme="dark" richColors />
    </div>
  );
}

export default Bills;
