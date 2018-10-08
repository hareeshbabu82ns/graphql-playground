const axios = require('axios');

const defaultHeaders = JSON.parse(JSON.stringify(axios.defaults.headers));
const axiosCRM = axios.create({
    baseURL: `http://coresapdev101.dev.nonprod.atb.ab.com:8002/sap/bc/api`,
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    withCredentials: true,
});
axios.defaults.headers = defaultHeaders;
axiosCRM.defaults.params = { 'sap-client': '510' };

module.exports = axiosCRM;