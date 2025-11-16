import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { StudentResponseDto } from 'src/students/dto/student-response.dto';
import { UserDto } from 'src/user/dto/user.dto';
import { ParentResponseDto } from './dto/parent-response.dto';
import { ParentToStudentDto } from './dto/parent-to-student.dto';
import { ParentService } from './parent.service';

@Controller('parents')
export class ParentController {
  constructor(private readonly parentService: ParentService) {}

  @Post()
  async create(@Body() createParentDto: any): Promise<ParentResponseDto> {
    return this.parentService.create(createParentDto);
  }

  @Get('me')
  async getMyProfile(@Request() req): Promise<ParentResponseDto> {
    return this.parentService.findByUserId(req.user.id);
  }

  @Get('me/children')
  async getMyChildren(@Request() req): Promise<StudentResponseDto[]> {
    const parent = await this.parentService.findByUserId(req.user.id);
    return this.parentService.getChildren(parent.id);
  }
  
  @Get('by-user/:userId/coges')
  async getCogesByUser(@Param('userId') userId: string) {
    return this.parentService.getCogesByUserId(userId);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<ParentResponseDto> {
    return this.parentService.findById(id);
  }

  @Get(':id/children')
  async getChildren(@Param('id') id: string): Promise<StudentResponseDto[]> {
    return this.parentService.getChildren(id);
  }

  @Get('by-user/:userId/children')
  async getChildrenByUserId(
    @Param('userId') userId: string,
  ): Promise<StudentResponseDto[]> {
    console.log('Fetching children for userId:', userId);
    return this.parentService.getChildrenByUserId(userId);
  }

  @Post(':id/children')
  async addChild(
    @Param('id') id: string,
    @Body() parentToStudentDto: ParentToStudentDto,
  ): Promise<ParentResponseDto> {
    return this.parentService.addStudentToParent(
      id,
      parentToStudentDto.studentId,
    );
  }

  @Delete(':id/children/:studentId')
  async removeChild(
    @Param('id') id: string,
    @Param('studentId') studentId: string,
  ): Promise<ParentResponseDto> {
    return this.parentService.removeStudentFromParent(id, studentId);
  }

  @Post('me/children')
  async addChildToMe(
    @Request() req,
    @Body() parentToStudentDto: ParentToStudentDto,
  ): Promise<ParentResponseDto> {
    const parent = await this.parentService.findByUserId(req.user.id);
    return this.parentService.addStudentToParent(
      parent.id,
      parentToStudentDto.studentId,
    );
  }

  @Delete('me/children/:studentId')
  async removeChildFromMe(
    @Request() req,
    @Param('studentId') studentId: string,
  ): Promise<ParentResponseDto> {
    const parent = await this.parentService.findByUserId(req.user.id);
    return this.parentService.removeStudentFromParent(parent.id, studentId);
  }

  @Get(':id/user-info')
  async getUserInfo(
    @Param('id') parentId: string,
    @Query('fields') fields?: string,
  ): Promise<UserDto | null> {
    // fields peut être une chaîne séparée par des virgules, ex: "email,firstName"
    const fieldsArray = fields
      ? fields.split(',')
      : ['email', 'firstName', 'lastName', 'role'];
    return this.parentService.getUserInfo(parentId, fieldsArray);
  }

  @Get(':id/coges')
  async getCogesForParent(@Param('id') parentId: string) {
    return this.parentService.getCogesMemberships(parentId);
  }
}
