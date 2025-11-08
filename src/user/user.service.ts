import { Injectable, NotFoundException, ConflictException, Inject, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { UserDto } from './dto/user.dto';
import { TeacherService } from '../teacher/teacher.service';
import { ParentService } from '../parent/parent.service';
import { CreateTeacherDto } from '../teacher/dto/create-teacher.dto';
import { Teacher } from 'src/teacher/schemas/teacher.schema';

@Injectable()
export class UserService {
  constructor(
       @InjectModel(Teacher.name) private teacherModel: Model<Teacher>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @Inject(forwardRef(() => TeacherService)) private teacherService: TeacherService,
    @Inject(forwardRef(() => ParentService)) private parentService: ParentService,
  ) { }

  private mapToResponseDto(user: UserDocument): UserResponseDto {
    const userDoc = user as UserDocument;
    return {
      id: userDoc._id.toString(),
      email: userDoc.email,
      matricule: userDoc.matricule,
      firstName: userDoc.firstName,
      lastName: userDoc.lastName,
      name: `${userDoc.firstName} ${userDoc.lastName}`.trim(),
      gender: userDoc.gender,
      role: userDoc.role,
      profileType: userDoc.profileType,
      emailVerified: userDoc.emailVerified,
      phone: userDoc.phone,
      status: userDoc.status,
      birthDate: userDoc.birthDate,
      photo: userDoc.photo,
      avatar: userDoc.avatar,
      createdAt: userDoc.createdAt!,
      updatedAt: userDoc.updatedAt!,
    };
  }

  async findByPhone(phone: string): Promise<UserResponseDto> {
  const user = await this.userModel.findOne({ phone }).exec();
  if (!user) {
    throw new NotFoundException('User not found');
  }

  return this.mapToResponseDto(user);
}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const email = createUserDto.email.toLowerCase();
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const createdUser = new this.userModel({
      ...createUserDto,
      email,
      password: hashedPassword,
    });

    const savedUser = await createdUser.save();
    const usersaved =this.mapToResponseDto(savedUser);
    
  // Si l'utilisateur a le rôle "staff", créer automatiquement un enregistrement Teacher
    if (usersaved.profileType === 'staff') {
      try {
        const createTeacherDto: CreateTeacherDto = {
          matricule: usersaved.matricule || '',
          firstName: usersaved.firstName,
          lastName: usersaved.lastName,
          email: usersaved.email,
          gender: usersaved.gender,
          phone: usersaved.phone,
          birthDate: usersaved.birthDate,
        };

         const createdTeacher = new this.teacherModel({...usersaved,
      ...createTeacherDto,
      user: usersaved.id,
    });

    const savedTeacher = await createdTeacher.save();
        
      // const test= await this.teacherService.create(createTeacherDto);
      } catch (error) {
        // Log l'erreur mais ne pas faire échouer la création de l'utilisateur
        console.error('Failed to create teacher record for staff user:', error);
      }
    }
    
    // Si l'utilisateur a le rôle "parent", créer automatiquement un enregistrement Parent
    if (usersaved.role === 'parent' || usersaved.profileType === 'parent') {
      try {
        await this.parentService.getOrCreateParent(usersaved.id);
      } catch (error) {
        // Ne pas bloquer la création de l'utilisateur
        console.error('Failed to create parent record for parent user:', error);
      }
    }
    
    return usersaved;
  }

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.userModel.find().exec();
    return users.map(user => this.mapToResponseDto(user));
  }

  async findOne(id: string): Promise<UserResponseDto> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('User not found');
    }

    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.mapToResponseDto(user);
  }

  async findByEmail(email: string): Promise<UserResponseDto> {
    const user = await this.userModel.findOne({ email: email.toLowerCase() }).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.mapToResponseDto(user);
  }

  async findByMatricule(matricule: string): Promise<UserResponseDto> {
    const user = await this.userModel.findOne({ matricule }).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.mapToResponseDto(user);
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('User not found');
    }

    const user = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.mapToResponseDto(user);
  }

  async remove(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('User not found');
    }

    const result = await this.userModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('User not found');
    }
  }

  async demoteToUser(id: string): Promise<UserResponseDto> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('User not found');
    }

    const user = await this.userModel
      .findByIdAndUpdate(id, { role: 'user' }, { new: true })
      .exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.mapToResponseDto(user);
  }

  async findRawByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email: email.toLowerCase() }).exec();
  }

  async findById(id: string): Promise<UserResponseDto> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('User not found');
    }
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return {
      id: user._id.toString(),
      email: user.email,
      matricule: user.matricule,
      firstName: user.firstName,
      lastName: user.lastName,
      name: `${user.firstName} ${user.lastName}`.trim(),
      gender: user.gender,
      role: user.role,
      profileType: user.profileType,
      emailVerified: user.emailVerified,
      phone: user.phone,
      status: user.status,
      birthDate: user.birthDate,
      photo: user.photo,
      avatar: user.avatar,
      createdAt: user.createdAt!,
      updatedAt: user.updatedAt!,
    };
  }

  async getUserById(
    userId: Types.ObjectId | string,
    fields: string[] = ['email', 'firstName', 'lastName', 'role'],
  ): Promise<UserDto | null> {
    if (!userId || !Types.ObjectId.isValid(userId.toString())) {
      throw new NotFoundException('User not found');
    }
    const projection = fields.reduce((acc, field) => ({ ...acc, [field]: 1 }), {});
    const user = await this.userModel.findById(userId, projection).lean().exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user as unknown as UserDto;
  }
}