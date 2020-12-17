const express = require('express')
export const UserController = express.Router();

import { User } from "../Entities/User";

UserController.get('/create',async (req: any, res: any) => {
    let user = new User(
        req.query.firstname ? req.query.firstname : "",
        req.query.lastname ? req.query.lastname : "",
        req.query.email ? req.query.email : "",
        req.query.birthday ? new Date(req.query.birthday) : new Date("1900-01-01"),
        req.query.password ? req.query.password : "",
    )
    if (user.isValid() && await user.save()) {
        res.send(JSON.stringify({status: "success", msg: "User successfully created"}));
    } else {
        res.send(JSON.stringify({status: "error", msg: "Invalid user"}));
    }
});