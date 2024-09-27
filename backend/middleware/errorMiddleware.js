//error catch for urls that does not exist
const notFound = (req,res,next)=>{
    const error = new Error(`Not found - ${req.originalURL}`);
    res.status(404);
    next(error);
}

//error catch for any errors occuring in our route
const errorHandler = (err,req,res,next)=>{
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    //mongoose have a special error castError - we have to handle it
    if(err.name === 'castError' && err.kind === 'ObjectId'){
        statusCode = 404;
        message = 'Resource not found';
    }

    res.status(statusCode).json({
        message,
        stack:process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

export {notFound,errorHandler};