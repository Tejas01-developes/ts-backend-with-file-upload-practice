import express from 'express';
import { getusers, loginuser, registeruser } from '../controller/usercontroll.js';
import { refreshfilter } from '@packages/tokens/dist/filter/refreshfilter.js';
const route = express.Router();
route.post("/", registeruser);
route.post("/login", loginuser);
route.get("/get", getusers);
route.post("/refreshfilter", refreshfilter);
// route.post("/upload",accessfilter,getur)
// route.post("/dbupload",accessfilter,dbindoc)
export default route;
//# sourceMappingURL=routes.js.map