const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../Models/User');

router.post('/register', async (req, res) => {
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) {
        return res.status(400).send('E mail already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })
    try {
        const savedUser = await user.save();
        res.send({ message: "User added successfully", data: savedUser });
    } catch (err) {
        res.send({ message: "Could not add User", data: err });
    }
});

router.post('/login', async (req, res) => {
    const userExists = await User.findOne({ email: req.body.email });
    if (!userExists) {
        return res.status(400).send('Account not found');
    }
    const validPassword = await bcrypt.compare(req.body.password, userExists.password);
    if (!validPassword) {
        return res.status(400).send('Invalid password');
    }
    const token = jwt.sign({ _id: userExists._id }, process.env.TOKEN_SECRET);
    res.send({
        data: userExists,
        'auth-token': token,
        'message': `Welcome ${userExists.name}`
    });
});


module.exports = router;