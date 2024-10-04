export class HTTPException extends Error {
    public statusCode: number;
  
    constructor(statusCode: number, message: string) {
      super(message);
      this.statusCode = statusCode;
    }
  
    static badRequest(message: string = 'Bad Request') {
      return new HTTPException(400, message);
    }
  
    static unauthorized(message: string = 'Unauthorized') {
      return new HTTPException(401, message);
    }
  
    static forbidden(message: string = 'Forbidden') {
      return new HTTPException(403, message);
    }
  
    static notFound(message: string = 'Not Found') {
      return new HTTPException(404, message);
    }
  
    static conflict(message: string = 'Conflict') {
      return new HTTPException(409, message);
    }
  
    static internal(message: string = 'Internal Server Error') {
      return new HTTPException(500, message);
    }
  }
  