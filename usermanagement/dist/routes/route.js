import express from 'express';
import { dbindoc, geturl, getusers, loginuser, registeruser } from '../controller/usercontroll.js';
import { refreshfilter } from '@packages/tokens/dist/filter/refreshfilter.js';
const route = express.Router();
route.post("/", registeruser);
route.post("/login", loginuser);
route.get("/get", getusers);
route.post("/refreshfilter", refreshfilter);
route.post("/upload", geturl);
route.post("/dbupload", dbindoc);
export default route;
//# sourceMappingURL=route.js.map