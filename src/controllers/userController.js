import { verifyToken } from '../utils.js';
import User from '../models/user.js';

export async function createUser(req, res) {
  try {
    const { username, password, isAdmin } = req.body;
    const checkUser = await User.findOne({ username })
    if (checkUser) {
      return res.status(400).json({ error: 'Username exists' });
    }
    const user = new User({ username, password, isAdmin });
    await user.save();
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function editUser(req, res) {
  try {
    const { userId } = req.params;
    console.log('userId', userId)
    const { username, password } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    user.username = username;
    user.password = password;
    await user.save();
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error editing user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function isAdmin(req, res, next) {
  console.log('checking is admin...')
  let isAdminUser = false
  const userLoggedIn = verifyToken(req.rawHeaders[1])
  if (!userLoggedIn) {
    return res.status(500).json({ error: 'Server error' });
  }
  const user = await User.findOne({ _id: userLoggedIn.userId })
  if (user?.isAdmin) {
    isAdminUser = true
  }
  if (!isAdminUser) {
    return res.status(403).json({ error: 'Unauthorized only admins can create or edit' });
  }
  next();
}
