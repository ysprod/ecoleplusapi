import { UserResponseDto } from '../../user/dto/user-response.dto';
import { StudentResponseDto } from '../../students/dto/student-response.dto';
import { PaymentResponseDto } from 'src/payment/dto/payment-response.dto';
export declare class ParentResponseDto {
    id: string;
    user: UserResponseDto;
    students: StudentResponseDto[];
    payments: PaymentResponseDto[];
    createdAt: Date;
    updatedAt: Date;
}
