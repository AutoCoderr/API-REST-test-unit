import { EntityManager } from "../EntityManager";
import { Todolist as TodolistModel } from "../Models/Todolist";
import { User } from "./User";
import {UserRepository} from "../Repositories/UserRepository";


export class Todolist extends EntityManager {
    modelInstance = TodolistModel;

    User: null|User = null;
    UserId: null|number = null;

    Items: any = null;

    setUserId(UserId: number) {
        this.UserId = UserId;
    }

    getUser() {
        if (!(this.User instanceof User) && this.User != null) {
            this.User = (new User()).hydrate(this.User);
        }
        return this.User;
    }

    async isValid() {
        let errors: Array<string> = [];
        if (this.UserId == null) {
            errors.push("USER_ID_NOT_SPECIFIED");
            return errors;
        }

        if (this.User == null) {
            const user: null|User = await UserRepository.find(this.UserId);
            if (user == null) {
                errors.push("USER_NOT_EXIST");
                return errors;
            }
            this.User = user;
        }

        if (this.User.getTodolist() != null) errors.push("USER_HAS_ALREADY_A_TODOLIST");

        return errors.length > 0 ? errors : true;
    }

    getItems() {
        return this.Items;
    }

}

User.prototype.getTodolist = function() {
    if (!(this.Todolist instanceof Todolist) && this.Todolist != null) {
        this.Todolist = (new Todolist()).hydrate(this.Todolist);
    }
    return this.Todolist;
}