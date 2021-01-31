const Helper = require("../Helper").Helper;

String.prototype.interpolate = require("../libs/interpolate");

const httpItemsTests = [
    {
        action: "/item/create",
        fields: {
            TodolistId: "blabla",
            name: "some name",
            content: "some content"
        },
        excepted: {status: "error", msg: "Invalid item", errors: ["'TodolistId' invalid type"]}
    },
    {
        action: "/item/create",
        fields: {
            TodolistId: 4554737687587,
            name: "some name",
            content: "some content"
        },
        excepted: {status: "error", msg: "Invalid item", errors: ["This todolist does not exist"]}
    },
    {
        action: "/item/create",
        fields: {
            TodolistId: 23452436,
            name: "a name"
        },
        excepted: {status: "error", msg: "Invalid item", errors: ["'content' argument missing"]}
    },
    {
        action: "/item/create",
        fields: {
            TodolistId: 89765344532,
            content: "other content"
        },
        excepted: {status: "error", msg: "Invalid item", errors: ["'name' argument missing"]}
    },
    {
        action: "/user/create",
        fields: {
            firstname: "Chris",
            lastname: "Evans",
            birthday: "1981-06-13",
            email: "americaass@marvel.com",
            password: "IAmWorthy",
            password_confirm: "IAmWorthy"
        },
        excepted: {status: "success", msg: "User successfully created", id: "*"},
        toStores: {id: "UserId"},
        afters: [
            {
                action: "/todolist/create",
                fields: {
                    UserId: "{{UserId}}"
                },
                excepted: {status: "success", msg: "Todolist successfully created", id: "*"},
                toStores: {id: "TodolistId"},
                afters: [
                    {
                        action: "/item/create",
                        fields: {
                            TodolistId: "{{TodolistId}}",
                            name: "a name",
                            content: "a content"
                        },
                        excepted: {status: "success", msg: "Item successfully created", id: "*"},
                        toStores: {id: "ItemId"},
                        afters: [
                            {
                                action: "/item/edit",
                                fields: {
                                    id: 654356634
                                },
                                excepted: {status: "error", msg: "Invalid item edit", errors: ["This item does not exist"]}
                            },
                            {
                                action: "/item/edit",
                                fields: {
                                    id: "blabla"
                                },
                                excepted: {status: "error", msg: "Invalid item edit", errors: ["'id' invalid type"]}
                            },
                            {
                                action: "/item/edit",
                                fields: {
                                    id: "{{ItemId}}",
                                    name: "An other one"
                                },
                                excepted: {status: "success", msg: "Item successfully edited", id: "*"}
                            },
                            {
                                action: "/item/delete",
                                fields: {
                                    id: "blabla",
                                },
                                excepted: {status: "error", msg: "Invalid item delete", errors: ["'id' invalid type"]}
                            },
                            {
                                action: "/item/delete",
                                fields: {
                                    id: 7563257,
                                },
                                excepted: {status: "error", msg: "Invalid item delete", errors: ["This item does not exist"]}
                            },
                            {
                                action: "/item/delete",
                                fields: {
                                    id: "{{ItemId}}",
                                },
                                excepted: {status: "success", msg: "Item successfully deleted"},
                                afters: [
                                    {
                                        action: "/todolist/delete",
                                        fields: {
                                            id: "{{TodolistId}}",
                                        },
                                        excepted: {status: "success", msg: "Todolist successfully deleted"},
                                        afters: [
                                            {
                                                action: '/user/delete',
                                                fields: {
                                                    id: "{{UserId}}"
                                                },
                                                excepted: {status: "success", msg: "User successfully deleted"}
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
]

for (let i=0;i<httpItemsTests.length;i++) {
    const item = httpItemsTests[i];
    describe("Checking of http item request N°"+(i+1), () => {
        it("The expected value of http is : "+JSON.stringify(item.excepted), async () => {
            return await Helper.executeTests(item)
        })
    });
}