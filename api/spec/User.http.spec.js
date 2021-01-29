const Helper = require("../Helper").Helper;
const fetch = require('node-fetch');

String.prototype.interpolate = require("../libs/interpolate");

const httpUsersTests = [
	{
		action: "/user/create",
		fields: {
			lastname: "Mithridate",
			email: "mithridate@pont.com",
			birthday: "-132-05-10",
			password: "abcdef1234",
			password_confirm: "abcdef1234"
		},
		excepted: {status: "error", msg: "Invalid user", errors: ["'firstname' argument missing"]}
	},
	{
		action: "/user/create",
		fields: {
			firstname: "Jules",
			email: "julesCesar@rome.com",
			birthday: "-100-05-10",
			password: "abcdef1234",
			password_confirm: "abcdef1234"
		},
		excepted: {status: "error", msg: "Invalid user", errors: ["'lastname' argument missing"]}
	},
	{
		action: "/user/create",
		fields: {
			firstname: "Philippe",
			lastname: "Le Bel",
			birthday: "1268-07-12",
			password: "abcdef1234",
			password_confirm: "abcdef1234"
		},
		excepted: {status: "error", msg: "Invalid user", errors: ["'email' argument missing"]}
	},
	{
		action: "/user/create",
		fields: {
			firstname: "Gengis",
			lastname: "Khan",
			email: "gengis.khan@mongomail.com",
			password: "abcdef1234",
			password_confirm: "abcdef1234"
		},
		excepted: {status: "error", msg: "Invalid user", errors: ["'birthday' argument missing"]}
	},
	{
		action: "/user/create",
		fields: {
			firstname: "Leonidas",
			lastname: "De Sparte",
			birthday: "-540-03-14",
			email: "leonidas@spartemail.com",
			password_confirm: "abcdef1234"
		},
		excepted: {status: "error", msg: "Invalid user", errors: ["'password' argument missing"]}
	},
	{
		action: "/user/create",
		fields: {
			firstname: "Confucius",
			lastname: "Le philosophe",
			birthday: "-551-10-28",
			email: "confucius@chinamail.com",
			password: "abcdef1234"
		},
		excepted: {status: "error", msg: "Invalid user", errors: ["'password_confirm' argument missing"]}
	},
	{
		action: "/user/create",
		fields: {
			firstname: "Nicolas",
			lastname: "Flamel",
			birthday: "1330-11-18",
			email: "nicolas.flamel@alchimistes.com",
			password: "abcdef1234",
			password_confirm: "abcdef12345"
		},
		excepted: {status: "error", msg: "Invalid user", errors: ["You need to confirm your password"]}
	},
	{
		action: "/user/create",
		fields: {
			firstname: "Jacques",
			lastname: "De Molay",
			birthday: "1244-08-27",
			email: "jacques.demolay@templier.com",
			password: "abcdef1234",
			password_confirm: "abcdef1234"
		},
		excepted: {status: "success", msg: "User successfully created", id: "*"},
		toStores: ["id"],
		afters: [{
			action: "/user/delete",
			fields: {
				id: "{{id}}"
			},
			excepted: {status: "success", msg: "user successfully deleted"}
		}]
	},
	{
		action: "/user/delete",
		fields: {
			id: "abcdef"
		},
		excepted: {status: "error", msg: "Invalid user delete", errors: ["'id' invalid type"]}
	},
	{
		action: "/user/delete",
		fields: {
			id: rand(1000,9999)
		},
		excepted: {status: "error", msg: "Invalid user delete", errors: ["This user does not exist"]}
	},
	{
		action: "/user/create",
		fields: {
			firstname: "Jacques",
			lastname: "De Molay",
			birthday: "1244-08-27",
			email: "jacques.demolay@templier.com",
			password: "abcdef1234",
			password_confirm: "abcdef1234"
		},
		excepted: {status: "success", msg: "User successfully created", id: "*"},
		toStores: ["id"],
		afters: [{
			action: "/user/edit",
			fields: {
				id: rand(1000,9999)
			},
			excepted: {status: "error", msg: "Invalid user edit", errors: ["This user does not exist"]}
		},{
			action: "/user/edit",
			fields: {
				id: "abcd"
			},
			excepted: {status: "error", msg: "Invalid user edit", errors: ["'id' invalid type"]}
		},{
			action: "/user/edit",
			fields: {
				id: "{{id}}",
				password: "123456789"
			},
			excepted: {status: "error", msg: "Invalid user edit", errors: ["You need to confirm your password"]}
		},{
			action: "/user/edit",
			fields: {
				id: "{{id}}",
				password: "123456789",
				password_confirm: "123456789abcd"
			},
			excepted: {status: "error", msg: "Invalid user edit", errors: ["You need to confirm your password"]}
		},{
			action: "/user/edit",
			fields: {
				id: "{{id}}",
				password: "123456789",
				password_confirm: "123456789"
			},
			excepted: {status: "success", msg: "user successfully edited", id: "*"},
			afters: [{
				action: "/user/delete",
				fields: {
					id: "{{id}}"
				},
				excepted: {status: "success", msg: "user successfully deleted"}
			}]
		}]
	},
];

for (let i=0;i<httpUsersTests.length;i++) {
	const user = httpUsersTests[i];
	describe("Checking of http user request N°"+(i+1), () => {
		it("The expected value of http is : "+JSON.stringify(user.excepted), () => {checkUser(user)})
	});
}

async function checkUser(user, params = {}) {
	for (let field in user.fields) {
		if (typeof(user.fields[field]) == "string") {
			user.fields[field] = user.fields[field].interpolate(params);
		}
	}

	let url = Helper.computeGETUrl(user.action, user.fields);
	const res = await fetch('http://127.0.0.1'+url);
	let body = JSON.parse(await res.text());

	if (user.toStores !== undefined) {
		for (let toStore of user.toStores) {
			if (body[toStore] !== undefined) {
				params[toStore] = body[toStore];
			}
		}
	}

	for (let key in user.excepted) {
		if (user.excepted[key] === "*") {
			delete user.excepted[key];
			if (body[key] !== undefined) {
				delete body[key];
			}
		}
	}
	expect(body).toEqual(user.excepted);
	if (user.afters !== undefined) {
		for (let after of user.afters) {
			checkUser(after, params);
		}
	}
}

function rand(a,b) {
	return a+Math.floor(Math.random()*(b-a+1));
}
