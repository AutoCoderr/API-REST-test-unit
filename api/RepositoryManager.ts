import {Model} from "sequelize";
import {EntityManager} from "./EntityManager";

export class RepositoryManager {
    static model: null|typeof Model = null;
    static entity: null|typeof EntityManager = null;

    static async find(id, include: null|typeof Model|Array<typeof Model> = null) : Promise<any> {
        let params: any = {where: {id: id}};
        if (include != null) {
            params.include = include;
        }
        return await this.findByParams(params);
    }

    static async findByParams(params): Promise<any> {// @ts-ignore
        const foundElem = await this.model.findOne(params); // @ts-ignore
        return foundElem != null ? new this.entity().hydrate(foundElem) : null;
    }
}