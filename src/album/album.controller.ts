import { Controller, Get, Post, Body } from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/CreateAlbumDto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  async getArtists() {
    return this.albumService.getAlbums();
  }

  @Post()
  async postAlbum(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.postAlbum(createAlbumDto);
  }
}
