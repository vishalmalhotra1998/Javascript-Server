const errorHandler = (err, req, res, next) => {

    console.log('Error Message', err);
    const error = [];
    if (Array.isArray(err)) {
        err.forEach(element => {
            error.push({
                error: element,
                status: 500,
                message: element,
                timestamp: new Date()
            });

        });

        res.send({ error });
    } else {
        res.send({
            error: err.error,
            message: err.message,
            status: 500,
            timestamp: new Date()

        });
    }
};

export default errorHandler;
