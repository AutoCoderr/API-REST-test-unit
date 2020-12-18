import { User as UserModel } from "../Models/User";
import { RepositoryManager } from "../RepositoryManager";
import { Todolist as TodolistModel } from "../Models/Todolist";
import { User } from "../Entities/User";

export class UserRepository extends RepositoryManager {
    static model = UserModel;
    static entity = User;

    static async find(id): Promise<null|User> {
        return await super.find(id, TodolistModel);
    }
}