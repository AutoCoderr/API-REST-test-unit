import { Item as ItemModel } from "../Models/Item";
import { RepositoryManager } from "../RepositoryManager";
import { Todolist as TodolistModel } from "../Models/Todolist";
import { Item } from "../Entities/Item";

export class ItemRepository extends RepositoryManager {
    static model = ItemModel;
    static entity = Item;

    static async find(id): Promise<null|Item> {
        return await super.find(id, TodolistModel);
    }
}