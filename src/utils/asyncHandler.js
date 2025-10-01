const asyncHandler = (reqHandler) => {   // higher order function
    return (req, res, next) => {
        Promise.resolve(reqHandler(req, res, next)).catch((err) => next(err));
    };
}


export { asyncHandler }