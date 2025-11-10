import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from '../../user/dto/user-response.dto';
import { StudentResponseDto } from '../../students/dto/student-response.dto';
import { PaymentResponseDto } from 'src/payment/dto/payment-response.dto';

export class ParentResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  user: UserResponseDto;

  @ApiProperty({ type: [StudentResponseDto] })
  students: StudentResponseDto[];

  @ApiProperty({ type: [PaymentResponseDto] })
  payments: PaymentResponseDto[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
