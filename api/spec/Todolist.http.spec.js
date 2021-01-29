const Helper = require("../Helper").Helper;
const fetch = require('node-fetch');

String.prototype.interpolate = require("../libs/interpolate");

const httpTodolistTests = [
    {
        action: "/todolist/create",
        fields: {
            UserId: "Abcd",
        },
        excepted: {status: "error", msg: "Invalid todolist", errors: [ "'UserId' invalid type" ]},
    },
    {
        action: "/todolist/create",
        fields: {
            UserId: 15226484,
        },
        excepted: {status: "error", msg: "Invalid todolist", errors: [ "User does not exist" ]},
    },
    {
        action: "/todolist/delete",
        fields: {
            id: "Canard",
        },
        excepted: {status: "error", msg: "Invalid todolist delete", errors: [ "'id' invalid type" ]},
    },
    {
        action: "/todolist/delete",
        fields: {
            id: 184563848,
        },
        excepted: {status: "error", msg: "Invalid todolist delete", errors: ["This todolist does not exist"]},
    },
    {
        action: "/user/create",
        fields: {
			firstname: "Bruce",
			lastname: "Wayne",
			birthday: "1939-03-30",
			email: "bruce.wayne@wayneenterprises.com",
			password: "IAmBatman",
			password_confirm: "IAmBatman"
        },
        excepted: {status: "success", msg: "User successfully created", id: "*"},
        toStores: ["id"],
        afters : [
            {
                action: "/todolist/create",
                fields: {
                    UserId: "{{ id }}"
                },
                excepted: {status: "success", msg: "Todolist successfully created", id: "*"},
                toStores: ["id"],
                afters: [
                    {
                        action: "/todolist/delete",
                        fields: {
                            id: "{{ id }}",
                        },
                        excepted: {status: "success", msg: "Todolist deleted"}
                    }
                ]
            }
        ]
    },
    
]

for (let i=0;i<httpTodolistTests.length;i++) {
	const todolist = httpTodolistTests[i];
	describe("Checking of http todolist request N°"+(i+1), () => {
		it("The expected value of http is : "+JSON.stringify(todolist.excepted), () => {checkTodolist(todolist)})
	});
}

async function checkTodolist(todolist, params = {}) {
	for (let field in todolist.fields) {
		if (typeof(todolist.fields[field]) == "string") {
			todolist.fields[field] = todolist.fields[field].interpolate(params);
		}
	}

	let url = Helper.computeGETUrl(todolist.action, todolist.fields);
	const res = await fetch('http://127.0.0.1'+url);
    let body = JSON.parse(await res.text());

	if (todolist.toStores !== undefined) {
		for (let toStore of todolist.toStores) {
			if (body[toStore] !== undefined) {
				params[toStore] = body[toStore];
			}
		}
	}

	for (let key in todolist.excepted) {
		if (todolist.excepted[key] === "*") {
			delete todolist.excepted[key];
			if (body[key] !== undefined) {
				delete body[key];
			}
		}
	}
	expect(body).toEqual(todolist.excepted);
	if (todolist.afters !== undefined) {
		for (let after of todolist.afters) {
			checkTodolist(after, params);
		}
	}
}