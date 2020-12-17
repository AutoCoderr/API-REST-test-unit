export class User {
    email: string;
    nom: string;
    prenom: string;
    birdday: Date;
    password: string

    constructor(prenom, nom, email, birdday, password) {
        this.email = email;
        this.nom = nom;
        this.prenom = prenom;
        this.birdday = birdday;
        this.password = password;
    }

    isValid() {
        let regexEmail = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$");
        if (!regexEmail.test(this.email)) return false;
        if (this.prenom.trim() === "" || this.nom.trim() === "") return false;
        let currentDate = new Date();
        if (currentDate.getTime() - this.birdday.getTime() < 13 * 365.25 * 24 * 60 * 60 * 1000) return false;
        if (this.password.length < 8 || this.password.length > 40) return false;
        return true;
    }

}