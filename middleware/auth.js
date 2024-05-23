const jwt = require('jsonwebtoken');

const authCheck = (req, res, next) => {  // Include `next` in the function parameters
    let token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        token = token.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;  // Assuming your token stores the user's ID as `id`
        next();  // Continue to the next middleware or route handler
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token', error: error.message });
    }
};

module.exports = { authCheck };
