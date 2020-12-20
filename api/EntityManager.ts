import {Model} from "sequelize";

export class EntityManager {
    modelInstance: null|typeof Model = null;
    id: null|number = null;

    constructor() {
    }

    hydrate(entry: Object) {// @ts-ignore
        for (let attr in entry.dataValues) {// @ts-ignore
            if (typeof(this[attr]) != "undefined") {// @ts-ignore
                this[attr] = entry.dataValues[attr];
            }
        }
        return this;
    }


    async save() {
        let entryObject: Object = {};
        for (let attr in this) {
            if (attr != "modelInstance" && attr != "id") {
                // @ts-ignore
                entryObject[attr] = this[attr];
            }
        }
        if (this.id == null) {
            let entry;
            try {// @ts-ignore
                entry = await this.modelInstance.create(entryObject);
            } catch(e) {
                return false;
            }
            this.id = entry.dataValues.id;
            return this
        }
    }

    delete() {
        try { // @ts-ignore
            this.modelInstance.destroy({
                where: {
                    id: this.id
                }
            })
        } catch (e) {
            return false;
        }
        return true;
    }
}

function addMissingZero(number: string|number, n: number = 2) {
    number = number.toString();
    while (number.length < n) {
        number = "0"+number;
    }
    return number
}