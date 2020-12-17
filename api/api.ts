import { Migration } from "./Migration";
import { User as UserModel } from "./Models/User";
import { User } from "./Entities/User";
import { Todolist as TodolistModel } from "./Models/Todolist";
import { Todolist } from "./Entities/Todolist";
import { Item as ItemModel, IItem } from "./Models/Item";

import { UserController } from "./Controllers/UserController";
import {Item} from "./Entities/Item";

const express = require("express");

const app = express();

(async () => {
    await Migration.migrate();

    console.log("API started")

    app.use('/user', UserController);

    app.listen(80);

    /*const user = new User();

    user.setFirstname("John");
    user.setLastname("Marston");
    user.setEmail("toto@toto.com");
    user.setBirthday("1999-08-10");
    user.setPassword("Manger des pâtes");
    await user.save();


    //const newTodoList: TodolistModel = await TodolistModel.create({UserId: user.id});
    const todoList = new Todolist();
    todoList.setUserId(<number>user.id);
    await todoList.save();

    const item = new Item();
    item.setName("Un item");
    item.setContent("iulhiuflhezfuezifhuifhezuifhoiezhfiuezhfo");
    item.setCreationDate("2020-12-17");
    item.setTodolistId(<number>todoList.id);
    await item.save();

    const foundUser: null|UserModel = await UserModel.findOne({
        where: {id: user.id},
        include: TodolistModel
    });
    console.log("User > Todolists");
    console.log((new User()).hydrate(<UserModel>foundUser).getTodolists());

    const foundTodolist: null|TodolistModel = await TodolistModel.findOne({
       where: {id: todoList.id},
       include: [UserModel,ItemModel]
    });
    console.log("Todolist > User");
    console.log((new Todolist()).hydrate(<TodolistModel>foundTodolist).getUser());
    console.log('Todolist > Items');
    console.log((new Todolist()).hydrate(<TodolistModel>foundTodolist).getItems());

    const foundItem: null|ItemModel = await ItemModel.findOne({
        where: {id: item.id},
        include: TodolistModel
    });

    console.log("Item > Todolist");
    console.log((new Item()).hydrate(<ItemModel>foundItem).getTodolist());*/
})();