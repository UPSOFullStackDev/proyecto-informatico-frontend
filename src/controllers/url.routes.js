const url = "https://proyecto-informatico-backend.onrender.com/user/";
const user_id = localStorage.getItem("id");
const getBillsUrl = `https://proyecto-informatico-backend.onrender.com/user/${user_id}/sales`;
const getClientsUrl = `https://proyecto-informatico-backend.onrender.com/user/${user_id}/clients`;
const getProductsUrl = `https://proyecto-informatico-backend.onrender.com/user/${user_id}/products`;
const getServicesUrl = `https://proyecto-informatico-backend.onrender.com/user/${user_id}/services`;

// const oneClientUrl = `http://127.0.0.1:5000/user/${user_id}/clients/${clientId}`
// const oneProductUrl = `http://127.0.0.1:5000/user/${user_id}/products/${productId}`
// const oneServiceUrl = `http://127.0.0.1:5000/user/${user_id}/products/${serviceId}`
// const oneBillUrl = `http://127.0.0.1:5000/user/${user_id}/sales/${billId}`;

const loginUrl = `https://proyecto-informatico-backend.onrender.com/user/login`

export default { getBillsUrl, getClientsUrl, getProductsUrl, getServicesUrl, loginUrl };

// render api domain
// https://proyecto-informatico-backend.onrender.com/
// 10.220.161.230:5000

// render adresses
// 100.20.92.101
// 44.225.181.72
// 44.227.217.144