const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
    ownerID:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    length:{
        type: String,
        required: true
    },
    artist:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Track', trackSchema);