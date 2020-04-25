const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = require('../libs/env').secret;

const userSchema = new mongoose.Schema({
    email: String,
    hashedPassword: {
        type: String
    },
    token: String,
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
});

userSchema.virtual('password');

userSchema.pre('validate', async function () {
    if (this.password === undefined) return;
    try {
        const hash = await bcrypt.hash(this.password, 10);
        this.hashedPassword = hash;
    } catch (error) {
        throw error;
    }
});

userSchema.statics.authenticate = async function ({ email, password }) {
    const user = await this.findOne({ email });
    if (!user) throw new Error(' Email o password incorrecto. ');

    const result = await bcrypt.compare(password, user.hashedPassword);
    if (!result) throw new Error(' Email o password incorrecto. ');

    user.token = jwt.sign({ id: user.id }, secret);
    await user.save();

    return user;
};

module.exports = mongoose.model('User', userSchema);