import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//PROPIO
import { Dias } from './entity/dias.entity';
import { DiaInit } from './dia-init.service';
import { DiasResolver } from './dias.resolver';
import { DiasService } from './dia.service';

@Module({
  imports: [TypeOrmModule.forFeature([Dias])],
  providers: [DiaInit, DiasResolver, DiasService],
})
export class DiasModule {}
