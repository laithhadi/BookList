const createError = require('http-errors')
const UserModel = require('../Models/UsersModel')

exports.index = async function (req, res) {
    try {
        const users = await UserModel.find({})
        res.send(users)
    } catch (error) {
        res.status(500).send({ error: 'Something went wrong' })
    }
}

exports.show = async function (req, res, next) {
    const userId = req.params.id

    try {
        const user = await UserModel.findById(userId, req.body, { new: true })
        return res.send(user)
    } catch (error) {
        return next(createError(500, 'Error finding user.'))
    }
}

exports.create = async function (req, res, next) {
    const request = req.body

    if (!request.username) {
        return next(createError(400, 'Username is required.'))
    }
    if (!request.password) {
        return next(createError(400, 'Password is required.'))
    }

    const userInstance = new UserModel({
        username: request.username,
        password: request.password,
    })

    try {
        await userInstance.save()
    } catch (error) {
        console.log(error)
    }

    res.send(userInstance)
}

exports.update = async function (req, res, next) {
    try {
        const userId = req.params.id
        const user = await UserModel.findByIdAndUpdate(userId, req.body, {
            new: true,
        })
        if (!user) {
            return next(createError(404, 'User not found'))
        }
        res.send(user)
    } catch (error) {
        res.status(500).send({ error: 'Something went wrong' })
    }
}

exports.delete = async function (req, res, next) {
    const userId = req.params.id

    try {
        const user = await UserModel.findByIdAndDelete(userId, req.body, {
            new: true,
        })
        return res.send(user)
    } catch (error) {
        return next(createError(500, 'Error deleting user'))
    }
}