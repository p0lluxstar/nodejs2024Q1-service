import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/CreateArtistDto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  async getArtists() {
    return this.artistService.getArtists();
  }

  @Get(':id')
  async getArtistById(@Param('id') id: string) {
    return this.artistService.getArtistById(id);
  }

  @Post()
  async postArtist(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.postArtist(createArtistDto);
  }
}
