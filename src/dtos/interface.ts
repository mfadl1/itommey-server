export interface IHttpResponse<T> {
    readonly success: boolean;
    readonly result: T | null;
    readonly message?: string;
}
