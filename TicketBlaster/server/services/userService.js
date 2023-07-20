const User = require("../models/user.model.js");

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ isDeleted: false });
        res.status(200).send(users);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
};

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).send(user);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
};

const updateUser = async (req, res) => {
    try {
        if (req.body.password) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            req.body.password = hashedPassword;
        }
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true },
        );
        res.status(200).send(updatedUser);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
};
async function softDeleteUser(userId) {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }
        user.isDeleted = true;
        await user.save();
        return user;
    } catch (error) {
        throw new Error("Failed to delete user");
    }
}

const changeUserRole = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send("User not found");
        }

        user.isAdmin = req.body.isAdmin;
        await user.save();
        res.status(200).send("User role changed");
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = {
    getAllUsers,
    getUser,
    updateUser,
    softDeleteUser,
    changeUserRole,
};
