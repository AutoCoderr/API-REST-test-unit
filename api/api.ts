import { Migration } from "./Migration";
import { UserModel, IUser } from "./Models/UserModel";
import { TodolistModel } from "./Models/TodolistModel";
import { ItemModel, IItem } from "./Models/ItemModel";

(async () => {
    await Migration.migrate();

    const user: IUser = {
        email: "toto@toto.com",
        firstname: "John",
        lastname: "Marston",
        password: "Manger des pâtes",
        birthday: "1999-08-10"
    }
    const newUser = await UserModel.create(user);


    const newTodoList: TodolistModel = await TodolistModel.create({UserId: newUser.id});
    const item: IItem = {
        name: "Un item",
        content: "iulhiuflhezfuezifhuifhezuifhoiezhfiuezhfo",
        creationDate: "2020-12-17",
        TodolistId: newTodoList.id
    }
    const newItem: ItemModel = await ItemModel.create(item);
})()