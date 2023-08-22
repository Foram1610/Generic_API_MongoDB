const mongoose = require('mongoose');
const { PAGINATE_OPTIONS } = require('../util/pagination.constant');
const mongoosePaginate = require('mongoose-paginate-v2');

const DiseaseSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    risk: {
        type: Boolean,
        default: false
    },
    description : String,
    specialization: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Specialization'
    }]
}, {
    timestamps: true
})

mongoosePaginate.paginate.options = PAGINATE_OPTIONS;
DiseaseSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Disease', DiseaseSchema, 'Disease')