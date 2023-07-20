const requireAuth = (req, res, next) => {
    // check if user is authenticated
    const authHeader = req.headers.authorization;

    if (authHeader) {
        console.log("OK");
        // if authenticated, call next to proceed to the next middleware or route handler
        return next();
    } else {
        // if not authenticated, redirect to login page or return an error response
        return res.json("YOU ARE NOT LOGGED IN");
    }
};

module.exports = {
    requireAuth,
};
