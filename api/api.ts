import { Migration } from "./Migration";
import { User, IUser } from "./Models/User";
import { Todolist } from "./Models/Todolist";
import { Item, IItem } from "./Models/Item";

import { UserController } from "./Controllers/UserController";

const express = require("express");

const app = express();

(async () => {
    await Migration.migrate();

    console.log("API started")

    app.use('/user', UserController);

    app.listen(80);

    /*const user: IUser = {
        email: "toto@toto.com",
        firstname: "John",
        lastname: "Marston",
        password: "Manger des pâtes",
        birthday: "1999-08-10"
    }
    const newUser = await User.create(user);


    const newTodoList: Todolist = await Todolist.create({UserId: newUser.id});
    const item: IItem = {
        name: "Un item",
        content: "iulhiuflhezfuezifhuifhezuifhoiezhfiuezhfo",
        creationDate: "2020-12-17",
        TodolistId: newTodoList.id
    }
    const newItem: Item = await Item.create(item);

    const foundUser: null|User = await User.findOne({
        where: {id: newUser.id},
        include: Todolist
    });
    if (foundUser != null) {// @ts-ignore
        console.log(foundUser.Todolists);
    }

    const foundTotolist: null|Todolist = await Todolist.findOne({
       where: {id: newTodoList.id},
       include: Item
    });

    if (foundTotolist != null) {// @ts-ignore
        console.log(foundTotolist.Items)
    }*/
})();