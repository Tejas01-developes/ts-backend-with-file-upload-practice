import express from 'express';
import { loginuser, registeruser } from '../controller/usercontroll.js';
const route = express.Router();
route.post("/", registeruser);
route.post("/login", loginuser);
export default route;
//# sourceMappingURL=route.js.map