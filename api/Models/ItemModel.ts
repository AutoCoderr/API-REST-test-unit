import { Model, DataTypes } from "sequelize";
import { sequelize } from "../DB";
import { TodolistModel } from "./TodolistModel";

export interface IItem {
    name: string;
    content: string;
    creationDate: string;
    TodolistId: number;
}

export class ItemModel extends Model {
    public id!: number; // Note that the `null assertion` `!` is required in strict mode.
    public name!: string;
    public content!: string;
    public creationDate!: string;
}

ItemModel.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: new DataTypes.STRING(20),
            allowNull: false
        },
        content: {
            type: new DataTypes.STRING(1000),
            allowNull: false
        },
        creationDate: {
            type: new DataTypes.STRING(15),
            allowNull: false
        }
    },
    {
        tableName: "item",
        sequelize, // passing the `sequelize` instance is required
    }
);

ItemModel.belongsTo(TodolistModel);