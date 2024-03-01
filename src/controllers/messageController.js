import Message from '../models/message.js';
import Group from '../models/group.js';
import User from '../models/user.js';

export async function sendMessage(req, res) {
  try {
    const { groupId } = req.params;
    const { content, userId } = req.body;
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }
    const sender = await User.findById(userId);
    if (!sender) {
      return res.status(404).json({ error: 'Sender not found' });
    }
    const message = new Message({ content, sender: userId, group: groupId });
    await message.save();
    res.status(201).json({ message: 'Message sent successfully', message });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function likeMessage(req, res) {
  try {
    const { messageId } = req.params;
    const { userId } = req.body;
    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    if (message.likes.includes(userId)) {
      return res.status(400).json({ error: 'User already liked this message' });
    }
    message.likes.push(userId);
    await message.save();
    res.status(200).json({ message: 'Message liked successfully', message });
  } catch (error) {
    console.error('Error liking message:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
