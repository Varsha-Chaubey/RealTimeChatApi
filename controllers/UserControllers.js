const User = require('../model/UserModel')
const bcrypt = require('bcrypt');

module.exports.register = async (req, res, next) => {
    console.log("register controller working")
    try {
        const { userName, userEmail, userPassword } = req.body

        const userNameCheck = await User.findOne({ userName })
        if (userNameCheck)
            return res.json({ msg: 'User name already used', status: false })

        const userEmailCheck = await User.findOne({ userEmail })
        if (userEmailCheck)
            return res.json({ msg: 'User email already used', status: false })
        // console.log(userPassword)
        bcrypt.hash(userPassword, 10, async (err, hash) => {
            // Store hash in your password DB.
            const user = await User.create({
                userEmail,
                userName,
                userPassword: hash,
            });
            delete user.userPassword;
            return res.json({ status: true, user })
        });

    } catch (err) {
        next(err)
    }
}

module.exports.signIn = async (req, res, next) => {
    try {
        const { userName, userPassword } = req.body
        const user = await User.findOne({ userName })
        if (!user)
            return res.json({ msg: 'Incorrect user name', status: false })
        const isPasswordValid = await bcrypt.compare(userPassword, user.userPassword)
        if (!isPasswordValid)
            return res.json({ msg: 'Incorrect password', status: false })
        delete user.userPassword;
        return res.json({ status: true, user })

    } catch (err) {
        next(err)
    }
}

module.exports.allUsers = async (req, res, next) => {
    try {
        const users = await User.findOne({ _id:{$ne:req.parms.id} }).select([
            'userName', 'userEmail', '_id'
        ])
        return res.json(users)

    } catch (err) {
        next(err)
    }
}