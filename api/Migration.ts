import { User } from "./Models/User";
import { Todolist } from "./Models/Todolist";
import { Item } from "./Models/Item";

export class Migration {
    static tables = [
        User,
        Todolist,
        Item
    ];

    static async migrate() {
        for (let table of this.tables) {
            await table.sync();
        }
    }
};