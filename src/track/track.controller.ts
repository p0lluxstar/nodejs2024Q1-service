import { CreateTrackDto } from './dto/CreateTrackDto';
import { Controller, Get, Post, Body } from '@nestjs/common';
import { TrackService } from './track.service';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  async getTracks() {
    return this.trackService.getTracks();
  }

  @Post()
  async postTrack(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.postTrack(createTrackDto);
  }
}
