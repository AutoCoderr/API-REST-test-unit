import { Todolist as TodolistModel } from "../Models/Todolist";
import { RepositoryManager } from "../RepositoryManager";
import { User as UserModel } from "../Models/User";
import { Item as ItemModel } from "../Models/Item";
import { Todolist } from "../Entities/Todolist";

export class TodolistRepository extends RepositoryManager {
    static model = TodolistModel;
    static entity = Todolist;

    static async find(id): Promise<null|Todolist> {
        return await super.find(id, [UserModel,ItemModel]);
    }
}