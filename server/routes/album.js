const router = require('express').Router();
const verify = require('./verifyToken');
const Album = require('../Models/Album');

router.get('/', verify, async (req, res) => {
    try {
        const albums = await Album.find({ ownerID: req.user._id }).populate('tracks');
        res.status(200).send({ message: "Data retrieved successfully", data: albums });
    } catch (err) {
        res.send({ message: "Not found", data: err })
    }
});

router.get('/:id', verify, async (req, res) => {
    console.log(req.params.id)
    try {
        const album = await Album.findOne({ ownerID: req.user._id, _id: req.params.id }).populate('tracks');
        res.status(200).send({ message: "Data retrieved successfully", data: album });
    } catch (err) {
        res.send({ message: "Not found", data: err })
    }
});


router.post('/add', verify, async (req, res) => {
    console.log(req.body)
    const album = new Album({
        ownerID: req.user._id,
        name: req.body.name,
        tracks: []
    })
    req.body.trackID.forEach(trackID => {
        album.tracks.push(trackID);
    });
    try {
        const savedAlbum = await album.save();
        res.staus(200).send({ message: "Album added", data: savedAlbum });
    } catch (err) {
        res.send({ message: "Could not add album", data: err })
    }
});

router.patch('/edit/:albumID', verify, async (req, res) => {
    const query = {
        ownerID: req.user._id,
        _id: req.params.albumID
    }
    try {
        const updatedAlbum = await Album.updateOne(query, { $set: { "name": req.body.name } })
        res.staus(200).send({ message: "Album added", data: updatedAlbum });
    } catch (err) {
        res.send({ message: "Could not update album", data: err })
    }
});

router.patch('/addtracks/:albumID', verify, async (req, res) => {
    console.log(req.params.albumID)
    const query = {
        ownerID: req.user._id,
        _id: req.params.albumID
    }
    try {
        const updatedAlbum = await Album.updateOne(query, { $push: { "tracks": req.body.trackID } });
        console.log(updatedAlbum)
        res.staus(200).send({ message: "Track added", data: updatedAlbum });
    } catch (err) {
        res.send({ message: "Could not update album", data: err })
    }
});

router.patch('/removetrack/:albumID', verify, async (req, res) => {
    const query = {
        ownerID: req.user._id,
        _id: req.params.albumID
    }
    try {
        const removedTrack = await Album.updateOne(query, { $pull: { "tracks": req.body.trackID } })
        res.status(200).send({ message: "Track removed", data: removedTrack });
    } catch (err) {
        res.send({ message: "Could not update album", data: err })
    }
})

router.delete('/delete', verify, async (req, res) => {
    const query = {
        ownerID: req.user._id,
        _id: req.body.albumID
    }
    try {
        const deletedAlbum = await Album.deleteOne(query);
        res.status(200).send({ message: "Album deleted", data: deletedAlbum });
    } catch (err) {
        res.send(err)
    }
})

module.exports = router;