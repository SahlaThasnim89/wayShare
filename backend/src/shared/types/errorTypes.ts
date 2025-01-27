export interface AppError {
    statusCode: number;
    message: string;
    stack?: string;
  }