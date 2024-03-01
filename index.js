import express from 'express';
import { config } from 'dotenv';

import authRoutes from './src/routes/authRoutes.js'
import userRoutes from './src/routes/userRoutes.js';
import groupRoutes from './src/routes/groupRoutes.js';
import messageRoutes from './src/routes/messageRoutes.js';
import { mongoConnect } from './src/mongo.js';

const app = express();
app.use(express.json());
config();

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/groups', groupRoutes);
app.use('/messages', messageRoutes);

// MongoDB connection
mongoConnect()

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
