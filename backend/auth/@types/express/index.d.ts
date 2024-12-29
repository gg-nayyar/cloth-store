import 'express';

declare module 'express' {
    export interface Request {
        cookies: { [key: string]: string };
    }
}
