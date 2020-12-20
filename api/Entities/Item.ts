import { EntityManager } from "../EntityManager";
import { Item as ItemModel } from "../Models/Item";
import {Todolist} from "./Todolist";
import {TodolistRepository} from "../Repositories/TodolistRepository";
import {Mailer} from "../Mailer";
import {UserRepository} from "../Repositories/UserRepository";
import {User} from "./User";

export class Item extends EntityManager {

    constructor() {
        super();
    }

    modelInstance = ItemModel;

    name: null|string = null;
    content: null|string = null;
    creationDate: null|Date = null;
    TodolistId: null|number = null;

    createdAt: null|Date = null;
    Todolist: null|Todolist = null

    setName(name: string) {
        this.name = name.trim();
    }
    setContent(content: string) {
        this.content = content.trim();
    }
    setCreationDate(creationDate: string){
        this.creationDate = new Date(creationDate);
    }
    setTodolistId(TodolistId: number) {
        this.TodolistId = TodolistId;
    }
    setCreatedAt(createdAt: number|Date|string) {
        this.createdAt = (typeof(createdAt) == "number" || typeof(createdAt) == "string") ? new Date(createdAt) : createdAt;
    }

    getTodolist() {
        if (!(this.Todolist instanceof Todolist) && this.Todolist != null) {
            this.Todolist = (new Todolist()).hydrate(this.Todolist);
        }
        return this.Todolist;
    }

    async isValid(returnInfoMailer = false) {
        let errors: Array<string> = [];

        if (this.TodolistId == null) {
            errors.push("TODOLIST_NOT_SPECIFIED");
            return {type: "error", errors};
        }

        let todoList = await TodolistRepository.find(this.TodolistId);

        if (todoList == null) {
            errors.push("TODOLIST_NOT_EXIST");
            return {type: "error", errors};
        }

        const items = todoList.getItems();

        if (items.length >= 10) {
            errors.push("TODOLIST_HAS_ALREADY_10_ITEMS");
        }

        if (this.name?.length == 0) {
            errors.push("NAME_NOT_SPECIFIED");
        } else {
            for (let item of items) {
                if (item.name == this.name) {
                    errors.push("NAME_ALREADY_USED");
                    break;
                }
            }
        }

        if (this.content?.length == 0) {
            errors.push("CONTENT_NOT_SPECIFIED")
        } else if (<number>this.content?.length > 1000) {
            errors.push("CONTENT_TOO_LONG");
        }

        if (items.length > 0) {
            let lastItem = items[items.length - 1];
            let currentTime = new Date();

            if (currentTime.getTime() - lastItem.createdAt.getTime() < 30 * 60 * 1000) {
                errors.push("LAST_ITEM_CREATED_LESS_THAN_30_MINUTES");
            }
        }
        let infoMailer;
        if (errors.length == 0 && items.length == 7) {
            let user: User = <User> await UserRepository.find(todoList.UserId);
            let mailer = new Mailer();
            mailer.addDestinations(user.email);
            mailer.setMessage("Attention! Vous avez ajouté 8 items sur votre todolist, il ne vous en reste plus que 2!");
            mailer.setSubject("Plus que 2 items restant!");
            mailer.setFromName("Projet test unitaire");
            mailer.setFromEmail(mailer.user);
            if (returnInfoMailer) {
                infoMailer = await mailer.send();
            } else {
                mailer.send();
            }
        }

        return errors.length > 0 ?  {type: "error", errors} : {type: "success", ...(returnInfoMailer ? { infoMailer } : {})};
    }
}

Todolist.prototype.getItems = function(): Array<Item> {
    if (this.Items instanceof Array) {
        for (let i=0;i<this.Items.length;i++) {
            if (!(this.Items[i] instanceof Item)) {
                this.Items[i] = (new Item()).hydrate(this.Items[i]);
            }
        }
    }
    return this.Items
}