import { Module } from '@nestjs/common';

//PROPIO
import { XpathService } from './xpath.service';
import { XpathResolver } from './xpath.resolver';
import { Xpath } from './entities/xpath.entity';

@Module({
  imports: [Xpath],
  providers: [XpathResolver, XpathService],
})
export class XpathModule {}
