const errorHandler = (err, req, res, next) => {

    console.log('Error Messageeeeeeeeeeeeeeee', err.message);
    const errorArray = [];
    if (Array.isArray(err)) {
        err.forEach(element => {
            errorArray.push({
                error: element,
                status: 500,
                message: element,
                timestamp: new Date()
            });

        });

        res.send({ errorArray });
    } else {
        res.send({
            error: err.message,
            message: 'error',
            status: 500,
            timestamp: new Date()

        });
    }
};

export default errorHandler;
