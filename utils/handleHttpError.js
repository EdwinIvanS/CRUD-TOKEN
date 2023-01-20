const handleHttpError = {
    httpError: (res, message, code) => {
        res.status(code).json({ status : code, message: message });
    }
}
module.exports = handleHttpError;