import { fetchData, getRequestOptions } from "./utils.js";

const user_id = localStorage.getItem("id");
const billsUrl = `https://proyecto-informatico-backend.onrender.com/user/${user_id}/sales`;

const requestOptions = getRequestOptions();

export function getBills(){
    return fetchData(billsUrl, requestOptions)
      .then((data) => {
        return data
      })
      .catch((error) => {
        console.error("Error al cargar las facturas:", error);
        return [];
      });
};

