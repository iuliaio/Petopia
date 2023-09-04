const handleError = (err, req, res, next) => {
    // Log the error stack to the console
    console.error(err.stack);

    // Send a "Internal Server Error" response with status code 500
    res.status(500).send('Internal Server Error');
};

module.exports = handleError