import mongoose from "mongoose";
const docschema = new mongoose.Schema({
    userid: {
        type: String,
        required: [true, "userid is required to be filled"],
        unique: true
    },
    key: {
        type: String,
        required: [true, "file name should be unique"],
        unique: true
    },
    filetype: {
        type: String,
        required: [true, "file recognise"],
    },
}, { timestamps: true });
const doccollection = mongoose.model("documents", docschema);
export default doccollection;
//# sourceMappingURL=docscgema.js.map