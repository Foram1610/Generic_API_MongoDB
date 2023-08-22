const Patient = require('../model/Patient')
const Dose = require('../model/Dose')
const Disease = require('../model/Disease')
const Specialization = require('../model/Specialization')
module.exports = {
    model: {
        "patientModule": Patient,
        "doseModule": Dose,
        "diseaseModule": Disease,
        "specializationModule": Specialization
    }
}