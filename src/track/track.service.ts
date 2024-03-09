import { Itrack } from 'src/types/interface';
import { CreateTrackDto } from './dto/CreateTrackDto';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { db } from 'src/data/db';

@Injectable()
export class TrackService {
  async getTracks(): Promise<Itrack[]> {
    return db.tracks;
  }

  async postTrack(createTrackDto: CreateTrackDto) {
    return createTrackDto;
  }
}
