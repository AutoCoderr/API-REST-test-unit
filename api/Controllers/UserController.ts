const express = require('express')
export const UserController = express.Router();

import { User } from "../Entities/User";

UserController.get('/create',async (req: any, res: any) => {
    let user = new User();
    user.setFirstname(req.query.firstname ? req.query.firstname : "");
    user.setLastname(req.query.lastname ? req.query.lastname : "");
    user.setEmail(req.query.email ? req.query.email : "");
    user.setBirthday(req.query.birthday ? req.query.birthday : "1900-01-01");
    user.setPassword(req.query.password ? req.query.password : "");

    if (user.isValid()) {
        let userSaved = await user.save()
        if (userSaved) {
            res.send(JSON.stringify({status: "success", msg: "User successfully created", id: userSaved.dataValues.id}));
            return;
        }
    }
    res.send(JSON.stringify({status: "error", msg: "Invalid user"}));
});