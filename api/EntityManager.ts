import {Model, where} from "sequelize";
import {IUser, UserModel} from "./Models/UserModel";

export class EntityManager {
    modelInstance: null|typeof Model = null;
    id: null|number = null;

    constructor() {
    }


    async save() {
        let entryObject: Object = {};
        for (let attr in this) {
            if (attr != "modelInstance" && attr != "id") {
                if (this[attr] instanceof Date) {
                    // @ts-ignore
                    entryObject[attr] = addMissingZero(this[attr].getFullYear(),4)+"-"+addMissingZero(this[attr].getMonth()+1)+"-"+addMissingZero(this[attr].getDate());
                } else {
                    // @ts-ignore
                    entryObject[attr] = this[attr];
                }
            }
        }
        if (this.id == null) {
            try {// @ts-ignore
                await this.modelInstance.create(entryObject);
            } catch(e) {
                return false;
            }
            return true;
        }
        /*const user: IUser = {
            email: this.email,
            firstname: this.firstname,
            lastname: this.lastname,
            birthday: addMissingZero(this.birthday.getFullYear(),4)+"-"+addMissingZero(this.birthday.getMonth()+1)+"-"+addMissingZero(this.birthday.getDate()),
            password: this.password
        }
        const createdUser: UserModel = await UserModel.create(user);*/
    }
}

function addMissingZero(number: string|number, n: number = 2) {
    number = number.toString();
    while (number.length < n) {
        number = "0"+number;
    }
    return number
}