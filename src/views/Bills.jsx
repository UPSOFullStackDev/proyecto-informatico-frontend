import React, { useState, useEffect } from "react";
import { BsPass } from "react-icons/bs";
import { getBills } from "../controllers/billsFunctions.js";

function Bills() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const billsData = await getBills();
        setData(billsData);
      } catch (error) {
        console.error("Error al cargar las facturas:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="table-container">
      <div className="tb">
        <h2>Historial de ventas</h2>
      </div>
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
          {data.map((bill) => (
            <tr key={bill.id}>
              <td>{bill.id}</td>
              <td>{bill.full_name}</td>
              <td>{bill.date}</td>
              <td>{bill.price}</td>
              <td>
                <BsPass type="button" className="icon icon-edit" />{" "}

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Bills;
