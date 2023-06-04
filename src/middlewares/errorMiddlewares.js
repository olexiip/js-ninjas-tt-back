
function errorHandler(err, req, res, next) {
    if (err) {
        if (!err.status) {
            console.log(err);
            return res.status(500).json({
                message: "something went wrong..."
            });
        }
        return res.status(err.status).json({
            message: err.message
        });     
    }
    next()
};
export default errorHandler;
