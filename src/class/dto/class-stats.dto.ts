// src/class/dto/class-stats.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class ClassStatsDto {
  @ApiProperty()
  totalClasses: number;

  @ApiProperty()
  avgStudents: number;

  @ApiProperty()
  totalStudents: number;

  @ApiProperty()
  totalTeachers: number;
}

export class LevelStatsDto {
  @ApiProperty()
  level: string;

  @ApiProperty()
  count: number;

  @ApiProperty()
  withEducator: number;
}

export class ClassTypeStatsDto {
  @ApiProperty()
  classType: string;

  @ApiProperty()
  count: number;
}

export class SchoolStatsDto {
  @ApiProperty()
  schoolId: string;

  @ApiProperty()
  count: number;
}

export class CreationTrendDto {
  @ApiProperty()
  month: string;

  @ApiProperty()
  count: number;
}

export class ClassStatisticsDto {
  @ApiProperty()
  summary: ClassStatsDto;

  @ApiProperty({ type: [LevelStatsDto] })
  byLevel: LevelStatsDto[];

  @ApiProperty({ type: [ClassTypeStatsDto] })
  byClassType: ClassTypeStatsDto[];

  @ApiProperty({ type: [SchoolStatsDto] })
  topSchools: SchoolStatsDto[];

  @ApiProperty({ type: [CreationTrendDto] })
  creationTrend: CreationTrendDto[];
}