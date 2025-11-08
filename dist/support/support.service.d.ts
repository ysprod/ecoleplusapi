import { SupportDataDto } from './dtos/support-data.dto';
export declare class SupportService {
    private resend;
    postSupport(data: SupportDataDto): Promise<{
        success: boolean;
    }>;
}
