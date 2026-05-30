import { Request, RequestHandler, Response } from "express";
export declare const registeruser: RequestHandler;
export declare const loginuser: RequestHandler;
export declare const getusers: RequestHandler;
export declare const geturl: (req: Request, resp: Response) => Promise<Response<any, Record<string, any>>>;
interface idreq extends Request {
    id?: string;
}
export declare const dbindoc: (req: idreq, resp: Response) => Promise<Response<any, Record<string, any>>>;
export {};
//# sourceMappingURL=usercontroll.d.ts.map