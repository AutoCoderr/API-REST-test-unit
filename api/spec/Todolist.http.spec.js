const Helper = require("../Helper").Helper;

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
        toStores: {
            id: "userId"
        },
        afters : [
            {
                action: "/todolist/create",
                fields: {
                    UserId: "{{ userId }}"
                },
                excepted: {status: "success", msg: "Todolist successfully created", id: "*"},
                toStores: {
                    id: "todolistId"
                },
                afters: [
                    {
                        action: "/todolist/delete",
                        fields: {
                            id: "{{ todolistId }}",
                        },
                        excepted: {status: "success", msg: "Todolist deleted"}
                    }
                ]
            }
        ]
    }
]

for (let i=0;i<httpTodolistTests.length;i++) {
	const todolist = httpTodolistTests[i];
	describe("Checking of http todolist request N°"+(i+1), () => {
		it("The expected value of http is : "+JSON.stringify(todolist.excepted), async () => {
		    return await Helper.executeTests(todolist)
		})
	});
}