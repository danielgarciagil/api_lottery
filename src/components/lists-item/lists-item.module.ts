import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//Propias
import { ListsItemService } from './lists-item.service';
import { ListsItemResolver } from './lists-item.resolver';
import { ListsItem } from './entities/lists-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ListsItem])],
  providers: [ListsItemResolver, ListsItemService],
  exports: [ListsItemService, TypeOrmModule],
})
export class ListsItemModule {}
