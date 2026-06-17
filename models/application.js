const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    course: { type: String, required: true },
    marks12th: { type: Number, required: true }, // 12th Grade Percentage
    status: { type: String, default: 'Pending' } // Pending, Approved, Rejected
});

module.exports = mongoose.model('Application', applicationSchema);