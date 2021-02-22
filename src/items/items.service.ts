import { Injectable } from '@nestjs/common';
import { IItem } from './interfaces/item.interface'
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose'
import { Item, ItemDocument } from '../schema/item.schema';
import { CreateItemDTO } from './dto/create-item.dto';

@Injectable()
export class ItemsService {
    constructor(@InjectModel(Item.name) private itemModel: Model<ItemDocument>) { }

    async findAll(): Promise<Item[]> {
        return await this.itemModel.find({})
    }

    async findOne(itemId: string): Promise<IItem> {
        let item;
        item = await this.itemModel.findById(itemId) as IItem
        if (item) return <IItem>item
        else {
            return undefined
        }
    }

    async createItem(item: CreateItemDTO) {
        const itemCreated: Item = { ...item, created: new Date(), modified: new Date(), version: 0 }
        return await this.itemModel.create(itemCreated)
    }

    async deleteOne(id: string) {
        return await this.itemModel.findByIdAndDelete(id)
    }

    async updateItem(id: string, item: CreateItemDTO) {
        const findItem = await this.itemModel.findById(id)
        console.log(`Item found ${JSON.stringify(findItem)}`)
        if (findItem) {
            const updatedItem: Item = { ...item, created: findItem.created, modified: new Date, version: findItem.version + 1 }
            return await this.itemModel.findByIdAndUpdate(id, updatedItem)
        }
        else {
            return undefined
        }
    }
}
