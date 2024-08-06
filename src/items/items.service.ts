import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { EntityManager, Repository } from 'typeorm';
import { Listing } from './entities/listing.entity';
import { Comment } from './entities/comment.entity';
import { Tag } from './entities/tag.entity';

@Injectable()
export class ItemsService {

  constructor(
    @InjectRepository(Item) private readonly itemRepository: Repository<Item>,
    private readonly entityManager: EntityManager
  ) { }

  async create(createItemDto: CreateItemDto): Promise<Item> {

    const listing = new Listing({ ...createItemDto.listing, rating: 0 })

    const tags = createItemDto.tags.map((createTagDto) => new Tag(createTagDto))

    const item = new Item({ ...createItemDto, listing, comments: [], tags })

    await this.itemRepository.save(item)

    return item

  }

  async findAll(): Promise<Item[]> {

    return this.itemRepository.find()

  }

  async findOne(id: string): Promise<Item> {

    const item = await this.itemRepository.findOne({ where: { id }, relations: { listing: true, comments: true, tags: true } })

    if (!item) {

      throw new HttpException('Item not found', HttpStatus.NOT_FOUND)

    }

    return item

  }

  async update(id: string, updateItemDto: UpdateItemDto) {

    // const item = await this.itemRepository.findOneBy({ id })

    // if (!item) {
    //   throw new HttpException('Item not found', HttpStatus.NOT_FOUND)
    // }

    // item.name = updateItemDto.name
    // item.public = updateItemDto.public

    // const comments = updateItemDto.comments.map((createCommentDto) => new Comment(createCommentDto))

    // item.comments = comments

    // await this.itemRepository.save(item)

    // return item

    await this.entityManager.transaction(async (entityManager) => {

      const item = await this.itemRepository.findOneBy({ id })

      if (!item) {

        throw new HttpException('Item not found', HttpStatus.NOT_FOUND)

      }

      item.name = updateItemDto.name
      item.public = updateItemDto.public

      const comments = updateItemDto.comments.map((createCommentDto) => new Comment(createCommentDto))

      item.comments = comments

      await entityManager.save(item)

      throw new Error()

      const tagContent = `${Math.random()}`

      const tag = new Tag({ content: tagContent })

      await entityManager.save(tag)

    })

  }


  async remove(id: string): Promise<string> {

    const item = await this.itemRepository.findOne({ where: { id } })

    if (!item) {

      throw new HttpException('Item not found', HttpStatus.NOT_FOUND)

    }

    await this.itemRepository.delete(id)

    return "Item has been deleted"

  }

}
