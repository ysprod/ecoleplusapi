import { PartialType } from '@nestjs/swagger';
import { CreateConductDto } from './create-conduct.dto';

export class UpdateConductDto extends PartialType(CreateConductDto) {}
