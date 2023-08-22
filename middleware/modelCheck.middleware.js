const modelName = require('../util/models')
module.exports = checkModel = (model) => {
    if (!modelName.model[model]) {
        return { message: "Please enter correct table name!!" }
    }
    return modelName.model[model]
}

