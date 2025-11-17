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

  // Routes spécifiques DOIVENT être avant les routes paramétrées génériques (:id)
  @Get('by-user/:userId/coges')
  async getCogesByUser(@Param('userId') userId: string) {
    return this.parentService.getCogesByUserId(userId);
  }

  @Get('by-user/:userId/children')
  async getChildrenByUserId(
    @Param('userId') userId: string,
  ): Promise<StudentResponseDto[]> {
    console.log('Fetching children for userId:', userId);
    return this.parentService.getChildrenByUserId(userId);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<ParentResponseDto> {
    return this.parentService.findById(id);
  }

  @Get(':id/children')
  async getChildren(@Param('id') id: string): Promise<StudentResponseDto[]> {
    return this.parentService.getChildren(id);
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
