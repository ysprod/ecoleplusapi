import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { BulletinDecision, BulletinStatus } from '../schemas/bulletin.schema';

export class BulletinGradeItemDto {
  @ApiProperty({ description: 'Subject ID' })
  @IsMongoId()
  @IsNotEmpty()
  subject: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  coefficient: number;

  @ApiPropertyOptional()
  @IsNumber()
  @Min(0)
  @IsOptional()
  interrogation?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @Min(0)
  @IsOptional()
  devoir?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @Min(0)
  @IsOptional()
  composition?: number;

  @ApiProperty({ description: 'Moyenne de la matière' })
  @IsNumber()
  moyenne: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  appreciation?: string;

  @ApiPropertyOptional()
  @IsNumber()
  @Min(1)
  @IsOptional()
  rank?: number;

  @ApiPropertyOptional({ description: 'Teacher ID' })
  @IsMongoId()
  @IsOptional()
  teacher?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  teacherName?: string;
}

export class BulletinStatisticsDto {
  @ApiProperty()
  @IsNumber()
  generalAverage: number;

  @ApiProperty()
  @IsNumber()
  classAverage: number;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  rank: number;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  totalStudents: number;

  @ApiProperty()
  @IsNumber()
  highestAverage: number;

  @ApiProperty()
  @IsNumber()
  lowestAverage: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  totalCoefficients: number;
}

export class CreateBulletinDto {
  @ApiProperty({ description: 'Student ID' })
  @IsMongoId()
  @IsNotEmpty()
  student: string;

  @ApiProperty({ description: 'Class ID' })
  @IsMongoId()
  @IsNotEmpty()
  class: string;

  @ApiProperty({ description: 'Term ID' })
  @IsMongoId()
  @IsNotEmpty()
  term: string;

  @ApiProperty({ description: 'AcademicYear ID' })
  @IsMongoId()
  @IsNotEmpty()
  academicYear: string;

  @ApiProperty({ description: 'School ID' })
  @IsMongoId()
  @IsNotEmpty()
  school: string;

  @ApiProperty({ type: [BulletinGradeItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BulletinGradeItemDto)
  grades: BulletinGradeItemDto[];

  @ApiProperty({ type: BulletinStatisticsDto })
  @ValidateNested()
  @Type(() => BulletinStatisticsDto)
  statistics: BulletinStatisticsDto;

  @ApiPropertyOptional({ description: 'Conduct ID' })
  @IsMongoId()
  @IsOptional()
  conduct?: string;

  @ApiPropertyOptional({ type: [String], description: 'Remark IDs' })
  @IsArray()
  @IsOptional()
  remarks?: string[];

  @ApiPropertyOptional({ enum: BulletinDecision })
  @IsEnum(BulletinDecision)
  @IsOptional()
  decision?: BulletinDecision;

  @ApiPropertyOptional({ enum: BulletinStatus })
  @IsEnum(BulletinStatus)
  @IsOptional()
  status?: BulletinStatus;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  pdfUrl?: string;
}
