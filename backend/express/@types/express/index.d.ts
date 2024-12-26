import 'express';

declare global {
    namespace Express {
        interface Request {
            user?: any;
            locals?: any;
        }
    }
}
