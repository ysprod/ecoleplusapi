import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ClassDto } from 'src/classes/dto/class.dto';
 // import { ClassDetail } from '../../classes/dto/class-detail.dto'; // Décommente si tu as ce DTO

export class ScheduleEventDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  classId: string;

  @ApiPropertyOptional()
  _id?: string;

  @ApiPropertyOptional()
  title?: string;

  @ApiPropertyOptional({ type: Date })
  start?: Date;

  @ApiPropertyOptional({ type: Date })
  end?: Date;

  @ApiPropertyOptional()
  color?: string;

  @ApiProperty()
  day: string;

  @ApiProperty()
  hour: string;

  @ApiProperty()
  subject: string;

  @ApiProperty()
  teacherName: string;

  @ApiPropertyOptional({ type: () => ClassDto })
  class?: ClassDto; // | ClassDetail

  @ApiPropertyOptional()
  class_Id?: string;

  @ApiPropertyOptional()
  allDay?: boolean;

  @ApiPropertyOptional()
  editable?: boolean;

  @ApiPropertyOptional()
  resizable?: boolean;
}