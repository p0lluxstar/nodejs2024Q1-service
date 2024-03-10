import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Res,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/CreateAlbumDto';
import { UpdateAlbumDto } from './dto/UpdateAlbumDto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  async getArtists() {
    return this.albumService.getAlbums();
  }

  @Get(':id')
  async getAlbumById(@Param('id') id: string) {
    return this.albumService.getAlbumById(id);
  }

  @Post()
  async postAlbum(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.postAlbum(createAlbumDto);
  }

  @Put(':id')
  async putAlbum(
    @Body() updateAlbumDto: UpdateAlbumDto,
    @Param('id') id: string,
  ) {
    return this.albumService.putAlbum(updateAlbumDto, id);
  }

  @Delete(':id')
  async deleteAlbum(@Param('id') id: string, @Res() res: any) {
    return this.albumService.deleteAlbum(id, res);
  }
}
