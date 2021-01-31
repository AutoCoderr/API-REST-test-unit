import {Helper} from "../Helper";

const express = require('express')
export const UserController = express.Router();

import { User } from "../Entities/User";
import {UserRepository} from "../Repositories/UserRepository";

/* Route => /user */

UserController.get('/create',async (req: any, res: any) => {
    const fields = {
        email: {type: "string"},
        firstname: {type: "string"},
        lastname: {type: "string"},
        birthday: {type: "string"},
        password: {type: "string"},
        password_confirm: {type: "string"}
    }
    const checkedArguments = Helper.checkArgs(req.query, fields);
    if (checkedArguments != true) {
        res.send(JSON.stringify({
            status: "error",
            msg: "Invalid user",
            errors: checkedArguments
        }));
        return;
    }

    let user = new User();

    for (let field in fields) {
        if (field != "password" && field != "password_confirm") {// @ts-ignore
            user["set" + field.ucfirst()](req.query[field])
        } else if (field == "password") {
            if (req.query.password_confirm == undefined || req.query.password_confirm != req.query.password) {
                res.send(JSON.stringify({
                    status: "error",
                    msg: "Invalid user",
                    errors: ["You need to confirm your password"]
                }));
                return;
            }
            user.setPassword(req.query.password);
        }
    }

    let isValidRes = await user.isValid();
    if (isValidRes.type == "success") {
        let userSavec = await user.save()
        if (userSavec) {
            res.send(JSON.stringify({status: "success", msg: "User successfully created", id: userSavec.id}));
            return;
        }
    }
    res.send(JSON.stringify({status: "error", msg: "Invalid user", errors: isValidRes.type == "error" ? isValidRes.errors : ["CAN'T ADD TO DATABASE"]}));
});

UserController.get("/edit", async (req: any, res: any) => {
    const fields = {
        id: {type: "number"},
        email: {type: "string", required: false},
        firstname: {type: "string", required: false},
        lastname: {type: "string", required: false},
        birthday: {type: "string", required: false},
        password: {type: "string", required: false},
        password_confirm: {type: "string", required: false}
    }
    const checkedArguments = Helper.checkArgs(req.query, fields);
    if (checkedArguments != true) {
        res.send(JSON.stringify({
            status: "error",
            msg: "Invalid user edit",
            errors: checkedArguments
        }));
        return;
    }
    let user: null|User = await UserRepository.find(parseInt(req.query.id));
    if (user == null) {
        res.send(JSON.stringify({
            status: "error",
            msg: "Invalid user edit",
            errors: ["This user does not exist"]
        }));
        return;
    }
    for (let field in fields) {
        if (field != "id" && req.query[field]) {
            if (field != "password" && field != "password_confirm") {// @ts-ignore
                user["set" + field.ucfirst()](req.query[field])
            } else if (field == "password") {
                if (req.query.password_confirm == undefined || req.query.password_confirm != req.query.password) {
                    res.send(JSON.stringify({
                        status: "error",
                        msg: "Invalid user edit",
                        errors: ["You need to confirm your password"]
                    }));
                    return;
                }
                user.setPassword(req.query.password);
            }
        }
    }
    let isValidRes: any = await user.isValid();
    if (isValidRes.type == "success") {
        let userSaved = await user.save()
        if (userSaved) {
            res.send(JSON.stringify({status: "success", msg: "User successfully edited", id: userSaved.id}));
            return;
        }
    }
    res.send(JSON.stringify({status: "error", msg: "Invalid user edit", errors: isValidRes.type == "error" ? isValidRes.errors : ["CAN'T ADD TO DATABASE"]}));
});

UserController.get("/delete", async (req: any, res: any) => {
    const checkedArguments = Helper.checkArgs(req.query, {
        id: {type: "number"}
    })
    if (checkedArguments != true) {
        res.send(JSON.stringify({
            status: "error",
            msg: "Invalid user delete",
            errors: checkedArguments
        }));
        return;
    }

    let user: null|User = await UserRepository.find(parseInt(req.query.id));
    if (user == null) {
        res.send(JSON.stringify({
            status: "error",
            msg: "Invalid user delete",
            errors: ["This user does not exist"]
        }));
        return;
    }
    if (user.getTodolist() != null) {
        res.send(JSON.stringify({
            status: "error",
            msg: "Invalid user delete",
            errors: ["This user have a todolist"]
        }));
        return;
    }
    if (!user.delete()) {
        res.send(JSON.stringify({
            status: "error",
            msg: "Invalid user delete",
            errors: ["This user cannot be deleted"]
        }));
        return;
    }
    res.send(JSON.stringify({
        status: "success",
        msg: "User successfully deleted"
    }));
});
