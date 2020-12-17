import { Model, DataTypes } from "sequelize";
import { sequelize } from "../DB";
import { Todolist } from "./Todolist";

export interface IItem {
    name: string;
    content: string;
    creationDate: string;
    TodolistId: number;
}

export class Item extends Model {
    public id!: number; // Note that the `null assertion` `!` is required in strict mode.
    public name!: string;
    public content!: string;
    public creationDate!: string;
}

Item.init(
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

Item.belongsTo(Todolist);
Todolist.hasMany(Item);