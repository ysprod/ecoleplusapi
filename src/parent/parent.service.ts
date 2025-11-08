import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { PaymentResponseDto } from 'src/payment/dto/payment-response.dto';
import { StudentResponseDto } from 'src/students/dto/student-response.dto';
import { UserResponseDto } from 'src/user/dto/user-response.dto';
import { UserDto } from 'src/user/dto/user.dto';
import { UserService } from '../user/user.service';
import { CreateParentDto } from './dto/create-parent.dto';
import { ParentResponseDto } from './dto/parent-response.dto';
import { UpdateParentDto } from './dto/update-parent.dto';
import { Parent, ParentDocument } from './schemas/parent.schema';
import { forwardRef } from '@nestjs/common';
import { StudentsService } from 'src/students/students.service';

@Injectable()
export class ParentService {
  constructor(
    @InjectModel(Parent.name) private parentModel: Model<ParentDocument>,
    @Inject(forwardRef(() => UserService)) private userService: UserService,
    @Inject(forwardRef(() => StudentsService)) private studentService: StudentsService,
  ) {}

  private async mapToResponseDto(parent: ParentDocument): Promise<ParentResponseDto> {
    await parent.populate([
      { path: 'user' },
      { path: 'students' },
      { path: 'payments' },
    ]);

    return {
      id: parent._id.toString(),
      user: parent.user as unknown as UserResponseDto,
      students: parent.students as unknown as StudentResponseDto[],
      payments: parent.payments as unknown as PaymentResponseDto[],
      createdAt: parent.createdAt!,
      updatedAt: parent.updatedAt!,
    };
  }

  async create(createParentDto: CreateParentDto): Promise<ParentResponseDto> {
    // Vérifie que l'utilisateur existe
    await this.userService.findById(createParentDto.user);

    const createdParent = new this.parentModel({
      user: new Types.ObjectId(createParentDto.user),
    });

    const savedParent = await createdParent.save();
    return this.mapToResponseDto(savedParent);
  }

  async findByUserId(userId: string): Promise<ParentResponseDto> {
    if (!Types.ObjectId.isValid(userId)) {
      throw new NotFoundException('User not found');
    }

    const parent = await this.parentModel.findOne({ user: userId }).exec();
    if (!parent) {
      throw new NotFoundException('Parent not found');
    }

    return this.mapToResponseDto(parent);
  }

  async getOrCreateParent(userId: string): Promise<ParentResponseDto> {
    try {
      return await this.findByUserId(userId);
    } catch (e) {
      return this.create({ user: userId });
    }
  }

  async getChildren(parentId: string): Promise<StudentResponseDto[]> {
    if (!Types.ObjectId.isValid(parentId)) {
      throw new NotFoundException('Parent not found');
    }

    const parent = await this.parentModel
      .findById(parentId)
      .populate({
        path: 'students',
        populate: {
          path: 'class',
          select: 'name level',
        },
        options: { sort: { lastName: 1, firstName: 1 } },
      })
      .exec();

    if (!parent) {
      throw new NotFoundException('Parent not found');
    }

    return parent.students as unknown as StudentResponseDto[];
  }

  async addStudentToParent(
    parentId: string,
    studentId: string,
  ): Promise<ParentResponseDto> {
    if (!Types.ObjectId.isValid(parentId) || !Types.ObjectId.isValid(studentId)) {
      throw new NotFoundException('Parent or student not found');
    }

    // Vérifie que l'étudiant existe
    await this.studentService.findById(studentId);

    const updatedParent = await this.parentModel
      .findByIdAndUpdate(
        parentId,
        { $addToSet: { students: new Types.ObjectId(studentId) } },
        { new: true },
      )
      .exec();

    if (!updatedParent) {
      throw new NotFoundException('Parent not found');
    }

    // Ajoute aussi le parent à l'étudiant
    await this.studentService.addParent(studentId, parentId);

    return this.mapToResponseDto(updatedParent);
  }

  async removeStudentFromParent(
    parentId: string,
    studentId: string,
  ): Promise<ParentResponseDto> {
    if (!Types.ObjectId.isValid(parentId) || !Types.ObjectId.isValid(studentId)) {
      throw new NotFoundException('Parent or student not found');
    }

    const updatedParent = await this.parentModel
      .findByIdAndUpdate(
        parentId,
        { $pull: { students: new Types.ObjectId(studentId) } },
        { new: true },
      )
      .exec();

    if (!updatedParent) {
      throw new NotFoundException('Parent not found');
    }

    return this.mapToResponseDto(updatedParent);
  }

  async findById(id: string): Promise<ParentResponseDto> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Parent not found');
    }

    const parent = await this.parentModel.findById(id).exec();
    if (!parent) {
      throw new NotFoundException('Parent not found');
    }

    return this.mapToResponseDto(parent);
  }

  async update(
    id: string,
    updateParentDto: UpdateParentDto,
  ): Promise<ParentResponseDto> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Parent not found');
    }

    const updatedParent = await this.parentModel
      .findByIdAndUpdate(id, updateParentDto, { new: true })
      .exec();

    if (!updatedParent) {
      throw new NotFoundException('Parent not found');
    }

    return this.mapToResponseDto(updatedParent);
  }

  async remove(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Parent not found');
    }

    const result = await this.parentModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Parent not found');
    }
  }

  async getUserInfo(parentId: string, fields: string[] = ['email', 'firstName', 'lastName', 'role']): Promise<UserDto | null> {
    if (!Types.ObjectId.isValid(parentId)) {
      throw new NotFoundException('Parent not found');
    }
    const parent = await this.parentModel.findById(parentId).exec();
    if (!parent || !parent.user) {
      throw new NotFoundException('Parent or user not found');
    }
    return this.userService.getUserById(parent.user, fields);
  }
}