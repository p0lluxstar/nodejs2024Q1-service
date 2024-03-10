import { Controller, Get, Post, Delete, Param, Res } from '@nestjs/common';
import { FavoriteService } from './favorite.service';

@Controller('favs')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Get()
  async getFavs() {
    return this.favoriteService.getFavs();
  }

  @Post('artist/:id')
  async postFavsArtist(@Param('id') id: string) {
    return this.favoriteService.postFavsArtist(id);
  }

  @Post('album/:id')
  async postFavsAlbum(@Param('id') id: string) {
    return this.favoriteService.postFavsAlbum(id);
  }

  @Post('track/:id')
  async postFavsTrack(@Param('id') id: string) {
    return this.favoriteService.postFavsTrack(id);
  }

  @Delete('artist/:id')
  async deleteFavsArtist(@Param('id') id: string, @Res() res: any) {
    return this.favoriteService.deleteFavsArtist(id, res);
  }

  @Delete('album/:id')
  async deleteFavsAlbum(@Param('id') id: string, @Res() res: any) {
    return this.favoriteService.deleteFavsAlbum(id, res);
  }

  @Delete('track/:id')
  async deleteFavsTrack(@Param('id') id: string, @Res() res: any) {
    return this.favoriteService.deleteFavsTrack(id, res);
  }
}
