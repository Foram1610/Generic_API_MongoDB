const jwt = require('jsonwebtoken');

var checkUser = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization && !authorization.startsWith('Bearer')) {
            return res.status(403).json({ message: 'Token required!!!' })
        }
        else {
            let token = authorization.split(' ')[1]
            const { id } = jwt.verify(token, process.env.SECRET_KEY)
            req.logInid = id;
            next();
        }
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized User!!' })
    }
}

module.exports = checkUser