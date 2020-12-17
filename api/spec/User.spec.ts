import { User } from "../Entities/User";
import {Model} from "sequelize";

const users = [
    {
        firstname: "toto",
        lastname: "du 78",
        email: "totodu78@hotmail.com",
        birthday: "2005-08-10",
        password: "12345678",
        exceptValid: true,
        exceptSave: Model
    },
    {
        firstname: " ",
        lastname: "du 78",
        email: "totodu78@hotmail.com",
        birthday: "2005-08-10",
        password: "12345678",
        exceptValid: false,
        exceptSave: Model
    },
    {
        firstname: "toto",
        lastname: "",
        email: "totodu78@hotmail.com",
        birthday: "2005-08-10",
        password: "12345678",
        exceptValid: false,
        exceptSave: Model
    },
    {
        firstname: "toto",
        lastname: "du 78",
        email: "zefuizeufhi",
        birthday: "2005-08-10",
        password: "12345678",
        exceptValid: false,
        exceptSave: Model
    },
    {
        firstname: "toto",
        lastname: "du 78",
        email: "totodu78@hotmail.com",
        birthday: "2010-08-10",
        password: "12345678",
        exceptValid: false,
        exceptSave: Model
    },
    {
        firstname: "toto",
        lastname: "du 78",
        email: "totodu78@hotmail.com",
        birthday: "2010-08-10",
        password: "1234345678910111213141516171819202122232425",
        exceptValid: false,
        exceptSave: false
    }
];

for (let i=0;i<users.length;i++) {
    const user = users[i]; // @ts-ignore
    describe("Checking of user N°"+(i+1),function(){
        let userObject = new User();
        userObject.setFirstname(user.firstname);
        userObject.setLastname(user.lastname);
        userObject.setEmail(user.email);
        userObject.setBirthday(user.birthday);
        userObject.setPassword(user.password);
        // @ts-ignore
        it("The excepted value of isValid() is : "+user.exceptValid.toString(),function() {
            var value=userObject.isValid();
            // @ts-ignore
            expect(value).toBe(user.exceptValid);
        });
        // @ts-ignore
        it("The excepted value of save() is : "+user.exceptSave.toString(),async () => {
            const entry=await userObject.save();

            if (typeof(user.exceptSave) == "boolean") {// @ts-ignore
                expect(entry).toBe(user.exceptSave);
            } else {// @ts-ignore
                expect(entry).toBeInstanceOf(user.exceptSave);
                // @ts-ignore
                const deleted = await(new User()).hydrate(<Object>entry).delete();// @ts-ignore
                expect(deleted).toBe(true);
            }
        });
    });
}