import { Body, Controller, Delete, Get, Param, Post, Query, Request, UseGuards, } from '@nestjs/common';
import { StudentResponseDto } from 'src/students/dto/student-response.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateParentDto } from './dto/create-parent.dto';
import { ParentResponseDto } from './dto/parent-response.dto';
import { ParentToStudentDto } from './dto/parent-to-student.dto';
import { ParentService } from './parent.service';
import { UserDto } from 'src/user/dto/user.dto';

@Controller('parents')
export class ParentController {
  constructor(private readonly parentService: ParentService) { }

  @Post()
  async create(@Body() createParentDto: any): Promise<ParentResponseDto > {
     return this.parentService.create(createParentDto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMyProfile(@Request() req): Promise<ParentResponseDto> {
    return this.parentService.findByUserId(req.user.id);
  }

  @Get('me/children')
  @UseGuards(JwtAuthGuard)
  async getMyChildren(@Request() req): Promise<StudentResponseDto[]> {
    const parent = await this.parentService.findByUserId(req.user.id);
    return this.parentService.getChildren(parent.id);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<ParentResponseDto> {
    return this.parentService.findById(id);
  }

  @Get(':id/children')
  async getChildren(@Param('id') id: string): Promise<StudentResponseDto[]> {
    return this.parentService.getChildren(id);
  }

  @Post(':id/children')
  async addChild(
    @Param('id') id: string,
    @Body() parentToStudentDto: ParentToStudentDto,
  ): Promise<ParentResponseDto> {
    return this.parentService.addStudentToParent(id, parentToStudentDto.studentId);
  }

  @Delete(':id/children/:studentId')
  async removeChild(
    @Param('id') id: string,
    @Param('studentId') studentId: string,
  ): Promise<ParentResponseDto> {
    return this.parentService.removeStudentFromParent(id, studentId);
  }

  @Post('me/children')
  @UseGuards(JwtAuthGuard)
  async addChildToMe(
    @Request() req,
    @Body() parentToStudentDto: ParentToStudentDto,
  ): Promise<ParentResponseDto> {
    const parent = await this.parentService.findByUserId(req.user.id);
    return this.parentService.addStudentToParent(parent.id, parentToStudentDto.studentId);
  }

  @Delete('me/children/:studentId')
  @UseGuards(JwtAuthGuard)
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
    const fieldsArray = fields ? fields.split(',') : ['email', 'firstName', 'lastName', 'role'];
    return this.parentService.getUserInfo(parentId, fieldsArray);
  }
}