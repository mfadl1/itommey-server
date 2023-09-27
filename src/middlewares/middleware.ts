import ResponseDto from '@/dtos/response.dto';
import { HttpException } from '@/exceptions/http.exception';
import { NextFunction, Request, Response } from 'express';

const errorMiddleware = (
    error: HttpException,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const httpCode: number = error.httpCode || 500;
        const message: string = error.message || 'Something went wrong';

        console.error(
            `[${req.method}] ${req.path} >> HttpCode:: ${httpCode}, Message:: ${message}`,
        );
        res.status(httpCode).json(ResponseDto.fail(message));
    } catch (error) {
        next(error);
    }
};

export default errorMiddleware;
