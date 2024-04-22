const User = require('../models/usermodel')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const mongoose = require('mongoose');

const createUser = async (req, res) => {
    const {email, password} = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required.' });
    }

    if (!password) {
        return res.status(400).json({ error: 'Password is required.' });
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists.' });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = await User.create({email, password: hashedPassword});
        const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET);
        res.status(200).json({ user, token });
    } catch(error) {
        res.status(400).json({error: error.message});
    };
}

const verifyUser = async (req, res) => {
    const {email, password} = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required.' });
    }

    if (!password) {
        return res.status(400).json({ error: 'Password is required.' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password.' });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ error: 'Invalid email or password.' });
        }

        const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET);
        res.status(200).json({ user, token });
    } catch(error) {
        res.status(400).json({error: error.message});
    };
}

module.exports = {
    createUser,
    verifyUser
}