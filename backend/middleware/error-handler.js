module.exports = errorHandler;

function errorHandler(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        // jwt authentication error
        if (process.env.NODE_ENV === 'development')
            return res.status(401).json({ message: 'Invalid Token' });
        else return res.status(401).json({ message: '401 Unauthorized' });
    }

    // default to 500 server error
    if (process.env.NODE_ENV === 'development') {
        console.log(err);
        return res.status(500).json({ message: err.message });
    } else
        return res.status(500).json({
            message:
                '500 The server experienced internal error processing your request.'
        });
}
