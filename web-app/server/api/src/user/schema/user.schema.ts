import { Schema, SchemaTypes, Types } from 'mongoose';

export const UserSchema = new Schema({
  discordId: {
    type: SchemaTypes.String,
    required: true,
    unique: true,
  },
  favoriteSongs: [
    {
      type: {
        url: {
          type: SchemaTypes.String,
          required: true,
        },
        songType: {
          type: SchemaTypes.String,
          required: true,
        },
      },
      required: true,
    },
  ],
});
