import jwt from 'jsonwebtoken';
export const accessfilter = (req, resp, next) => {
    console.log("in the access filter");
    const token = req.headers.authorization;
    const access = token?.split(" ")[1];
    console.log("access", access);
    if (!access) {
        return resp.status(400).json({ success: false, message: "no access token" });
    }
    try {
        const decode = jwt.verify(access, process.env.ACCESS_KEY);
        req.id = decode.id;
        next();
    }
    catch (err) {
        return resp.status(400).json({ success: false, message: "access filter failed" });
    }
};
//# sourceMappingURL=accessfilter.js.map