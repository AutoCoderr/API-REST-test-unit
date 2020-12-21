const express = require('express')
export const TodolistController = express.Router();
import { Todolist } from "../Entities/Todolist";

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