"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.s3client = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
exports.s3client = new client_s3_1.S3Client({
    region: process.env.REGION,
    credentials: {
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRET_KEY
    }
});
//# sourceMappingURL=index.js.map