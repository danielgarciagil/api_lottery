import { Module } from '@nestjs/common';
import { PlataformaService } from './plataforma.service';
import { PlataformaResolver } from './plataforma.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plataforma } from './entities/plataforma.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Plataforma])],
  providers: [PlataformaResolver, PlataformaService],
  exports: [TypeOrmModule],
})
export class PlataformaModule {}
