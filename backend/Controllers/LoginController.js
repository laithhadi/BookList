const createError = require('http-errors')
const UserModel = require('../models/UsersModel');

exports.index = async function (req, res, next) {
    const user = await UserModel.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if (!user) return res.status(401).send({
        message: "User not found. Check username and password."
    })

    return res.send(user);
}