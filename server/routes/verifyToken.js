const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) =>{
    const authorization = req.header('Authorization');
    const tokenAuth = authorization.split(' ')
    const token = tokenAuth[1];
    if (!token) {
        return res.status(401).send('Access Denied');
    }
    try {
        const verified = await jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid token');
    }
}