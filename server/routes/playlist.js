const router = require('express').Router();
const verify = require('./verifyToken');
const Playlist = require('../Models/Playlist');

router.get('/', verify, async (req, res) => {
    try {
        const playlists = await Playlist.find({ ownerID: req.user._id }).populate('tracks').populate({ path: 'albums', populate: { path: 'tracks' } });
        res.status(200).send({ message: "Data retrieved successfully", data: playlists });
    } catch (err) {
        res.send({ message: "could not get Data", data: err })
    }
});

router.get('/:id', verify, async (req, res) => {
    try {
        const playlists = await Playlist.findOne({ ownerID: req.user._id, _id: req.params.id }).populate('tracks').populate({ path: 'albums', populate: { path: 'tracks' } });
        res.status(200).send({ message: "Data retrieved successfully", data: playlists });
    } catch (err) {
        res.send({ message: "could not get data", data: err })
    }
});

router.patch('/edit/:playlistID', verify, async (req, res) => {
    const query = {
        ownerID: req.user._id,
        _id: req.params.playlistID
    }
    try {
        const updatedPlaylist = await Album.updateOne(query, { $set: { "name": req.body.name } })
        res.status(200).send(updatedPlaylist)
    } catch (err) {
        res.send(err)
    }
});

router.post('/add', verify, async (req, res) => {
    const playlist = new Playlist({
        ownerID: req.user._id,
        name: req.body.name,
        tracks: [],
        albums: []
    })
    req.body.trackID.forEach(trackID => {
        playlist.tracks.push(trackID);
    });
    req.body.albumID.forEach(albumID => {
        playlist.albums.push(albumID);
    });
    try {
        const savedPlaylist = await playlist.save();
        res.status(200).send({ message: "Playlist added", data: savedPlaylist });
    } catch (err) {
        res.send({ message: "could not add playlist", data: err });
    }
});

router.patch('/addtracks/:playlistID', verify, async (req, res) => {
    console.log(req.params.playlistID)
    const query = {
        ownerID: req.user._id,
        _id: req.params.playlistID
    }
    console.log(query)
    try {
        const updatedPlaylist = await Playlist.updateOne(query, { $push: { "tracks": req.body.trackID } })
        res.status(200).send({ message: "Track added", data: updatedPlaylist })
    } catch (err) {
        res.send({ message: "could not add Track", data: err })
    }
});

router.patch('/removetrack/:playlistID', verify, async (req, res) => {
    const query = {
        ownerID: req.user._id,
        _id: req.params.playlistID
    }
    try {
        const removedTrack = await Playlist.updateOne(query, { $pull: { "tracks": req.body.trackID } })
        res.status(200).send({ message: "Track removed", data: removedTrack });
    } catch (err) {
        res.send({ message: "Could not remove Track", data: err })
    }
})

router.patch('/addalbums/:playlistID', verify, async (req, res) => {
    const query = {
        ownerID: req.user._id,
        _id: req.params.playlistID
    }
    try {
        const updatedPlaylist = await Playlist.updateOne(query, { $push: { "albums": req.body.albumID } })
        res.status(200).send({ message: "Album added to playlist", data: updatedPlaylist })
    } catch (err) {
        res.send({ message: "could not update playlist", data: err })
    }
});

router.patch('/removealbum/:playlistID', verify, async (req, res) => {
    const query = {
        ownerID: req.user._id,
        _id: req.params.playlistID
    }
    try {
        const updatedPlaylist = await Playlist.updateOne(query, { $pull: { "albums": req.body.albumID } })
        res.status(200).send({ message: "Album removed", data: updatedPlaylist });
    } catch (err) {
        res.send({ message: "could not update playlist", data: err });
    }
})

router.delete('/delete', verify, async (req, res) => {
    const query = {
        ownerID: req.user._id,
        _id: req.body.playlistID
    }
    try {
        const deletedPlaylist = await Playlist.deleteOne(query);
        res.send({ message: "Playlist deleted", data: deletedPlaylist });
    } catch (err) {
        res.send({ message: "Could not delete playlist", data: err });
    }
})

module.exports = router;