import { Schema, model } from 'mongoose';

const messageSchema = new Schema({
  content: { type: String, required: true },
  sender: { type: Schema.Types.ObjectId, ref: 'User' },
  group: { type: Schema.Types.ObjectId, ref: 'Group' },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

export default model('Message', messageSchema);
