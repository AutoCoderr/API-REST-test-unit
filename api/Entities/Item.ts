import { EntityManager } from "../EntityManager";
import { Item as ItemModel } from "../Models/Item";
import {Todolist} from "./Todolist";
import {TodolistRepository} from "../Repositories/TodolistRepository";

export class Item extends EntityManager {

    constructor() {
        super();
        this.creationDate = new Date();
    }

    modelInstance = ItemModel;

    name: null|string = null;
    content: null|string = null;
    creationDate: null|Date = null;
    TodolistId: null|number = null;

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

    getTodolist() {
        if (!(this.Todolist instanceof Todolist) && this.Todolist != null) {
            this.Todolist = (new Todolist()).hydrate(this.Todolist);
        }
        return this.Todolist;
    }

    async isValid() {
        let errors: Array<string> = [];

        if (this.TodolistId == null) {
            errors.push("TODOLIST_NOT_SPECIFIED");
            return errors;
        }

        let todoList = await TodolistRepository.find(this.TodolistId);

        if (todoList == null) {
            errors.push("TODOLIST_NOT_EXIST");
            return errors;
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

        let lastItem = items[items.length-1];

        if ((<Date>this.creationDate).getTime() - lastItem.creationDate.getTime() < 30*60*1000) {
            errors.push("LAST_ITEM_CREATED_AT_LESS_THE_30_MINUTES");
        }

        return errors.length > 0 ? errors : true;
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