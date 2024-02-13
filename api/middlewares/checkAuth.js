const jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const encodedToken = jwt.verify(token, 'this_should_be_long');
        req.userData = { email: encodedToken.email, userId: encodedToken.userId };
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'Authorization failed!' })
    }
}