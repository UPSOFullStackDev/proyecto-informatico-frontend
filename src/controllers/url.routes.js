const user_id = localStorage.getItem("id");
const getBillsUrl = `http://127.0.0.1:5000/user/${user_id}/sales`;
const getClientsUrl = `http://127.0.0.1:5000/user/${user_id}/clients`;
const getProductsUrl = `http://127.0.0.1:5000/user/${user_id}/products`;
const getServicesUrl = `http://127.0.0.1:5000/user/${user_id}/services`;

// const oneClientUrl = `http://127.0.0.1:5000/user/${user_id}/clients/${clientId}`
// const oneProductUrl = `http://127.0.0.1:5000/user/${user_id}/products/${productId}`
// const oneServiceUrl = `http://127.0.0.1:5000/user/${user_id}/products/${serviceId}`
// const oneBillUrl = `http://127.0.0.1:5000/user/${user_id}/sales/${billId}`;

const loginUrl = `http://127.0.0.1:5000/user/login`

export default { getBillsUrl, getClientsUrl, getProductsUrl, getServicesUrl, loginUrl };