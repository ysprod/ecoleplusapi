import { PartialType } from '@nestjs/mapped-types';

import { IsOptional, IsMongoId } from 'class-validator';
import { ActivityCreateDto } from './activity-create.dto';

export class ActivityUpdateDto extends PartialType(ActivityCreateDto) {
  @IsOptional()
  @IsMongoId()
  id?: string;
}