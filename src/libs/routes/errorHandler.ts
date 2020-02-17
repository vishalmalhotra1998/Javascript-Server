const errorHandler = (err, req, res, next) => {

    console.log('Error Message', err);
    const errorArray = [];
    if(err.isArray){
    err.forEach(element => {
        errorArray.push({
            error: element,
            status: 500,
            message: element,
            timestamp: new Date()
        });

    });

    res.send({errorArray});
}
res.send({err});
};

export default errorHandler;
