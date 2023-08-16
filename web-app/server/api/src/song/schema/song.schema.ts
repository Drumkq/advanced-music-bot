import { Schema, SchemaTypes } from "mongoose";
import { ISong } from "../interfaces/song.interface";

export const SongSchema = new Schema<ISong>({
    url: {
        type: SchemaTypes.String,
        required: true,
        unique: true,
    },
    songType: {
        type: SchemaTypes.String,
    }
});