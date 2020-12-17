import { Model, DataTypes } from "sequelize";
import { sequelize } from "../DB";
import { UserModel } from "./UserModel";

export interface ITodolist {
    UserId: number;
}

export class TodolistModel extends Model {
    public id!: number
}

TodolistModel.init(
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

TodolistModel.belongsTo(UserModel);