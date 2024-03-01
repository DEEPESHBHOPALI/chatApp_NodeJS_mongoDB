import { Schema, model } from 'mongoose';

const groupSchema = new Schema({
  name: { type: String, required: true },
  members: [{ type: String, ref: 'User' }]
});

export default model('Group', groupSchema);
