export interface ApiResponse <T> {
    success: boolean;
    title: string;
    message: string;
    body?: T ;

}

export class ResponseHelper {
    static success<T>(
        title: string,
        message: string, 
        body?: T
    ): ApiResponse<T>{
        return {
            success: true,
            title,
            message,
            body,
        };
    }
    
    
static error(
    title: string,
    message: string
): ApiResponse<null> {
    return {
        success: false,
        title,
        message,
        body: null,
    }
}
}

