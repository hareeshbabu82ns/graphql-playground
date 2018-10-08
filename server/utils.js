const axios = require('axios');

function getSSOTokenFromCookie(request) {
    const list = {};
    const rc = request.headers.cookie;
    // console.log('Request Headers:', JSON.stringify(request.headers, null, 2));

    if (rc != null) {
        rc.split(';').forEach((cookie) => {
            const parts = cookie.split('=');
            list[parts.shift().trim()] = decodeURI(parts.join('='));
        });
    }

    return list.MYSAPSSO2;
}

module.exports = {
    getSSOToken: function getSSOToken(svcReq) {
        if (undefined === svcReq || svcReq.header === undefined) {
            return;
        }
        let MYSAPSSO2 = getSSOTokenFromCookie(svcReq);

        if (!MYSAPSSO2) { // if not found in Cookies
            // search within Headers
            MYSAPSSO2 = svcReq.headers.mysapsso2;
            if (!MYSAPSSO2) { // still not found, try with Caps
                MYSAPSSO2 = svcReq.headers.MYSAPSSO2;
            }
        }

        return MYSAPSSO2;
    },
    fetchUserData: function fetchUserData(req) {
        const url = process.env.SAP_USERS_SERVICE;
        const ssoToken = module.exports.getSSOToken(req);

        const httpConfig = {
            headers: {
                MYSAPSSO2: ssoToken,
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-correlation-id': '2018-02-23T17:58:43.753408Z_0de03f3e-d7fb-442d-a25c-351ac21eaefa',
            },
            method: 'GET',
            url,
        };
        return axios(httpConfig).then(({ data }) => ({ userData: data, ssoToken })).catch(() => { });
    }
}