const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: {
        type: "String",
        required: true,
        trim: true,
    },
    rating: {
        type: "Number",
        min: 1,
        max: 5,
    },
    difficulty: String,
    price: {
        type: "Number",
    }
});

module.exports = mongoose.model('Course', courseSchema);
