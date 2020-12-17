import { Migration } from "./Migration";
import { User as UserModel } from "./Models/User";
import { User } from "./Entities/User";
import { Todolist as TodolistModel } from "./Models/Todolist";
import { Todolist } from "./Entities/Todolist";
import { Item as ItemModel, IItem } from "./Models/Item";

import { UserController } from "./Controllers/UserController";

const express = require("express");

const app = express();

(async () => {
    await Migration.migrate();

    console.log("API started")

    app.use('/user', UserController);

    app.listen(80);

    const user = new User();

    user.setFirstname("John");
    user.setLastname("Marston");
    user.setEmail("toto@toto.com");
    user.setBirthday("1999-08-10");
    user.setPassword("Manger des pâtes");
    await user.save();


    //const newTodoList: TodolistModel = await TodolistModel.create({UserId: user.id});
    let todoList = new Todolist();
    todoList.setUserId(<number>user.id);
    await todoList.save();

    const item: IItem = {
        name: "Un item",
        content: "iulhiuflhezfuezifhuifhezuifhoiezhfiuezhfo",
        creationDate: "2020-12-17",
        TodolistId: <number>todoList.id
    }
    const newItem: ItemModel = await ItemModel.create(item);

    const foundUser: null|UserModel = await UserModel.findOne({
        where: {id: user.id},
        include: TodolistModel
    });
    if (foundUser != null) {// @ts-ignore
        console.log((new User()).hydrate(foundUser).getTodolists());
    }

    const foundTodolist: null|TodolistModel = await TodolistModel.findOne({
       where: {id: todoList.id},
       include: UserModel
    });
    console.log(new Todolist().hydrate(<TodolistModel>foundTodolist).getUser());

    if (foundTodolist != null) {// @ts-ignore
        console.log(foundTodolist.Items)
    }
})();