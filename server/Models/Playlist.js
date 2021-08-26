const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
    ownerID:{
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
    }],
    albums : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Album'
    }]
});

module.exports = mongoose.model('Playlist', playlistSchema);