const router = require('express').Router();
const verify = require('./verifyToken');
const Track = require('../Models/Track');

router.get('/', verify, async (req, res) => {
    try {
        const track = await Track.find({ ownerID: req.user._id });
        res.status(200).send({ message: "Data retrieved successfully", data: track });
    } catch (err) {
        res.send({ message: "could not get tracks", data: err })
    }
});

router.get('/:id', verify, async (req, res) => {
    try {
        const track = await Track.findOne({ _id: req.params.id, ownerID: req.user._id })
        res.status(200).send({ message: "Data retrieved successfully", data: track });
    } catch (err) {
        res.send({ message: "could not get track", data: err })
    }
})

router.post('/add', verify, async (req, res) => {
    const track = new Track({
        ownerID: req.user._id,
        title: req.body.title,
        length: req.body.length,
        artist: req.body.artist
    })
    try {
        const savedTrack = await track.save();
        res.status(200).send({ message: "Track added", data: savedTrack });
    } catch (err) {
        res.send({ message: "could not add track", data: err });
    }
});

router.patch('/update/:trackId', verify, async (req, res) => {
    try {
        const updatedTrack = await Track.updateOne({ _id: req.params.trackId, ownerID: req.user._id },
            { $set: { title: req.body.title, length: req.body.length, artist: req.body.artist } })
        res.status(200).send({ message: "Track updated successfully", data: updatedTrack })
    } catch (err) {
        res.send({ message: "could not update track", data: err });
    }
});

router.delete('/delete/:trackId', verify, async (req, res) => {
    try {
        const removedTrack = await Track.deleteOne({ _id: req.params.trackId, ownerID: req.user._id });
        res.status(200).send({ message: "Track deleted", data: removedTrack });
    }
    catch (err) {
        res.send({ message: "could not delete track", data: err });
    }
});

module.exports = router;