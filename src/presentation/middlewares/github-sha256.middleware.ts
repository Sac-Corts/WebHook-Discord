import crypto from "crypto";
import { NextFunction, Request, Response } from 'express';
import { envs } from '../../config';

const secretKey = envs.SECRET_TOKEN;

export class GithubSha256Middleware {

    static verifySignature = (req: Request, res: Response, next: NextFunction): void => {
        const expectedSignature = "sha256=" + crypto.createHmac("sha256", secretKey)
            .update(JSON.stringify(req.body))
            .digest("hex");

        const signature = req.headers["x-hub-signature-256"];
        if (signature !== expectedSignature) {
            res.status(401).send("Unauthorized");
            return;
        }

        next();
    }
}