import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("mysql://root:password@database:3306/api_database");

