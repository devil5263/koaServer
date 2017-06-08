class CommonError extends Error{
  constructor(message, code = 200, statusCode = 200) {
        super(message);
        this.name = this.constructor.name;
        this.message = message;
        this.code = code;
        this.statusCode = statusCode;
    }
}

class MongoDBError extends CommonError {
    constructor(massage = "database operation failed") {
        super(massage, 10001, 200);
    }
}

/**
 * 致命错误，不会被捕获
 */
class FatalError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        this.message = message;
        if (typeof Error.captureStackTrace === "function") {
            Error.captureStackTrace(this, this.constructor);
        } else {
            this.stack = (new Error(message)).stack;
        }
        if (!this.message) {
            this.message = "Null or undefined error";
        }
    }
};

module.exports = {
    CommonError,
    FatalError,
    MongoDBError
};
