import jwt from 'jsonwebtoken';
import { accesstoken } from '../tokengenerator/generatetoken.js';
export const refreshfilter = (req, resp) => {
    const refreshh = req.cookies.refresh;
    console.log(refreshh);
    if (!refreshh) {
        return resp.status(400).json({ success: false, message: "no refresh token" });
    }
    try {
        const decode = jwt.verify(refreshh, process.env.REFRESH_KEY);
        const newaccess = accesstoken(decode.id);
        return resp.status(200).json({ success: true, access: newaccess });
    }
    catch (err) {
        return resp.status(400).json({ success: false, message: "refresh filter failed" });
    }
};
//# sourceMappingURL=refreshfilter.js.map