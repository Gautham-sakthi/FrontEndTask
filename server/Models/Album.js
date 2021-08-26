const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
    ownerID: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    tracks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Track'
    }]
});

module.exports = mongoose.model('Album', albumSchema);