export interface ApiResponse<T> {
    message: string;
    data: { page: T };
}
