const jwt = require('jsonwebtoken');
const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();
const {
    User,
    validateUser
} = require('../models/user');

//registration
router.post('/register', async (req, res) => {
    const {
        error
    } = validateUser(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    let user = await User.findOne({
        email: req.body.email
    });
    if (user) {
        return res.status(400).send('That user already exisits!');
    } else {
        user = new User({
            email: req.body.email,
            password: req.body.password
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();
        res.send(user);
    }
});

//login
router.post('/login', async (req, res) => {
    let user = await User.findOne({
        email: req.body.email
    });

    if (!user) {
        return res.status(400).send('Incorrect email or password.');
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(400).send('Incorrect email or password.');
    }

    const token = jwt.sign({_id: user._id}, 'PrivateKey');
    res.send(token);
});

module.exports = router;