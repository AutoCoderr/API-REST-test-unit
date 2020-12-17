import { UserModel, IUser } from "../Models/UserModel";
import { EntityManager } from "../EntityManager";

export class User extends EntityManager{
    modelInstance = UserModel;

    email: string;
    firstname: string;
    lastname: string;
    birthday: Date;
    password: string

    constructor(firstname: string, lastname: string, email: string, birthday: Date, password: string) {
        super();
        this.email = email;
        this.lastname = lastname;
        this.firstname = firstname;
        this.birthday = birthday;
        this.password = password;
    }

    isValid() {
        let regexEmail = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$");
        if (!regexEmail.test(this.email)) return false;
        if (this.firstname.trim() === "" || this.lastname.trim() === "") return false;
        let currentDate = new Date();
        if (currentDate.getTime() - this.birthday.getTime() < 13 * 365.25 * 24 * 60 * 60 * 1000) return false;
        if (this.password.length < 8 || this.password.length > 40) return false;
        return true;
    }
}

function addMissingZero(number: string|number, n: number = 2) {
    number = number.toString();
    while (number.length < n) {
        number = "0"+number;
    }
    return number
}