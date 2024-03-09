import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/CreateArtistDto';
import { UpdateArtistDto } from './dto/UpdateArtistDto';

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

  @Put(':id')
  async putArtist(
    @Body() updateArtistDto: UpdateArtistDto,
    @Param('id') id: string,
  ) {
    return this.artistService.putArtist(updateArtistDto, id);
  }
}
