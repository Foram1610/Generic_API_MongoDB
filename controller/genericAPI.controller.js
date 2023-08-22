const paginate = require('../helper/paginate')
const getById = require('../helper/getById')
const modelCheck = require('../middleware/modelCheck.middleware')

exports.add = async (req, res, next) => {
    try {
        const modelName = modelCheck(req.params.modelName)
        if (typeof modelName === 'object') next(modelName)

        const addData = await modelName.create(req.body)
        if (!addData) {
            return res.status(400).json({ success: false, status: 400, message: "Something went wrong, Not able to add the data" })
        }
        return res.status(200).json({ success: true, status: 200, message: "Data added successfully" })
    }
    catch (error) {
        next(error);
    }
}

exports.update = async (req, res, next) => {
    try {
        const modelName = modelCheck(req.params.modelName)
        if (typeof modelName === 'object') next(modelName)

        const updateData = await modelName.findByIdAndUpdate(req.params.id, req.body)
        if (!updateData) {
            return res.status(400).json({ success: false, status: 400, message: "Something went wrong, Not able to update the data" })
        }
        return res.status(200).json({ success: true, status: 200, message: "Data updated successfully" })
    }
    catch (error) {
        next(error);
    }
}

exports.delete = async (req, res, next) => {
    try {
        const modelName = modelCheck(req.params.modelName)
        if (typeof modelName === 'object') next(modelName)

        const deleteData = await modelName.findByIdAndRemove(req.params.id)
        if (!deleteData) {
            return res.status(400).json({ success: false, status: 400, message: "Something went wrong, Not able to delete the data" })
        }
        return res.status(200).json({ success: true, status: 200, message: "Data deleted successfully" })
    }
    catch (error) {
        next(error);
    }
}

exports.getById = async (req, res, next) => {
    try {
        const modelName = modelCheck(req.params.modelName)
        if (typeof modelName === 'object') next(modelName)

        const option = { ...req.body };
        if (!option.hasOwnProperty('query')) {
            option['query'] = {};
        }
        option.query['_id'] = req.params.id
        const getAll = await getById(option, modelName);
        if (!getAll) {
            return res.status(400).json({ success: false, status: 400, message: "Something went wrong, Not able to fetch the data" })
        }
        return res.status(200).json({ success: true, status: 200, data: getAll })
    }
    catch (error) {
        next(error);
    }
}

exports.getAll = async (req, res, next) => {
    try {
        const modelName = modelCheck(req.params.modelName)
        if (typeof modelName === 'object') next(modelName)

        const option = { ...req.body };
        if (!option.hasOwnProperty('query')) {
            option['query'] = {};
        }
        const getAll = await paginate(option, modelName);
        if (!getAll) {
            return res.status(400).json({ success: false, status: 400, message: "Something went wrong, Not able to fetch the data" })
        }
        return res.status(200).json({ success: true, status: 200, data: getAll })
    }
    catch (error) {
        next(error);
    }
}