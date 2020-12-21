const User = require("../Entities/User").User;
const Todolist = require( "../Entities/Todolist").Todolist;
const Item = require("../Entities/Item").Item;

describe('Premier test ', function(){
    it("Test creation d'un item avec un nom vide", async function(){
        const {user, todolist} = await createUserAndTodolist();
        let item = new Item();
        item.setTodolistId(todolist.id);
        item.setName("  ");
        item.setContent("KEUUWWAAA");
        const value = await item.isValid();
        expect(value).toEqual({type : "error", errors : ["NAME_NOT_SPECIFIED"]});
        todolist.delete();
        user.delete();
    })
})

describe('Second test ', function(){
    it("Test creation d'un item avec content vide", async function(){
        const {user, todolist} = await createUserAndTodolist();
        let item = new Item();
        item.setTodolistId(todolist.id);
        item.setName("Coconut");
        item.setContent("  ");
        const value = await item.isValid();
        expect(value).toEqual({type : "error", errors : ["CONTENT_NOT_SPECIFIED"]});
        todolist.delete();
        user.delete();
    })
})

describe('Troisieme test ', function(){
    it("Test creation deux items meme nom", async function(){
        const {user, todolist} = await createUserAndTodolist();
        let item = new Item();
        item.setTodolistId(todolist.id);
        item.setName("Nabudochonosor");
        item.setContent("Pericles");
        item.setCreatedAt((new Date()).getTime()-40*60*1000);
        await item.save();
        let item2 = new Item();
        item2.setTodolistId(todolist.id);
        item2.setName("Nabudochonosor");
        item2.setContent("Pericles");
        const value = await item.isValid();
        expect(value).toEqual({type : "error", errors : ["NAME_ALREADY_USED"]});
        item.delete();
        todolist.delete();
        user.delete();
    })
})

describe('Quatrieme test ', function(){
    it("Test plus de mille caracteres", async function(){
        const {user, todolist} = await createUserAndTodolist();
        let item = new Item();
        item.setTodolistId(todolist.id);
        item.setName("TARDIS");
        item.setContent(needXcharacters(1001, "q"));
        const value = await item.isValid();
        expect(value).toEqual({type : "error", errors : ["CONTENT_TOO_LONG"]});
        todolist.delete();
        user.delete();
    })
})

describe('Cinquieme test ', function(){
    it("Ajout huitieme item envoi mail", async function(){
        const {user, todolist} = await createUserAndTodolist();
        let itemsList = [];
        for (let i = 0; i<7; i++)
        {
            let item = new Item();
            item.setTodolistId(todolist.id);
            item.setName("Jedi " + (i+1));
            item.setContent("Sith " + (i+1));
            item.setCreatedAt((new Date()).getTime()-(40*60*1000)*(8-i));
            await item.save();
            itemsList.push(item);
        }
        let item = new Item();
        item.setTodolistId(todolist.id);
        item.setName("Obiwan");
        item.setContent("Darth Vador");
        let value = await item.isValid(true);
        value = value.infoMailer.response.split(" ").slice(0,3).join(" ");
        expect(value).toEqual("250 2.0.0 OK");
        for (let unItem of itemsList)
        {
            unItem.delete();
        }
        todolist.delete();
        user.delete();
    })
})

async function createUserAndTodolist(){
    const user = new User();

    user.setFirstname('Bruce');
    user.setLastname('Wayne');
    user.setEmail('Bruce.wayne@wayne.com');
    user.setPassword('IronManSucksIceCream');
    user.setBirthday('1988-12-25');

    await user.save();

    const todolist = new Todolist();

    todolist.setUserId(user.id);
    await todolist.save();

    return {todolist, user};

}

function needXcharacters(x, dalek)
{
    let army = "";
    for(let i = 0; i<x; i++)
    {
        army += dalek;
    }
    return army;
}