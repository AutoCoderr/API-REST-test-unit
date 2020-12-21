import * as nodemailer from 'nodemailer';

export class Mailer {
    host: string;
    port: number;
    secure: boolean;

    user: string;
    password: string;

    destinations: Array<string>;
    subject: string;
    message: string;
    fromName: string;
    fromEmail: string;

    constructor() {
        this.host = "smtp.gmail.com";
        this.port = 465;
        this.secure = true;

        this.user = "projettestsunitaires@gmail.com";
        this.password = "urTe2P45LvB5";

        this.destinations = [];
        this.subject = "";
        this.message = "";
        this.fromName = "";
        this.fromEmail = "";
    }

    send() {
        let transporter = nodemailer.createTransport({
            host: this.host,
            port: this.port,
            secure: this.secure, // true for 465, false for other ports
            auth: {
                user: this.user, // generated ethereal user
                pass: this.password, // generated ethereal password
            },
        });

        return transporter.sendMail({
            from: '"'+this.fromName+'" <'+this.fromEmail+'>', // sender address
            to: this.destinations.join(", "), // list of receivers
            subject: this.subject, // Subject line
            text: this.message, // plain text body
            html: this.message, // html body
        });
    }


    addDestinations(destination: string) {
        this.destinations.push(destination);
    }

    setSubject(subject: string) {
        this.subject = subject;
    }

    setMessage(message: string) {
        this.message = message;
    }

    setFromName(fromName: string) {
        this.fromName = fromName;
    }

    setFromEmail(fromEmail: string) {
        this.fromEmail = fromEmail;
    }
}