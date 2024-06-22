const { Member } = require('../models/model');
const { loginValidator, registerValidator, changePasswordValidator } = require('../validators/auth');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const authController = {
    login: [
        loginValidator(),
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

                // Set cookie with the token
                res.cookie('token', token, {
                    httpOnly: true, // Helps prevent XSS attacks
                    secure: process.env.NODE_ENV === 'production', // Ensures the cookie is sent over HTTPS in production
                    sameSite: 'strict', // Prevents the cookie from being sent with cross-site requests
                    maxAge: 24 * 60 * 60 * 1000 // 1 day
                });

                return res.status(200).json({
                    success: true,
                    message: "Login successful"
                });
            } catch (error) {
                return res.status(500).json({
                    success: false,
                    message: "Internal server error"
                });
            }
        }
    ],
    register: [
        registerValidator(),
        async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    message: errors.array().map(err => err.msg).join(', ')
                });
            }
            const { memberName, password, name, YOB } = req.body;
            try {
                const existMember = await Member.findOne({ memberName });
                if (existMember) {
                    return res.status(400).json({
                        success: false,
                        message: "Username already exists"
                    });
                }

                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);
                const newMember = new Member({
                    memberName,
                    password: hashedPassword,
                    name,
                    YOB
                })

                await newMember.save();
                return res.status(200).json({
                    success: true,
                    message: "Registration successful"
                })
            } catch (error) {
                console.log("Register error: ", error)
                return res.status(500).json({
                    success: false,
                    message: "Internal server error"
                });
            }
        }
    ],
    changePassword: [
        changePasswordValidator(),
        async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    message: errors.array().map(err => err.msg).join(', ')
                });
            }
            const { password, newPassword } = req.body;
            try {
                const existMember = await Member.findOne({ memberName: req.user.memberName });
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

                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(newPassword, salt);

                if (await bcrypt.compareSync(newPassword, existMember.password)) {
                    return res.status(400).json({
                        success: false,
                        message: "New password cannot be the same as old password"
                    });
                }

                existMember.password = hashedPassword;
                await existMember.save();
                return res.status(200).json({
                    success: true,
                    message: "Password changed successfully"
                })
            } catch (error) {
                console.log("Change password error: ", error)
                return res.status(500).json({
                    success: false,
                    message: "Internal server error"
                });

            }
        }
    ]
}

module.exports = authController