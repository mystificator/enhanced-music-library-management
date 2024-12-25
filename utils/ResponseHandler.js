export const handleResponse = (res, status = 200, data = null, message = '', error = null) => {
    return res.status(status).json({
        status,
        message,
        data,
        error,
    });
};