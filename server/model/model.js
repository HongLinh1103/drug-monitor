const mongoose = require('mongoose');

const drugSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Drug name is required"],
        minlength: [6, "Drug name must be longer than 5 characters"]
    },
    dosage: {
        type: String,
        required: [true, "Dosage is required"]
    },
    card: {
        type: Number,
        required: [true, "Card value is required"],
        min: [1, "Card must be greater than 0"]
    },
    pack: {
        type: Number,
        required: [true, "Pack value is required"],
        min: [1, "Pack must be greater than 0"]
    },
    perDay: {
        type: Number,
        required: [true, "PerDay value is required"],
        min: [1, "PerDay must be > 0"],
        max: [89, "PerDay must be < 90"]
    }
}, { timestamps: true });

module.exports = mongoose.model('Drug', drugSchema);
