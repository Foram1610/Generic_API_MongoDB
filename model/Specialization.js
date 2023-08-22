const mongoose = require('mongoose');
const { PAGINATE_OPTIONS } = require('../util/pagination.constant');
const mongoosePaginate = require('mongoose-paginate-v2');

const SpecializationSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    specializationCode: {
        type: String,
        unique: true
    }
}, {
    timestamps: true
})

SpecializationSchema.statics.generateSpecializationCode = async function () {
    const total = await this.find().sort({ createdAt: -1 })
    let sCode, finalCode = 0
    if (total.length === 0) {
        finalCode = 1
    }
    else {
        let code = total[0]
        sCode = code.specializationCode.slice(4);
        finalCode = parseInt(sCode) + 1
    }
    const final = 'SP00' + finalCode.toString()
    return final;
};

SpecializationSchema.pre('save', async function () {
    this.specializationCode = await this.constructor.generateSpecializationCode();
});

mongoosePaginate.paginate.options = PAGINATE_OPTIONS;
SpecializationSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Specialization', SpecializationSchema, 'Specialization')