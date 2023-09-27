import { IHttpResponse } from './interface';

export default class ResponseDto {
    static success<T>(result: T, message = null): IHttpResponse<T> {
        return {
            success: true,
            message,
            result,
        };
    }

    static fail<T>(message: string): IHttpResponse<T> {
        return {
            success: false,
            message,
            result: null,
        };
    }
}
