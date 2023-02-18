import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//PROPIO
import { Dias } from './entity/dias.entity';
import { DiaInit } from './dia-init.service';

@Module({
  imports: [TypeOrmModule.forFeature([Dias])],
  providers: [DiaInit],
})
export class DiasModule {}
