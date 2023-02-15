import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//PROPIO
import { XpathService } from './xpath.service';
import { XpathResolver } from './xpath.resolver';
import { Xpath } from './entities/xpath.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Xpath])],
  providers: [XpathResolver, XpathService],
})
export class XpathModule {}
