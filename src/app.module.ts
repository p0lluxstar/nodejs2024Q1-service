import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';
import { TrackModule } from './track/track.module';
import { AlbumModule } from './album/album.module';
import { FavoriteModule } from './favorite/favorite.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import conf from './conf';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [conf],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        database: configService.get('DB_DATABASE'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
    }),
    UserModule,
    ArtistModule,
    TrackModule,
    AlbumModule,
    FavoriteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
