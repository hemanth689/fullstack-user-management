const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticateToken = require('../middleware/authenticateToken');
const User = require('../models/user');
const upload = require('../middleware/upload');

router.post('/register', async (req, res) => {
    const { username, email, phoneNo, password } = req.body;
    try {
        const hash = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, phoneNo, password: hash });
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(400).json({ error: 'User already exists or invalid data' });
    }
});

router.get('/users', async (req, res) => {
    try {
        const users = await User.findAll(); // fetch all users from DB
        res.json(users); // send as JSON
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// GET /api/user/me - Get current user details
router.get('/user/me', authenticateToken, async (req, res) => {
    try {
        console.log("Decoded JWT payload:", req.user);
        const user = await User.findOne({ where: { id: req.user.id } });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(401).json({ error: 'Invalid credentials' });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user: {
            id: user.id,
            username: user.username,
            email: user.email,
            profilePic: user.profilePic }
        });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.patch('/users/:email', async (req, res) => {
    const { email } = req.params;
    const { username, phoneNo } = req.body;
    try {
        const [updated] = await User.update(
            { username, phoneNo },
            { where: { email } }
        );
        if (updated === 0) return res.status(404).json({ message: "User not found" });
        res.json({ message: "User updated successfully" });
    } catch (error) {
        console.error("Update error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.delete('/users/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const deletedRows = await User.destroy({ where: { email } });
        if (deletedRows === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Delete error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

/*
router.put('/users/:id/profile-pic', upload.single('profilePic'), async (req, res) => {
    try {
        const user = await User.findOne({ where: { id: req.params.id } });
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.profilePic = req.file.path;
        await User.update(
            { profilePic: imagePath },
            { where: { id: userId } }
        );

        res.json({
            message: 'Profile picture uploaded successfully',
            profilePic: user.profilePic
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
*/


router.put('/users/:id/profile-pic', upload.single('profilePic'), async (req, res) => {
    const userId = req.params.id;

    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const imagePath = req.file.path; 

    try {
        const [updated] = await User.update(
            { profilePic: imagePath },
            { where: { id: userId } }
        );

        if (updated === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        console.log(userId);

        return res.status(200).json({ message: 'Profile picture uploaded', profilePic: imagePath });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to update profile picture in DB' });
    }
});


module.exports = router;