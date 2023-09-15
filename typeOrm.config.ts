import { DataSource } from "typeorm";
import { config } from 'dotenv'
import { ConfigService } from "@nestjs/config";
import { Item } from "./src/items/entities/item.entity";
import { Listing } from "./src/items/entities/listing.entity";
import { Tag } from "./src/items/entities/tag.entity";
import { Comment } from "./src/items/entities/comment.entity";

config()

const configService = new ConfigService()

export default new DataSource({

    type: 'mysql',
    host: configService.getOrThrow('MYSQL_HOST'),
    port: configService.getOrThrow('MYSQL_PORT'),
    database: configService.getOrThrow('MYSQL_DATABASE'),
    password: configService.getOrThrow('MYSQL_ROOT_PASSWORD'),
    username: configService.getOrThrow('MYSQL_USERNAME'),
    migrations: ['migrations/**'],
    entities: [Item, Listing, Comment, Tag]

})