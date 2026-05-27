import mongoose from "mongoose";
declare const tokencollection2: mongoose.Model<{
    tokenid: string;
    useridid: string;
    refreshtoken: string;
    added_at: NativeDate;
    expired_at: NativeDate;
}, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    tokenid: string;
    useridid: string;
    refreshtoken: string;
    added_at: NativeDate;
    expired_at: NativeDate;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    tokenid: string;
    useridid: string;
    refreshtoken: string;
    added_at: NativeDate;
    expired_at: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    tokenid: string;
    useridid: string;
    refreshtoken: string;
    added_at: NativeDate;
    expired_at: NativeDate;
}, mongoose.Document<unknown, {}, {
    tokenid: string;
    useridid: string;
    refreshtoken: string;
    added_at: NativeDate;
    expired_at: NativeDate;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    tokenid: string;
    useridid: string;
    refreshtoken: string;
    added_at: NativeDate;
    expired_at: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    tokenid: string;
    useridid: string;
    refreshtoken: string;
    added_at: NativeDate;
    expired_at: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    tokenid: string;
    useridid: string;
    refreshtoken: string;
    added_at: NativeDate;
    expired_at: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default tokencollection2;
//# sourceMappingURL=tokenschema.d.ts.map