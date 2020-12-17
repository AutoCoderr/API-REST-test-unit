import { EntityManager } from "../EntityManager";
import { Todolist as TodolistModel } from "../Models/Todolist";
import { User } from "./User";

export class Todolist extends EntityManager {
    modelInstance = TodolistModel;

    User: null|User = null;
    UserId: null|number = null;

    setUserId(UserId: number) {
        this.UserId = UserId;
    }

    getUser() {
        if (!(this.User instanceof User) && this.User != null) {
            this.User = (new User()).hydrate(this.User);
        }
        return this.User;
    }
}