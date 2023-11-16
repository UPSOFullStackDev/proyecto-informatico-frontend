import { fetchData, getRequestOptions } from "./utils.js";

const user_id = localStorage.getItem("id");
const billsUrl = `http://10.220.161.230:5000/user/${user_id}/sales`;

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

