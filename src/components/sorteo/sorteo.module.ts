import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//PROPIO
import { SorteoService } from './sorteo.service';
import { SorteoResolver } from './sorteo.resolver';
import { Sorteo } from './entities/sorteo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sorteo])],
  providers: [SorteoResolver, SorteoService],
  exports: [SorteoService],
})
export class SorteoModule {}
