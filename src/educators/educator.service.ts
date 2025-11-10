import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { EducatorRepository } from './educator.repository';
import { TeacherService } from '../teacher/teacher.service';
import { EducatorClassesResponseDto } from './dto/educator-classes-response.dto';
import { EducatorClassDto } from './dto/educator-class.dto';
import { TeacherDto } from 'src/teacher/dto/teacher.dto';
import { UserResponseDto } from 'src/user/dto/user-response.dto';
import { TeacherResponseDto } from 'src/teacher/dto/teacher-response.dto';

@Injectable()
export class EducatorService {
  constructor(
    private readonly educatorRepo: EducatorRepository,
    private readonly teacherService: TeacherService,
  ) {}

  async getEducatorsByUserIds(
    userIds: string[],
  ): Promise<TeacherResponseDto[]> {
    if (!userIds || userIds.length === 0) return [];
    return this.teacherService.getEducatorsByUserIds(userIds);
  }

  async getEducatorClassesWithParams(
    schoolId: string,
    niveau?: string,
  ): Promise<EducatorClassesResponseDto> {
    if (!schoolId) return { classes: [], educatorsCount: 0 };
    const classes = await this.educatorRepo.getClassesWithEducators(
      schoolId,
      niveau,
    );
    const educatorUserIds = this.extractUniqueEducatorUserIds(classes);
    const educators = await this.getEducatorsByUserIds(educatorUserIds);
    const classesWithEducators = this.mapClassesWithEducators(
      classes,
      educators,
    );
    return {
      classes: classesWithEducators,
      educatorsCount: educators.length,
    };
  }

  async getEducatorClasses(
    educatorId: string,
  ): Promise<EducatorClassesResponseDto> {
    if (!educatorId) return { classes: [], educatorsCount: 0 };
    const classes = await this.educatorRepo.getClassesByEducator(educatorId);
    const educatorUserIds = this.extractUniqueEducatorUserIds(classes);
    const educators = await this.getEducatorsByUserIds(educatorUserIds);
    const classesWithEducators = this.mapClassesWithEducators(
      classes,
      educators,
    );
    return { classes: classesWithEducators, educatorsCount: educators.length };
  }

  async getEducatorOfClass(classId: string): Promise<EducatorClassDto | null> {
    if (!classId) return null;
    const educator = await this.educatorRepo.getClassEducator(classId);
    return educator ? educator : null;
  }

  async findClassesBySchoolAndNiveau(schoolId: string, niveau: string) {
    if (!schoolId || !niveau) {
      throw new NotFoundException('schoolId and niveau are required');
    }
    // Utilise le repository des classes (adapte selon ta structure)
    const classes = await this.educatorRepo.getClassesWithEducators(
      schoolId,
      niveau,
    );
    if (!classes || classes.length === 0) {
      throw new NotFoundException(
        'No classes found for this school and niveau',
      );
    }
    return classes;
  }

  private extractUniqueEducatorUserIds(classes: EducatorClassDto[]): string[] {
    return Array.from(
      new Set(
        classes
          .map((c) =>
            c.educator && typeof c.educator === 'object' && c.educator._id
              ? c.educator._id.toString()
              : undefined,
          )
          .filter((id): id is string => !!id),
      ),
    );
  }

  private mapClassesWithEducators(
    classes: EducatorClassDto[],
    educators: TeacherResponseDto[],
  ): EducatorClassDto[] {
    return classes.map((classItem) => {
      const educatorId =
        classItem.educator &&
        typeof classItem.educator === 'object' &&
        classItem.educator._id
          ? classItem.educator._id.toString()
          : undefined;
      const educatorTeacher = educators.find(
        (teacher) => teacher?.user?.id?.toString() === educatorId,
      );
      return { ...classItem, educatorDetails: educatorTeacher || null };
    });
  }
}
