export class Helper {
    static checkArgs(query,types) {
        let errors: Array<string> = [];
        for (let key in types) {
            const required = typeof (types[key].required) != "undefined" ? types[key].required : true;
            if (typeof(query[key]) == "undefined" && required) {
                errors.push("'"+key+"' argument missing");
            } else if(typeof(query[key]) != "undefined") {
                if (getType(query[key]) != types[key].type && types[key].type != "string") {
                    errors.push("'" + key + "' invalid type");
                }
            }
        }
        return errors.length > 0 ? errors : true;
    }
}

function getType(field) {
    if (isNumber(field)) return "number";
    if (isBoolean(field)) return "boolean";
    if (isNull(field)) return "null";
    return "string";
}

function isNull(field) {
    return field == null;
}
function isNumber(field) {
    return parseInt(field).toString() == field && field != "NaN";
}
function isBoolean(field) {
    return field.toLowerCase() == "true" || field.toLowerCase() == "false";
}