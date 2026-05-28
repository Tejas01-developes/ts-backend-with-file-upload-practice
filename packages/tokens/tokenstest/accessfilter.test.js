import { accessfilter } from "../src/filter/accessfilter.js";
import jwt from 'jsonwebtoken';
jest.mock("jsonwebtoken");
describe("access filter check", () => {
    let mockreq;
    let mockresp;
    let mocknext;
    beforeEach(() => {
        mockreq = {
            headers: {}
        },
            mockresp = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            },
            mocknext = jest.fn();
        process.env.ACCESS_KEY = "fdhhjtyjrdghrfjtrfgdfjr";
    });
    afterAll(() => {
        jest.clearAllMocks();
    });
    it("if token is not tere then it should fail", async () => {
        mockreq.headers = { authorization: "Bearer" };
        accessfilter(mockreq, mockresp, mocknext);
        expect(mockresp.status).toHaveBeenCalledWith(400);
        // expect(mockresp.json).toHaveBeenCalledWith({message:"no access token"})
        expect(mocknext).not.toHaveBeenCalled();
    });
    it("if invalid token is there", async () => {
        mockreq.headers = { authorization: "Bearer invalid_token" };
        accessfilter(mockreq, mockresp, mocknext);
        jwt.verify.mockImplementation(() => {
            throw new Error("invalid signature");
        });
        expect(jwt.verify).toHaveBeenCalledWith("invalid_token", "fdhhjtyjrdghrfjtrfgdfjr");
        expect(mockresp.status).toHaveBeenCalledWith(400);
        expect(mockresp.json).toHaveBeenCalledWith({ success: false, message: "access filter failed" });
        expect(mocknext).not.toHaveBeenCalled();
    });
    it("if valid token is there", async () => {
        mockreq.headers = { authorization: "Bearer valid_token" };
        const payload = {
            id: "12345",
            key: "fdhhjtyjrdghrfjtrfgdfjr"
        };
        jwt.verify.mockReturnValue(payload);
        accessfilter(mockreq, mockresp, mocknext);
        expect(jwt.verify).toHaveBeenCalledWith("valid_token", "fdhhjtyjrdghrfjtrfgdfjr");
        expect(mockreq.id).toBe("12345");
        expect(mockresp.status).not.toHaveBeenCalled();
        expect(mockresp.json).not.toHaveBeenCalled();
        expect(mocknext).toHaveBeenCalledTimes(1);
    });
});
//# sourceMappingURL=accessfilter.test.js.map