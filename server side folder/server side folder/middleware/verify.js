const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
const Users = require('../model/UserSchema');

const auth = async (req, res , next ) => {
    try {
        const token = req.headers.authorization.split(' ')[1];

        const decodedData = jwt.verify(token, JWT_SECRET_KEY);
        req.userId = decodedData?.id;

        const user = await Users.findById({_id : req.userId});
        req.user = user;

        next();

    } catch (error) {
        console.log(`error in middleware ` ,error )
    }
}

module.exports = auth;