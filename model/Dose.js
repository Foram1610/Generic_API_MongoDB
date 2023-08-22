const mongoose = require('mongoose');
const { PAGINATE_OPTIONS } = require('../util/pagination.constant');
const mongoosePaginate = require('mongoose-paginate-v2');

const DoseSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    type: {
        type: String,
        enum: ["Drugs", "Injection"]
    },
    description: String
}, {
    timestamps: true
})

mongoosePaginate.paginate.options = PAGINATE_OPTIONS;
DoseSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Dose', DoseSchema, 'Dose')