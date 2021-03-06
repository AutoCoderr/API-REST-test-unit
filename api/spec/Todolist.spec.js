const User = require("../Entities/User").User;
const Todolist = require( "../Entities/Todolist").Todolist;

// @ts-ignore
describe("Test numero 1", function () {
    // @ts-ignore
    it("Test creation todolist sur user inexistant", async function(){
        let todolist = new Todolist();
        todolist.setUserId(15265126);
        const value = await todolist.isValid()
        // @ts-ignore
        expect(value).toEqual(["USER_NOT_EXIST"]);
    });
});

// @ts-ignore
describe("Test numero 2", function () {
    let user =  new User()

    user.setFirstname('Brenda');
    user.setLastname('Montgommery');
    user.setBirthday('1995-09-12');
    user.setEmail('monemail@gmail.com');
    user.setPassword('azerty1234');

    // @ts-ignore
    it("Test creation todolist sans spécifier de UserId", async function(){
        await user.save()
        let todolist = new Todolist();
        const value = await todolist.isValid()
        // @ts-ignore
        expect(value).toEqual(["USER_ID_NOT_SPECIFIED"]);

        user.delete();
    });
});

// @ts-ignore
describe("Test numero 3", function () {
    let user =  new User()

    user.setFirstname('Brenda');
    user.setLastname('Montgommery');
    user.setBirthday('1995-09-12');
    user.setEmail('monemail@gmail.com');
    user.setPassword('azerty1234');

    // @ts-ignore
    it("Test creation todolist sur user existant", async function(){
        await user.save()
        let todolist = new Todolist();
        todolist.setUserId(user.id);
        const value = await todolist.isValid()
        // @ts-ignore
        expect(value).toBe(true);

        user.delete();
    });
});

// @ts-ignore
describe("Test numero 4", function () {
    let user =  new User()

    user.setFirstname('Brenda');
    user.setLastname('Montgommery');
    user.setBirthday('1995-09-12');
    user.setEmail('monemail@gmail.com');
    user.setPassword('azerty1234');

    // @ts-ignore
    it("Test creation de 2 todolists sur user existant", async function(){
        await user.save()
        let todolist1 = new Todolist();
        todolist1.setUserId(user.id);
        await todolist1.save();

        let todolist2 = new Todolist();
        todolist2.setUserId(user.id);
        const value = await todolist2.isValid();
        // @ts-ignore
        expect(value).toEqual(["USER_HAS_ALREADY_A_TODOLIST"]);
        
        todolist1.delete();
        user.delete();
    });
});