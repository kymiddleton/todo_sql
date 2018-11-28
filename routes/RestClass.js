const db = require("../models");

class RestfulAPI {
    constructor(resource, app, model) {
        this.resource = resource;
        this.app = app;
        this.model = model;
    }

    find() {
        console.log("in find top");
        this.app.get(`/api/${this.resource}`, (req, res) => {
            console.log("in find ", req.body);
            this.model.findAll({})
                .then(function (data) {
                    res.json(data);
                })
                .catch(function (err) {
                    res.json(err);
                })
        })
    }

    create() {
        this.app.post(`/api/${this.resource}`, (req, res) => {
            this.model.create({
                todoItem: req.body.todoItem,
                todoStatus: req.body.todoStatus
            })
                .then(function (data) {
                    res.json(data);
                })
                .catch(function (err) {
                    res.json(err);
                })
        })
    }

    delete(identifier) {
        this.app.delete(`/api/${this.resource}/:${identifier}`, (req, res) => {
            this.model.destroy({
                where: {
                    id: req.params[identifier]
                }
            })
                .then(data => res.json({ success: true }))
                .catch(err => res.json(err))
        });
    }

    update(identifier) {
        this.app.post(`/api/${this.resource}/:${identifier}`, (req, res) => {
            this.model.update({
                todoStatus: req.body.todoStatus
            }, {
                    where: {
                        id: req.params[identifier]
                    }
                })
                .then(function (dbTodo) {
                    console.log('---------In Rest Update-------');
                    res.json(dbTodo);
                })
                .catch(function (err) {
                    console.log(err);
                    res.json(err);
                });
        });
    }
}

module.exports = RestfulAPI;