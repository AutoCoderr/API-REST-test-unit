import { User } from "./Models/User";
import { Todolist } from "./Models/Todolist";
import { Item } from "./Models/Item";

export class Migration {
    static tables = [
        User,
        Todolist,
        Item
    ];

    static nbRetry = 0;
    static maxRetry = 30;

    static async migrate() {
        this.nbRetry += 1;
        if (this.nbRetry == this.maxRetry) {
            console.log("All database connections retry failed");
            return;
        }
        for (let table of this.tables) {
            try {
                await table.sync();
            } catch(e) {
                console.log("Connection to database failed, retry")
                setTimeout(() => {Migration.migrate()}, 500)
                return;
            }
        }
        console.log("Database synchronized!");
    }
}