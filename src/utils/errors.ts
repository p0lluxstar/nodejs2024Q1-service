import { HttpException, HttpStatus } from '@nestjs/common';

export const err400 = (errText: string) => {
  throw new HttpException(`${errText}`, HttpStatus.BAD_REQUEST);
};

export const err403 = (errText: string) => {
  throw new HttpException(`${errText}`, HttpStatus.FORBIDDEN);
};

export const err404 = (errText: string) => {
  throw new HttpException(`${errText}`, HttpStatus.NOT_FOUND);
};

export const err422 = (errText: string) => {
  throw new HttpException(`${errText}`, HttpStatus.UNPROCESSABLE_ENTITY);
};
