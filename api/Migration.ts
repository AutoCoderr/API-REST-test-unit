import { UserModel } from "./Models/UserModel";
import { TodolistModel } from "./Models/TodolistModel";
import { ItemModel } from "./Models/ItemModel";

export class Migration {
    static tables = [
        UserModel,
        TodolistModel,
        ItemModel
    ];

    static async migrate() {
        for (let table of this.tables) {
            await table.sync();
        }
    }
};