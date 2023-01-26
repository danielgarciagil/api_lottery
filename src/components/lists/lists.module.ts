import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//Propio
import { ListsService } from './lists.service';
import { ListsResolver } from './lists.resolver';
import { List } from './entities/list.entity';
import { ListsItemModule } from '../lists-item/lists-item.module';

@Module({
  imports: [TypeOrmModule.forFeature([List]), ListsItemModule],
  providers: [ListsResolver, ListsService],
  exports: [TypeOrmModule, ListsService],
})
export class ListsModule {}
