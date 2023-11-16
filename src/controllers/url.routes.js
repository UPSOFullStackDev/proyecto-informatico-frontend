const url = "https://100.20.92.101:1000/user/";
const user_id = localStorage.getItem("id");
const getBillsUrl = url + `${user_id}/sales`;
const getClientsUrl = url + `${user_id}/clients`;
const getProductsUrl = url + `${user_id}/products`;
const getServicesUrl = url + `${user_id}/services`;

// const oneClientUrl = `http://127.0.0.1:5000/user/${user_id}/clients/${clientId}`
// const oneProductUrl = `http://127.0.0.1:5000/user/${user_id}/products/${productId}`
// const oneServiceUrl = `http://127.0.0.1:5000/user/${user_id}/products/${serviceId}`
// const oneBillUrl = `http://127.0.0.1:5000/user/${user_id}/sales/${billId}`;

const loginUrl = `https://100.20.92.101:1000/user/login`

export default { getBillsUrl, getClientsUrl, getProductsUrl, getServicesUrl, loginUrl };

// render adresses
// 100.20.92.101
// 44.225.181.72
// 44.227.217.144