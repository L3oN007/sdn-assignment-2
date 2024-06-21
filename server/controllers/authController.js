const { Member } = require('../models/model');
const authValidator = require('../validators/auth');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const authController = {
    login: [
        authValidator(),
        async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    message: errors.array().map(err => err.msg).join(', ')
                });
            }

            const { memberName, password } = req.body;
            try {
                const existMember = await Member.findOne({ memberName });
                if (!existMember) {
                    return res.status(400).json({
                        success: false,
                        message: "Could not find the user"
                    });
                }

                const isValid = await bcrypt.compare(password, existMember.password);
                if (!isValid) {
                    return res.status(400).json({
                        success: false,
                        message: "Invalid credentials"
                    });
                }

                // If successful, return a success response here
                const payload = {
                    memberName: existMember.memberName,
                    _id: existMember._id,
                    isAdmin: existMember.isAdmin
                }

                const token = jwt.sign(payload, "super-secret-key", { expiresIn: '1d' });
                return res.status(200).json({
                    success: true,
                    message: "Login successful",
                    token: "Bearer " + token

                });
            } catch (error) {
                return res.status(500).json({
                    success: false,
                    message: "Internal server error"
                });
            }
        }
    ]
}

module.exports = authController