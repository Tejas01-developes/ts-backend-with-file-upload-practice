import mongoose from "mongoose";
const userentry = new mongoose.Schema({
    userid: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: [true, "name is compulsary field"]
    },
    email: {
        type: String,
        required: [true, "email is compulsary field"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "password is compulsary field"],
    },
}, { timestamps: true });
const collection1 = mongoose.model("users", userentry);
export default collection1;
//# sourceMappingURL=schema1.js.map