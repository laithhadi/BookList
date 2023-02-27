// this will be where I store all of my functions for handling todo operations

const createError = require('http-errors')


let todos = []
let idNo = 0

exports.index = function(req, res) {
    res.send(todos)
}

exports.create = function(req, res, next) {
    if (!req.body.name) {
        return (next(createError(400, "Name is required.")))
    }

    todos.push({
        id: idNo,
        name: req.body.name,
    })
    idNo++
    res.send({
        result: true
    })
}

exports.show = function(req, res, next) {
    const todoItem = todos.find(todo => todo.id == req.params.id)
    if (!todoItem) {
        return (next(createError(404, "Todo not found.")))
    }
    res.send(todoItem)
}

exports.delete = function(req, res, next) {
    const todoItem = todos.find(todo => todo.id == req.params.id)
    if (!todoItem) {
        return (next(createError(404, "Todo not found.")))
    }

    todos = todos.filter(todo => todo.id != req.params.id)
    res.send({
        result: true
    })
}

exports.update = function(req, res, next) {
    if (!req.body.name) {
        return (next(createError(400, "Name is required.")))
    }
    const todoItem = todos.find(todo => todo.id == req.params.id)
    if (!todoItem) {
        return (next(createError(404, "Todo not found.")))
    }

    todos = todos.map(todo => {
        if (todo.id == req.params.id) {
            todo.name = req.body.name
        }
        return todo
    })

    res.send({
        result: true
    })

}