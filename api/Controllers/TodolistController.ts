import {Helper} from "../Helper";

const express = require('express')
export const TodolistController = express.Router();
import { Todolist } from "../Entities/Todolist";
import {TodolistRepository} from "../Repositories/TodolistRepository";


/* Route => /todolist */

TodolistController.get("/create", async (req: any, res: any) => {
    const todolist = new Todolist();
    if (req.query.UserId) {
        todolist.setUserId(req.query.UserId);
    }
    let isValidRes = await todolist.isValid();
    if (isValidRes == true) {
        let todolistSaved = await todolist.save()
        if (todolistSaved) {
            res.send(JSON.stringify({status: "success", msg: "Todolist successfully created", id: todolistSaved.id}));
            return;
        }
    }
    res.send(JSON.stringify({status: "error", msg: "Invalid todolist", errors: isValidRes instanceof Array ? isValidRes : ["CAN'T ADD TO DATABASE"]}));
});

TodolistController.get("/delete", async (req: any, res: any) => {
    const checkedArguments = Helper.checkArgs(req.query, {
        id: {type: "number"}
    })
    if (checkedArguments != true) {
        res.send(JSON.stringify({
            status: "error",
            msg: "Invalid todolist delete",
            errors: checkedArguments
        }));
        return;
    }

    let todolist: null|Todolist = await TodolistRepository.find(parseInt(req.query.id));
    if (todolist == null) {
        res.send(JSON.stringify({
            status: "error",
            msg: "Invalid todolist delete",
            errors: ["This todolist does not exist"]
        }));
        return;
    }
    if (todolist.getItems().length > 0) {
        res.send(JSON.stringify({
            status: "error",
            msg: "Invalid todolist delete",
            errors: ["This todolist have one or some items"]
        }));
        return;
    }
    if (!todolist.delete()) {
        res.send(JSON.stringify({
            status: "error",
            msg: "Invalid todolist delete",
            errors: ["This todolist cannot be deleted"]
        }));
        return;
    }
    res.send(JSON.stringify({
        status: "success",
        msg: "Item todolist deleted"
    }));
});