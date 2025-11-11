import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BulletinDecision, BulletinStatus } from '../schemas/bulletin.schema';

export class BulletinGradeItemResponseDto {
  @ApiProperty() subject: string;
  @ApiProperty() coefficient: number;
  @ApiProperty() interrogation: number;
  @ApiProperty() devoir: number;
  @ApiProperty() composition: number;
  @ApiProperty() moyenne: number;
  @ApiPropertyOptional() appreciation?: string;
  @ApiPropertyOptional() rank?: number;
  @ApiPropertyOptional() teacher?: string;
  @ApiPropertyOptional() teacherName?: string;
}

export class BulletinStatisticsResponseDto {
  @ApiProperty() generalAverage: number;
  @ApiProperty() classAverage: number;
  @ApiProperty() rank: number;
  @ApiProperty() totalStudents: number;
  @ApiProperty() highestAverage: number;
  @ApiProperty() lowestAverage: number;
  @ApiProperty() totalCoefficients: number;
}

export class BulletinResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() student: string;
  @ApiProperty() class: string;
  @ApiProperty() term: string;
  @ApiProperty() academicYear: string;
  @ApiProperty() school: string;
  @ApiProperty({ type: [BulletinGradeItemResponseDto] })
  grades: BulletinGradeItemResponseDto[];
  @ApiProperty({ type: BulletinStatisticsResponseDto })
  statistics: BulletinStatisticsResponseDto;
  @ApiPropertyOptional() conduct?: string;
  @ApiPropertyOptional({ type: [String] }) remarks?: string[];
  @ApiPropertyOptional({ enum: BulletinDecision }) decision?: BulletinDecision;
  @ApiProperty({ enum: BulletinStatus }) status: BulletinStatus;
  @ApiPropertyOptional() generatedAt?: Date;
  @ApiPropertyOptional() publishedAt?: Date;
  @ApiPropertyOptional() generatedBy?: string;
  @ApiPropertyOptional() publishedBy?: string;
  @ApiPropertyOptional() pdfUrl?: string;
  @ApiProperty() parentNotified: boolean;
  @ApiPropertyOptional() parentNotifiedAt?: Date;
  @ApiProperty() downloaded: boolean;
  @ApiPropertyOptional() downloadedAt?: Date;
  @ApiProperty() createdAt: Date;
  @ApiProperty() updatedAt: Date;
}
