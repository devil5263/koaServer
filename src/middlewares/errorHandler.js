const config = require("config-lite");
const { FatalError, CommonError } = require("../error");

let errorCount = 0;

module.exports = async (ctx, next) => {
    try {
        await next();
    } catch (err) {

        if (err == null) {
            err = new FatalError();
        }
        else if (err instanceof CommonError) {
            ctx.status = 200;
            ctx.type = "application/json";
            ctx.body = {
                errmsg: err.message
            };
        } else {
            ctx.status = err.status || 500;
            ctx.type = "application/json";
            ctx.body = config.debug ? {
                errors: [{
                    id: errorCount++,
                    status: ctx.status,
                    title: err.message,
                    detail: err.stack
                }]
            } : "server error";
            ctx.app.emit("error", err, this);
        }
    }
};
