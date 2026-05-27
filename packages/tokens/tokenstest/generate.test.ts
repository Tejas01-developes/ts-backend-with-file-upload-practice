import jwt from 'jsonwebtoken';
import { accesstoken, refreshtoken } from '../src/index.js';



jest.mock("jsonwebtoken")

describe("token generation test",()=>{
beforeEach(()=>{
    jest.clearAllMocks()
    process.env.ACCESS_KEY="gsrfgbhsdrgsdrgbstg"
    process.env.REFRESH_KEY="gibtigbntgibnrginr"
})


    it("generate access token",async()=>{
        (jwt.sign as jest.Mock).mockReturnValue("access token string");
        const res=accesstoken("12345")
        expect(res).toBe("access token string")
        expect(jwt.sign).toHaveBeenCalledWith(
            {id:"12345"},
            "gsrfgbhsdrgsdrgbstg",
            {expiresIn:"15m"}
        )
    })

    it("generate refresh token",async()=>{
        (jwt.sign as jest.Mock).mockReturnValue("refresh token string");
        const res=refreshtoken("12345")
        expect(res).toBe("refresh token string")
        expect(jwt.sign).toHaveBeenCalledWith(
            {id:"12345"},
            "gibtigbntgibnrginr",
            {expiresIn:"7d"}
        )
    })




})