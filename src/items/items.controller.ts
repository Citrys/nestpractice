import { Controller, Get, Put, Post, Delete, Body, Param, NotFoundException } from '@nestjs/common';
import { CreateItemDTO } from './dto/create-item.dto'
import { ItemsService } from './items.service'
import { IItem } from './interfaces/item.interface'


@Controller('items')
export class ItemsController {

  // injection
  constructor(private readonly itemservice: ItemsService) { }

  @Get()
  async findAll(): Promise<IItem[]> {
    return this.itemservice.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id): Promise<IItem> {
    let item = this.itemservice.findOne(id)
    if (item === undefined) {
      throw new NotFoundException("No such id")
    } else { return item }
  }


  @Post()
  async create(@Body() itemDto: CreateItemDTO) {
    return this.itemservice.createItem(itemDto)
  }

  @Delete(':id')
  async delete(@Param('id') id) {
    return this.itemservice.deleteOne(id)
  }

  @Put(':id')
  async update(@Param('id') id, @Body() newItem: CreateItemDTO) {
    return this.itemservice.updateItem(id, newItem)
  }
}
