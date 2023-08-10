import { Schema, SchemaTypes } from 'mongoose';

export const UserSchema = new Schema({
  email: {
    type: SchemaTypes.String,
    required: true,
  },
  password: {
    type: SchemaTypes.String,
    required: true,
  },
});
