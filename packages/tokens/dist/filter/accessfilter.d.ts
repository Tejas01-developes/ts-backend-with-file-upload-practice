import { NextFunction, Request, Response } from 'express';
export interface customrequest extends Request {
    id: string;
}
export declare const accessfilter: (req: customrequest, resp: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=accessfilter.d.ts.map