import { Schema, SchemaTypes } from "mongoose";
import { IUser } from "../interface/user.interface";

export const UserSchema = new Schema<IUser>({
    discordId: {
        type: SchemaTypes.String,
        required: true,
        unique: true,
    },
    favoriteSongs: [{
        type: SchemaTypes.ObjectId,
        required: true,
        ref: 'song',
    }]
});