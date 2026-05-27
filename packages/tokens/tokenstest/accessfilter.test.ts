import { NextFunction, Response } from "express"
import { accessfilter, customrequest } from "../src/filter/accessfilter.js"
import jwt from 'jsonwebtoken';


jest.mock("jsonwebtoken")

describe("access filter check",()=>{

    let mockreq:Partial<customrequest>
    let mockresp:Partial<Response>
    let mocknext:NextFunction

beforeEach(()=>{

mockreq={
headers:{

}
},

mockresp={
    status:jest.fn().mockReturnThis(),
    json:jest.fn()
},
mocknext=jest.fn()
process.env.ACCESS_KEY="fdhhjtyjrdghrfjtrfgdfjr"
})

afterAll(()=>{
    jest.clearAllMocks()
})

it("if token is not tere then it should fail",async()=>{
    mockreq.headers={authorization:"Bearer"}
accessfilter(mockreq as customrequest,mockresp as Response,mocknext)
expect(mockresp.status).toHaveBeenCalledWith(400)
// expect(mockresp.json).toHaveBeenCalledWith({message:"no access token"})
expect(mocknext).not.toHaveBeenCalled()
})

it("if token is not htere then it should fail",async()=>{
    mockreq.headers={authorization:"Bearer invalid_token"}
accessfilter(mockreq as customrequest,mockresp as Response,mocknext);
(jwt.verify as jest.Mock).mockImplementation(()=>{
    throw new Error("invalid signature")
})
expect(jwt.verify).toHaveBeenCalledWith("invalid_token","fdhhjtyjrdghrfjtrfgdfjr")
expect(mockresp.status).toHaveBeenCalledWith(400)
expect(mockresp.json).toHaveBeenCalledWith({message:"access filter failed"})
expect(mocknext).not.toHaveBeenCalled()
})

it("if token is not htere then it should fail",async()=>{
    mockreq.headers={authorization:"Bearer valid_token"}
    const payload={
        id:"12345",
        key:"fdhhjtyjrdghrfjtrfgdfjr"
    }as {id:string,key:string}
accessfilter(mockreq as customrequest,mockresp as Response,mocknext);
(jwt.verify as jest.Mock).mockReturnValue({payload})

expect(jwt.verify).toHaveBeenCalledWith("valid_token","fdhhjtyjrdghrfjtrfgdfjr")
expect(mockreq.id).toBe("12345")
expect(mocknext).not.toHaveBeenCalled()
})


})
    

