// src/app/interfaces/response.interface.ts

export interface IResponseInterface {
    time: string; // ISO 8601 date string
    success: boolean;
    message: string;
    requestId: string;
    data: any;
    errors: any[]; // Assuming errors can be of any type, you can define a more specific type if needed
}