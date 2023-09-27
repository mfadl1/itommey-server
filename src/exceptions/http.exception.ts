import { HttpError } from 'routing-controllers';

export class HttpException extends HttpError {
    constructor(status: number, message: string) {
        super(status, message);
    }
}
