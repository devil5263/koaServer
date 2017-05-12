const request = require("request-promise");

const httpProxyApi = "http://api.xicidaili.com/free2016.txt";

module.exports.getIp = () => {
    request.get(httpProxyApi);
};

