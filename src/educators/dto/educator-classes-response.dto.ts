import { EducatorClassDto } from './educator-class.dto';

export class EducatorClassesResponseDto {
  classes: EducatorClassDto[];
  educatorsCount: number;
}
