import mongoose ,{Schema,Document} from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password?: string;
    googleId?: string;
    avatar?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        select: false,
    },
    googleId: {
        type: String,
        select: false,
        unique:true,
    },
    avatar: {
        type: String,
    },
    },
    {
        timestamps: true,
    }
);
const userModel = mongoose.model<IUser>("User", userSchema);

export default userModel;