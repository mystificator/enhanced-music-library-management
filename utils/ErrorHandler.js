export class CustomError extends Error {
    constructor(status, message, details = null) {
        super(message);
        this.status = status;
        this.type = 'custom';
        this.details = details;
    }
}

export const handleError = (e, res, object) => {
    console.error(`[Error]: ${e.message}`, e.stack);

    let status = 500;
    let message = 'Internal server error.';
    let details = null;

    if (e.name === 'ValidationError') {
        const errors = Object.values(e.errors).map(err => err.message);
        const msg = errors.join(', ');

        if (msg === 'NotFound') {
            status = 404;
            message = "Resource doesn't exist.";
        } else {
            status = 400;
            message = msg;
            details = errors;
        }
    } else if (e.code === 11000) {
        status = 409;
        message = `${object} already exists.`;
    } else if (e.type === 'custom') {
        status = e.status;
        message = e.message;
        details = e.details;
    }

    return handleResponse(res, status, null, message, details);
};
