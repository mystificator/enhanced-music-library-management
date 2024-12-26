import { handleError, CustomError } from './ErrorHandler.js';
import { handleResponse } from './ResponseHandler.js';


const validateFields = (data, allowedFields) => {
    const invalidFields = Object.keys(data).filter(
        (field) => !allowedFields.includes(field)
    );
    if (invalidFields.length > 0) {
        throw new CustomError(400, `Bad Request, Reason: Invalid fields - ${invalidFields.join(', ')}.`);
    }
};

const fetchRecords = async ({ model, query, filterParams, res, successMessage }) => {
    try {
        const { limit = 5, offset = 0, ...filters } = query;
        const filter = Object.fromEntries(
            filterParams.map((param) => [
                param,
                param === 'hidden'
                    ? filters[param] === 'true'
                    : param === 'grammy'
                        ? parseInt(filters[param], 10)
                        : filters[param],
            ]).filter(([key, value]) => value !== undefined)
        );

        const records = await model.find(filter).skip(parseInt(offset, 10)).limit(parseInt(limit, 10));
        handleResponse(res, 200, records, successMessage, null);
    } catch (e) {
        handleError(e, res, model.modelName);
    }
};

const fetchRecordById = async ({ model, idField, id, res, successMessage, notFoundMessage }) => {
    try {
        const record = await model.findOne({ [idField]: id });
        if (!record) throw new CustomError(404, notFoundMessage);
        handleResponse(res, 200, record, successMessage, null);
    } catch (e) {
        handleError(e, res, model.modelName);
    }
};

const addNewRecord = async ({ model, data, res, successMessage }) => {
    try {
        validateFields(data, Object.keys(model.schema.paths));
        await model.create(data);
        handleResponse(res, 201, null, successMessage, null);
    } catch (e) {
        handleError(e, res, model.modelName);
    }
};

const updateRecord = async ({ model, idField, id, updates, res, notFoundMessage }) => {
    try {
        validateFields(updates, Object.keys(model.schema.paths));
        const result = await model.updateOne({ [idField]: id }, { $set: updates }, { runValidators: true });

        if (result.matchedCount === 0) throw new CustomError(404, notFoundMessage);
        res.status(204).send();
    } catch (e) {
        handleError(e, res, model.modelName);
    }
};

const deleteRecord = async ({ model, idField, id, res, notFoundMessage }) => {
    try {
        const result = await model.deleteOne({ [idField]: id });
        if (result.deletedCount === 0) throw new CustomError(404, notFoundMessage);
        handleResponse(res, 200, { [idField]: id }, `${model.modelName} deleted successfully.`, null);
    } catch (e) {
        handleError(e, res, model.modelName);
    }
};

export default { fetchRecords, fetchRecordById, addNewRecord, updateRecord, deleteRecord }
