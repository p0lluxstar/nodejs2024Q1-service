import { Module } from '@nestjs/common';
import { FavoriteController } from './favorite.controller';
import { FavoriteService } from './favorite.service';
import { FavoriteEntity } from './favorite.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([FavoriteEntity])],
  controllers: [FavoriteController],
  providers: [FavoriteService],
})
export class FavoriteModule {}
