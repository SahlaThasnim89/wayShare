import { Request, Response, NextFunction } from "express"
import { AppError } from "../../../shared/errors/AppError"


const notFound=(req:Request,res:Response,next:NextFunction):void=>{
    const error=new Error(`Not Found - ${req.originalUrl}`)
    res.status(404)
    next(error)
}


const errorHandler=(err:AppError,req:Request,res:Response,next:NextFunction)=>{
    let statusCode=res.statusCode===200?500:res.statusCode;
    let message=err.message;


    if(err.name==='CastError' && err.kind==='ObjectId'){
        statusCode=404
        message="Resource not found"
    }

    res.status(statusCode).json({
        message,
        stack:process.env.NODE_ENV==='production'?null:err.stack
    })
}

export {notFound,errorHandler}