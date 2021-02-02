const fetch = require('node-fetch');

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

    static computeGETUrl(url, fields) {
        return url+"?"+Object.keys(fields).map((key) => key+"="+fields[key]).join("&");
    }

    static async executeTests(test,params = {}) {
        if (test.stop) return;
        for (let field in test.fields) {
            if (typeof(test.fields[field]) == "string") {
                test.fields[field] = test.fields[field].interpolate(params);
            }
        }

        let url = this.computeGETUrl(test.action, test.fields);
        const res = await fetch('http://127.0.0.1'+url);
        let body = JSON.parse(await res.text());

        if (test.toStores !== undefined) {
            for (let key in test.toStores){
                if (body[key] !== undefined){
                    params[test.toStores[key]] = body[key];
                }
            }
        }

        for (let key in test.excepted) {
            if (test.excepted[key] === "*") {
                delete test.excepted[key];
                if (body[key] !== undefined) {
                    delete body[key];
                }
            }
        }// @ts-ignore
        expect(body).toEqual(test.excepted);
        if (test.afters !== undefined) {
            for (let after of test.afters) {
                await this.executeTests(after, params);
            }
        }
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
