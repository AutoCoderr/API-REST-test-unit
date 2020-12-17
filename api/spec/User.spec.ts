import { User } from "../Entities/User";

const users = [
    {classe: new User("toto", "du 78", "totodu78@hotmail.com", new Date("2005-08-10"), "12345678"), exceptValid: true},
    {classe: new User(" ", "du 78", "totodu78@hotmail.com", new Date("2005-08-10"), "12345678"), exceptValid: false},
    {classe: new User("toto", "", "totodu78@hotmail.com", new Date("2005-08-10"), "12345678"), exceptValid: false},
    {classe: new User("toto", "du 78", "zefzefezfezfez", new Date("2005-08-10"), "12345678"), exceptValid: false},
    {classe: new User("toto", "du 78", "totodu78@hotmail.com", new Date("2010-08-10"), "12345678"), exceptValid: false},
    {classe: new User("toto", "du 78", "totodu78@hotmail.com", new Date("2005-08-10"), "1234345678910111213141516171819202122232425"), exceptValid: false},
];

for (let i=0;i<users.length;i++) {
    const user = users[i]; // @ts-ignore
    describe("user N°"+(i+1),function(){
        // @ts-ignore
        it("The excepted value of isValid() is : "+user.except.toString(),function() {
            var value=user.classe.isValid();
            // @ts-ignore
            expect(value).toBe(user.except);
        });
        // @ts-ignore
        it("The excepted value of save() is : "+user.except.toString(),async function() {
            var value=await user.classe.save();
            // @ts-ignore
            expect(value).toBe(user.except);
        });
    });
}