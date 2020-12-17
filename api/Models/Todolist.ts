import { Model, DataTypes } from "sequelize";
import { sequelize } from "../DB";
import { User } from "./User";

export interface ITodolist {
    UserId: number;
}

export class Todolist extends Model {
    public id!: number
}

Todolist.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        }
    },
    {
        tableName: "todolist",
        sequelize, // passing the `sequelize` instance is required
    }
);

Todolist.belongsTo(User);
User.hasMany(Todolist);