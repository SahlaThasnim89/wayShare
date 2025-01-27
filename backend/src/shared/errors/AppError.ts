export class AppError extends Error {
    name: string;
    kind: string;
  
    constructor(message: string, name: string, kind: string) {
      super(message);
      this.name = name;
      this.kind = kind;
      Object.setPrototypeOf(this, AppError.prototype);
    }
  }
  