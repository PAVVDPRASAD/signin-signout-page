const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => { 
    try {
        const {name,email,password} = req.body;
        const userExits = await User.findOne({email})
        if (userExits) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const isEmail = await User.findOne({email})
        if (!isEmail) {
            return res.status(400).json({ message: 'Invalid Email' });
        }

        const isPasswordMatch = await bcrypt.compare(password, isEmail.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: 'Invalid Password' });
        }
        const token = jwt.sign({ id: isEmail._id }, 'your_jwt_secret', { expiresIn: '7d' });
        res.status(200).json({ message: 'Login successful', token });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}