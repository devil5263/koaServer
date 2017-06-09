const net = require("net");

module.exports = function(ip) {
    let socket = new net.Socket();
    return new Promise((reslove, reject) => {
        socket.setTimeout(1000);
        socket.on("Timeout", () => {
            socket.end();
            socket = null;
            reject({ alive: false });
        });
        socket.on("error", (err) => {
            socket = null;
            reject({ alive: false, err: err.name });
        });
        socket.connect({
            host: ip.path,
            port: ip.port
        }, () => {
            socket.end();
            socket = null;
            reslove({ alive: true });
        });
    });
};
