const errorHandler = (err, req, res, next) => {
    console.log('Error Message', err);
    res.send(
        {
            error: err.error,
            status: err.code,
            message: 'error',
            timestamp: new Date()
        }

    );
};

export default errorHandler;
