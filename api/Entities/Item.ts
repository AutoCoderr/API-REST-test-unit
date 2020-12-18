import { EntityManager } from "../EntityManager";
import { Item as ItemModel } from "../Models/Item";
import {Todolist} from "./Todolist";

export class Item extends EntityManager {
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
}

Todolist.prototype.getItems = function() {
    if (this.Items instanceof Array) {
        for (let i=0;i<this.Items.length;i++) {
            if (!(this.Items[i] instanceof Item)) {
                this.Items[i] = (new Item()).hydrate(this.Items[i]);
            }
        }
    }
    return this.Items
}