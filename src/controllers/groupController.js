// groupController.js

import Group from '../models/group.js';
import User from '../models/user.js';

// Create a new group
export async function createGroup(req, res) {
  try {
    const { name, members } = req.body;
    const group = new Group({ name, members });
    await group.save();
    res.status(201).json({ message: 'Group created successfully', group });
  } catch (error) {
    console.error('Error creating group:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Delete a group
export async function deleteGroup(req, res) {
  try {
    const { groupId } = req.params;
    await Group.findByIdAndDelete(groupId);
    res.status(200).json({ message: 'Group deleted successfully' });
  } catch (error) {
    console.error('Error deleting group:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Search groups
export async function searchGroups(req, res) {
  try {
    const { name } = req.query;
    const groups = await Group.find({ name: { $regex: name, $options: 'i' } });
    res.status(200).json(groups);
  } catch (error) {
    console.error('Error searching groups:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Add member to group
export async function addMember(req, res) {
  try {
    const { groupId } = req.params;
    const { memberId } = req.body;
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }
    const user = await User.findById(memberId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    group.members.push(memberId);
    await group.save();
    res.status(200).json({ message: 'Member added to group successfully', group });
  } catch (error) {
    console.error('Error adding member to group:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
