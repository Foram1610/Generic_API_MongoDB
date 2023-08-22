const { check, validationResult } = require('express-validator')

exports.modelCheck = [
    check('tableName').trim().not().isEmpty().withMessage('Table name is required!!!')
]

exports.valResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = errors.array()[0].msg;
        return res.status(422).json({ status: 422, success: false, message: error })
    }
    next();
};