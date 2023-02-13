import { Module } from '@nestjs/common';
import { LoteriaService } from './loteria.service';
import { LoteriaResolver } from './loteria.resolver';

@Module({
  providers: [LoteriaResolver, LoteriaService]
})
export class LoteriaModule {}
