import { EntityManager } from "../EntityManager";
import { Todolist as TodolistModel } from "../Models/Todolist";
import { User } from "./User";
import { Item } from "./Item";

export class Todolist extends EntityManager {
    modelInstance = TodolistModel;

    User: null|User = null;
    UserId: null|number = null;

    Items: null|Array<Item> = null;

    setUserId(UserId: number) {
        this.UserId = UserId;
    }

    getUser() {
        if (!(this.User instanceof User) && this.User != null) {
            this.User = (new User()).hydrate(this.User);
        }
        return this.User;
    }

    getItems() {
        if (this.Items instanceof Array) {
            for (let i=0;i<this.Items.length;i++) {
                if (!(this.Items[i] instanceof Item)) {
                    this.Items[i] = (new Item()).hydrate(this.Items[i]);
                }
            }
        }
        return this.Items
    }
}