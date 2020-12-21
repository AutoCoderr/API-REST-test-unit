const express = require('express')
export const ItemController = express.Router();
import { Item } from "../Entities/Item";

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