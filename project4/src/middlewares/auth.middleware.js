const jwt = require('jsonwebtoken');


const authArtist = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "unauthorized"
        })
    }


    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (decoded.role !== "artist") {
            return res.status(403).json({
                message: "you don't have access"
            })
        }

        req.user = decoded; // create a new property
        next()

    } catch (err) {
        console.log(err);
        return res.status(401).json({ message: "unauthorized" })
    }
}

const authUser = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        res.status(401).json({
            message: "unauthorized"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role !== "user") {
            return res.status(403).json({
                message: "you don't have access"
            })
        }
        req.user = decoded
        next()

    } catch (err) {
        console.log(err);
        return res.status(401).json({
            message: "unauthorized"
        })
    }
}

module.exports = { authArtist, authUser };