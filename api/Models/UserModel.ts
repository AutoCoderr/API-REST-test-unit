import { Model, DataTypes } from "sequelize";
import { sequelize } from "../DB";

export interface IUser {
    email: string;
    firstname: string;
    lastname: string;
    password: string;
    birthday: string;
}

export class UserModel extends Model {
    public id!: number;
    public email!: string;
    public firstname!: string;
    public lastname!: string;
    public password!: string;
    public birthday!: string;
}

UserModel.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        firstname: {
            type: new DataTypes.STRING(50),
            allowNull: false,
        },
        lastname: {
            type: new DataTypes.STRING(50),
            allowNull: false,
        },
        password: {
            type: new DataTypes.STRING(40),
            allowNull: false
        },
        birthday: {
            type: new DataTypes.STRING(15),
            allowNull: false
        }
    },
    {
        tableName: "user",
        sequelize, // passing the `sequelize` instance is required
    }
);