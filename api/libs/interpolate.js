const prop_access = require("./prop_access");

module.exports = function transpolate(obj) {
	let chaine = this.valueOf();
	const replacer = function (match) {
		return prop_access(obj,match.replace(/{{/i,"").replace(/}}/i,"").trim())
	};
	while (chaine != chaine.replace(/{{( )*[a-zA-Z0-9.]+( )*}}/i, replacer)) {
		chaine = chaine.replace(/{{( )*[a-zA-Z0-9.]+( )*}}/i, replacer);
	}
	return chaine
}
