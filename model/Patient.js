const mongoose = require('mongoose');
const { PAGINATE_OPTIONS } = require('../util/pagination.constant');
const mongoosePaginate = require('mongoose-paginate-v2');
const moment = require('moment')

const PatientSchema = new mongoose.Schema({
    patientCode: {
        type: String
    },
    name: {
        type: String,
        require: true
    },
    sex: String,
    category: {
        type: String,
        enum: ["Employee", "Non-Dependent", "Dependent", "Emergency Patient"]
    },
    address: String,
    employeeNo: {
        type: String,
        default: ""
    },
    eligibilityGrade: String,
    relationWithEmployee: {
        type: String,
        default: ""
    },
    dateOfBirth: Date,
    bloodGroup: {
        type: String,
        enum: ['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-']
    },
    contactDetails: {
        type: String
    },
    highRiskPatient: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ["Active", "Terminated", "Superannuated"],
        default: "Active"
    },
    statusDate: {
        type: Date,
        default: () => moment().format('YYYY-MM-DD')
    },
    dateOfRetirement: Date,
    allergyDetails: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Disease'
    }],
    highRiskDetails: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Disease'
    }]
}, {
    timestamps: true
})

PatientSchema.statics.generatePatientCode = async function () {
    const total = await this.find().sort({ createdAt: -1 })
    let sCode, finalCode = 0
    if (total.length === 0) {
        finalCode = 1
    }
    else {
        let code = total[0]
        sCode = code.patientCode.slice(4);
        finalCode = parseInt(sCode) + 1
    }
    const final = 'PC00' + finalCode.toString()
    return final;
};

PatientSchema.pre('save', async function () {
    this.patientCode = await this.constructor.generatePatientCode();
    this.dateOfBirth = moment(this.dateOfBirth).format('YYYY-MM-DD')
    this.statusDate = moment(this.statusDate).format('YYYY-MM-DD')
    this.dateOfRetirement = moment(this.dateOfRetirement).format('YYYY-MM-DD')

});

mongoosePaginate.paginate.options = PAGINATE_OPTIONS;
PatientSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Patient', PatientSchema, 'Patient')