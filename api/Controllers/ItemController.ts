import {TodolistRepository} from "../Repositories/TodolistRepository";

const express = require('express')
export const ItemController = express.Router();
import { Item } from "../Entities/Item";
import { Helper } from "../Helper";
import { ItemRepository } from "../Repositories/ItemRepository";

/* Route => /item */

ItemController.get("/create", async (req: any, res: any) => {
    const checkedArguments = Helper.checkArgs(req.query, {
        TodolistId: {type: "number"},
        name: {type: "string"},
        content: {type: "string"}
    })
    if (checkedArguments != true) {
        res.send(JSON.stringify({
            status: "error",
            msg: "Invalid item",
            errors: checkedArguments
        }));
        return;
    }

    const todolist = await TodolistRepository.find(parseInt(req.query.TodolistId))
    if(todolist === null) {
        res.send(JSON.stringify({
            status: "error",
            msg: "Invalid item",
            errors: ["This todolist does not exist"]
        }));
        return;
    }

    const item = new Item();
    item.setTodolistId(req.query.TodolistId);
    item.setName(req.query.name);
    item.setContent(req.query.content);

    let isValidRes: any = await item.isValid();
    if (isValidRes.type == "success") {
        let itemSaved = await item.save()
        if (itemSaved) {
            res.send(JSON.stringify({status: "success", msg: "Item successfully created", id: itemSaved.id}));
            return;
        }
    }
    res.send(JSON.stringify({status: "error", msg: "Invalid item", errors: isValidRes.type == "error" ? isValidRes.errors : ["CAN'T ADD TO DATABASE"]}));
});

ItemController.get("/edit", async (req: any, res: any) => {
    const checkedArguments = Helper.checkArgs(req.query, {
        id: {type: "number"},
        name: {type: "string", required: false},
        content: {type: "string", required: false}
    })
    if (checkedArguments != true) {
        res.send(JSON.stringify({
            status: "error",
            msg: "Invalid item edit",
            errors: checkedArguments
        }));
        return;
    }
    let item: null|Item = await ItemRepository.find(parseInt(req.query.id));
    if (item == null) {
        res.send(JSON.stringify({
            status: "error",
            msg: "Invalid item edit",
            errors: ["This item does not exist"]
        }));
        return;
    }
    if (req.query.name) {
        item.setName(req.query.name);
    }
    if (req.query.content) {
        item.setContent(req.query.content);
    }
    let isValidRes: any = await item.isValid();
    if (isValidRes.type == "success") {
        let itemSaved = await item.save()
        if (itemSaved) {
            res.send(JSON.stringify({status: "success", msg: "Item successfully edited", id: itemSaved.id}));
            return;
        }
    }
    res.send(JSON.stringify({status: "error", msg: "Invalid item", errors: isValidRes.type == "error" ? isValidRes.errors : ["CAN'T ADD TO DATABASE"]}));
});

ItemController.get("/delete", async (req: any, res: any) => {
    const checkedArguments = Helper.checkArgs(req.query, {
        id: {type: "number"}
    })
    if (checkedArguments != true) {
        res.send(JSON.stringify({
            status: "error",
            msg: "Invalid item delete",
            errors: checkedArguments
        }));
        return;
    }

    let item: null|Item = await ItemRepository.find(parseInt(req.query.id));
    if (item == null) {
        res.send(JSON.stringify({
            status: "error",
            msg: "Invalid item delete",
            errors: ["This item does not exist"]
        }));
        return;
    }
    if (!(await item.delete())) {
        res.send(JSON.stringify({
            status: "error",
            msg: "Invalid item delete",
            errors: ["This item cannot be deleted"]
        }));
        return;
    }
    res.send(JSON.stringify({
        status: "success",
        msg: "Item successfully deleted"
    }));
});