import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//PROPIO
import { LoteriaService } from './loteria.service';
import { LoteriaResolver } from './loteria.resolver';
import { Loteria } from './entities/loteria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Loteria])],
  providers: [LoteriaResolver, LoteriaService],
})
export class LoteriaModule {}
