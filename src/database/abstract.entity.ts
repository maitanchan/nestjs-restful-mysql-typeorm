import { PrimaryGeneratedColumn } from "typeorm";

export class AbstractEntity<Entity> {

    @PrimaryGeneratedColumn('uuid')
    id: string

    constructor(entity: Partial<Entity>) {

        Object.assign(this, entity)

    }

}