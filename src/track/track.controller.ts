import { CreateTrackDto } from './dto/CreateTrackDto';
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
import { TrackService } from './track.service';
import { UpdateTrackDto } from './dto/UpdateTrackDto';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  async getTracks() {
    return this.trackService.getTracks();
  }

  @Get(':id')
  async getTrackById(@Param('id') id: string) {
    return this.trackService.getTrackById(id);
  }

  @Post()
  async postTrack(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.postTrack(createTrackDto);
  }

  @Put(':id')
  async putTrack(
    @Body() updateTrackDto: UpdateTrackDto,
    @Param('id') id: string,
  ) {
    return this.trackService.putTrack(updateTrackDto, id);
  }

  @Delete(':id')
  async deleteTrack(@Param('id') id: string, @Res() res: any) {
    return this.trackService.deleteTrack(id, res);
  }
}
