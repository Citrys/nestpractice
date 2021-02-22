import { Injectable } from '@nestjs/common';
import { IItem } from './interfaces/item.interface'
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose'
import { Item, ItemDocument } from '../schema/item.schema';
import { CreateItemDTO } from './dto/create-item.dto';

@Injectable()
export class ItemsService {
    constructor(@InjectModel(Item.name) private itemModel: Model<ItemDocument> ) {}
   
    async findAll(): Promise<Item[]> {
        return await this.itemModel.find({})
    }

    async findOne(itemId: string): Promise<IItem> {
        let item;
        item = await this.itemModel.find(id => id.id === itemId)
        if (item) return item
        else {
            return undefined
        }
    }

    async createItem(item: Item) {
        const newItem = new this.itemModel(item);
        return await newItem.save();
    }
}
