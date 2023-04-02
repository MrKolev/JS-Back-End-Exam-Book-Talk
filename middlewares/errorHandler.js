export function errorHandler(err, req, res, next){
    err.status = err.status || 500;
    err.message = err.message || "Something went wrong!";

    next(err);
}