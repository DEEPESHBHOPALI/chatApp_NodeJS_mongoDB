import jwt from 'jsonwebtoken'

export const generateToken = (user) => {
    return jwt.sign(
        { userId: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
}

export const validatePassword = async (password, hashedPassword) => {
    try {
        // return await bcrypt.compare(password, hashedPassword);
        return password === hashedPassword
    } catch (error) {
        console.error('Error validating password:', error);
        return false;
    }
};

export const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { userId, username } = decoded;
        return { userId, username };
    } catch (error) {
        console.error('Error verifying token:', error);
        return null;
    }
};