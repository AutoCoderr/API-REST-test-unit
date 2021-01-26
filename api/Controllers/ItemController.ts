const express = require('express')
export const ItemController = express.Router();
import { Item } from "../Entities/Item";
import { Helper } from "../Helper";
import { ItemRepository } from "../Repositories/ItemRepository";

/* Route => /item */

ItemController.get("/create", async (req: any, res: any) => {
    const item = new Item();
    if (req.query.TodolistId) {
        item.setTodolistId(req.query.TodolistId);
    }
    item.setName(req.query.name ? req.query.name : "");
    item.setContent(req.query.content ? req.query.content : "");

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