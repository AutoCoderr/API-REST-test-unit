module.exports = function prop_access(obj, path) {
	if (typeof(path) != "string" || path === "") return obj;
	let pathSplitted = path.split(".");
	for (let elem of pathSplitted) {
		if (typeof(obj[elem]) == "undefined") {
			return path+" not exist";
		}
		obj = obj[elem]
	}
	return obj
}
