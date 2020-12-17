import { EntityManager } from "../EntityManager";
import { Todolist as TodolistModel } from "../Models/Todolist";
import { User as UserModel } from "../Models/User"
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

    async isValid() {
        let errors: Array<string> = [];
        if (this.UserId == null) {
            errors.push("USER_ID_NOT_SPECIFIED");
            return errors;
        }

        if (this.User == null) {
            const user: null|UserModel = await UserModel.findOne({
                where: {id: this.UserId}
            });
            if (user == null) {
                errors.push("USER_NOT_EXIST");
                return errors;
            }
            this.User = new User().hydrate(<UserModel>user);
        }

        const userTodolists = await TodolistModel.findAll({
            where: {UserId: this.UserId}
        });

        if (userTodolists.length > 0) errors.push("USER_HAS_ALREADY_A_TODOLIST");

        return errors.length > 0 ? errors : true;
    }

}