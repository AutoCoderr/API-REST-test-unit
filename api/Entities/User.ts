import { User as Usermodel } from "../Models/User";
import { EntityManager } from "../EntityManager";

export class User extends EntityManager {
    modelInstance = Usermodel;

    email: string;
    firstname: string;
    lastname: string;
    birthday: Date;
    password: string

    Todolist: any = null;

    constructor() {
        super();
        this.email = "";
        this.firstname = "";
        this.lastname = "";
        this.birthday = new Date("1900-01-01");
        this.password = "";
    }

    setEmail(email: string) {
        this.email = email;
    }
    setFirstname(firstname: string) {
        this.firstname = firstname.trim();
    }
    setLastname(lastname: string) {
        this.lastname = lastname.trim();
    }
    setBirthday(birthday: string) {
        this.birthday = new Date(birthday);
    }
    setPassword(password: string) {
        this.password = password;
    }

    isValid() {
        let errors: Array<string> = []
        let regexEmail = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$");
        if (!regexEmail.test(this.email)) errors.push("INVALID_MAIL");
        if (this.firstname === "" || this.lastname === "") errors.push("FIRSTNAME_LASTNAME_INVALID");
        let currentDate = new Date();
        if (currentDate.getTime() - this.birthday.getTime() < 13 * 365.25 * 24 * 60 * 60 * 1000) errors.push("TOO_YOUNG");
        if (this.password.length < 8)
            errors.push("TOO_SHORT_PASSWORD");
        else if (this.password.length > 40)
            errors.push("TOO_LONG_PASSWORD");

        return errors.length > 0 ? {type: "error", errors} : {type: "success"};
    }

    getTodolist() {
        return this.Todolist;
    }
}

function addMissingZero(number: string|number, n: number = 2) {
    number = number.toString();
    while (number.length < n) {
        number = "0"+number;
    }
    return number
}