const { Member } = require('../models/model');

const memberController = {
    getAllMembers: async (req, res) => {
        try {
            const members = await Member.find();
            return res.status(200).json({
                message: "Success",
                response: members
            })
        } catch (error) {
            console.log("Get all members error: ", error)
            res.status(400).json({
                message: "Bad request"
            })
        }
    },
    getMemberById: async (req, res) => {
        try {
            const member = await Member.findById(req.user._id);
            const { memberName, name, YOB } = member;
            return res.status(200).json({
                message: "Success",
                response: { memberName, name, YOB }
            })
        } catch (error) {
            console.log("Get member by id error: ", error)
            res.status(400).json({
                message: "Bad request"
            })
        }
    }
}

module.exports = memberController