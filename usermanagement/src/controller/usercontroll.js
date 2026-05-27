import collection1 from "../schemas/schema1.js";
import bcrypt from 'bcrypt';
export const registeruser = async (req, resp) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return resp.status(400).json({ message: "body is not there" });
    }
    try {
        const hash = await bcrypt.hash(password, 10);
        await collection1.create({ name, email, password: hash });
        return resp.status(200).json({ message: "user registered" });
    }
    catch (err) {
        return resp.status(400).json({ message: "registration failed" });
    }
};
export const loginuser = async (req, resp) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return resp.status(400).json({ message: "body is not there" });
    }
    try {
        const res = await collection1.findOne({ email });
        if (!res) {
            return resp.status(400).json({ message: "result is empty" });
        }
        const compare = await bcrypt.compare(password, res.password);
        if (!compare) {
            return resp.status(400).json({ message: "password is incorrect" });
        }
        return resp.status(200).json({ message: "login succesfully done" });
    }
    catch (err) {
        return resp.status(400).json({ message: "login failed" });
    }
};
//# sourceMappingURL=usercontroll.js.map