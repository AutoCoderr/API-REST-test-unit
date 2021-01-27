import { Migration } from "./Migration";
import { User as UserModel } from "./Models/User";
import { User } from "./Entities/User";
import { Todolist as TodolistModel } from "./Models/Todolist";
import { Todolist } from "./Entities/Todolist";
import { Item as ItemModel, IItem } from "./Models/Item";

import { UserController } from "./Controllers/UserController";
import { TodolistController } from "./Controllers/TodolistController";
import { ItemController } from "./Controllers/ItemController";
import {Item} from "./Entities/Item";
import {UserRepository} from "./Repositories/UserRepository";
import {TodolistRepository} from "./Repositories/TodolistRepository";
import {ItemRepository} from "./Repositories/ItemRepository";

const express = require("express");

const app = express();

Migration.migrate();

(async () => {

    console.log("API started")

    app.use('/user', UserController);
    app.use('/todolist', TodolistController);
    app.use('/item', ItemController);

    app.listen(80);

    /*const user = new User();

    user.setFirstname("John");
    user.setLastname("Marston");
    user.setEmail("toto@toto.com");
    user.setBirthday("1999-08-10");
    user.setPassword("Manger des pâtes");
    await user.save();

    const todoList = new Todolist();
    todoList.setUserId(<number>user.id);
    await todoList.save();

    const item = new Item();
    item.setName("Un item");
    item.setContent("iulhiuflhezfuezifhuifhezuifhoiezhfiuezhfo");
    item.setCreationDate("2020-12-17");
    item.setTodolistId(<number>todoList.id);
    await item.save();

    const foundUser: null|User = await UserRepository.find(user.id);
    console.log("User");
    console.log(foundUser);
    console.log("User > Todolist");
    console.log((<User>foundUser).getTodolist());

    const foundTodolist: null|Todolist = await TodolistRepository.find(todoList.id);
    console.log("Todolist > User");
    console.log((<Todolist>foundTodolist).getUser());
    console.log('Todolist > Items');
    console.log((<Todolist>foundTodolist).getItems());

    const foundItem: null|Item = await ItemRepository.find(item.id);

    console.log("Item > Todolist");
    console.log((<Item>foundItem).getTodolist());*/
})();

// @ts-ignore
String.prototype.ucfirst = function() {
    let chaine = this.valueOf();
    return chaine[0].toUpperCase()+chaine.substring(1);
}