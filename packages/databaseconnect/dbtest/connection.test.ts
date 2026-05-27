import mongoose from "mongoose"
import dbconnection from '../src/index.js'
jest.mock("mongoose")


describe("dbconnection test",()=>{
let consolespy:jest.SpyInstance
   beforeAll(()=>{
    jest.clearAllMocks()

    process.env.DB_URL="http://fakehost:5177"
    consolespy=jest.spyOn(console,"log").mockImplementation();
   })
   afterEach(()=>{
    consolespy.mockRestore()
   })

it("it should connect to the database",async()=>{
    (mongoose.connect as jest.Mock).mockResolvedValueOnce(true)
    await dbconnection.connect()

    expect(mongoose.connect).toHaveBeenCalled();
    expect(consolespy).toHaveBeenCalledWith("database connected")
})

it("it should not connect to the database",async()=>{
    (mongoose.connect as jest.Mock).mockRejectedValueOnce(new Error("network timeout"))
    

    expect(dbconnection.connect).rejects.toThrow("database connection failed");
    expect(consolespy).not.toHaveBeenCalled()
})


})