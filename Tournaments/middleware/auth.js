const ErrorResponse = require('../utils/errorResponse');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.isAuthenticated = async (req, res, next) => {
    try {
        const tokenn = req.headers.cookie;
        const token = tokenn.substring(6);

        console.log("Token from cookies:", token);

        if (!token) {
            return next(new ErrorResponse('Musiesz się zalogować', 401));
        }

        const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
        req.user = await User.findById(decoded.id);
        next();
    } catch (error) {
        console.error("Error in isAuthenticated middleware:", error);
        return next(new ErrorResponse('Musisz się zalogować', 401));
    }
}

exports.isAdmin = (req, res, next) => {
    if (req.user.role === 'user') {
        return next(new ErrorResponse('Nieudana opracja, musisz być adminem', 405));
    }
    next();
}
exports.isVerificated = (req, res, next) => {
    if (req.user.verification === false) {
        return next(new ErrorResponse('Nieudana opracja, musisz być zweryfikowany', 406));
    }
    next();
}