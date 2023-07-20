const jwt = require("jsonwebtoken");

const verifyAccessToken = (req, res, next) => {
    const token = req.header("access-token");
    if (!token) return res.status(401).send("Access denied");

    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) return res.status(403).send("Token is not valid!");
        req.user = user;
        next();
    });
};

const verifyUser = (req, res, next) => {
    verifyAccessToken(req, res, () => {
        if (req.user._id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            return res.status(403).send("You are not authorized!");
        }
    });
};

const verifyAdmin = (req, res, next) => {
    verifyAccessToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            return res.status(403).send("You are not authorized!");
        }
    });
};

module.exports = {
    verifyAccessToken,
    verifyAdmin,
    verifyUser,
};
