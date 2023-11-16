import { fetchData, getRequestOptions } from "./utils.js";

const user_id = localStorage.getItem("id");
const billsUrl = `http://100.20.92.101:5000/user/${user_id}/sales`;

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

